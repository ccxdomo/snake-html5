/**
 * Main entry point - game loop initialization and orchestration
 */

(function() {
    'use strict';
    
    // Game instance
    let game;
    let renderer;
    let inputHandler;
    let gameLoopId = null;
    let lastUpdateTime = 0;
    
    /**
     * Initialize the game
     */
    function init() {
        // Create game instance
        game = new SnakeGame();
        
        // Create renderer
        renderer = new Renderer('gameCanvas', game);
        
        // Create input handler
        inputHandler = new InputHandler(game);
        
        // Setup restart button
        const restartBtn = document.getElementById('restartBtn');
        if (restartBtn) {
            restartBtn.addEventListener('click', restartGame);
        }
        
        // Initial render
        renderer.render();
        renderer.updateScore(0);
        renderer.hideGameOver();
        
        // Start game loop
        startGameLoop();
        
        console.log('Snake game initialized');
    }
    
    /**
     * Game loop using requestAnimationFrame
     */
    function gameLoop(currentTime) {
        if (!lastUpdateTime) {
            lastUpdateTime = currentTime;
        }
        
        const deltaTime = currentTime - lastUpdateTime;
        
        // Update game at fixed intervals (based on game speed)
        if (deltaTime >= game.speed) {
            game.update();
            renderer.updateScore(game.getScore());
            
            if (game.isGameOverState()) {
                renderer.showGameOver(game.getScore());
            }
            
            lastUpdateTime = currentTime;
        }
        
        // Render every frame for smooth visuals
        renderer.render();
        
        // Continue loop
        gameLoopId = requestAnimationFrame(gameLoop);
    }
    
    /**
     * Start the game loop
     */
    function startGameLoop() {
        if (gameLoopId) {
            cancelAnimationFrame(gameLoopId);
        }
        lastUpdateTime = 0;
        gameLoopId = requestAnimationFrame(gameLoop);
    }
    
    /**
     * Stop the game loop
     */
    function stopGameLoop() {
        if (gameLoopId) {
            cancelAnimationFrame(gameLoopId);
            gameLoopId = null;
        }
    }
    
    /**
     * Restart the game
     */
    function restartGame() {
        // Stop current loop
        stopGameLoop();
        
        // Reset game state
        game.reset();
        
        // Reset UI
        renderer.updateScore(0);
        renderer.hideGameOver();
        
        // Restart loop
        startGameLoop();
        
        console.log('Game restarted');
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        // DOM already loaded
        init();
    }
    
})();
