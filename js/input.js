/**
 * Input handling module - keyboard controls for snake movement
 */

class InputHandler {
    constructor(game) {
        this.game = game;
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        document.addEventListener('keydown', (event) => {
            this.handleKeyDown(event);
        });
    }
    
    handleKeyDown(event) {
        // Prevent default behavior for arrow keys to avoid page scrolling
        if ([37, 38, 39, 40].includes(event.keyCode)) {
            event.preventDefault();
        }
        
        // Don't process input if game is over
        if (this.game.isGameOverState()) {
            return;
        }
        
        switch (event.key) {
            case 'ArrowUp':
            case 'w':
            case 'W':
                this.game.setDirection(this.game.DIRECTIONS.UP);
                break;
                
            case 'ArrowDown':
            case 's':
            case 'S':
                this.game.setDirection(this.game.DIRECTIONS.DOWN);
                break;
                
            case 'ArrowLeft':
            case 'a':
            case 'A':
                this.game.setDirection(this.game.DIRECTIONS.LEFT);
                break;
                
            case 'ArrowRight':
            case 'd':
            case 'D':
                this.game.setDirection(this.game.DIRECTIONS.RIGHT);
                break;
                
            case ' ':
                // Space bar to pause/resume
                this.game.isPaused = !this.game.isPaused;
                break;
        }
    }
}
