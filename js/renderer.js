/**
 * Rendering module - canvas drawing functions for snake game
 */

class Renderer {
    constructor(canvasId, game) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.game = game;
        
        // Colors
        this.colors = {
            background: '#0a0a1a',
            snakeHead: '#00ff88',
            snakeBody: '#00cc6a',
            snakeBorder: '#00ffaa',
            apple: '#ff0066',
            appleGlow: '#ff4081',
            grid: '#1a1a3e'
        };
        
        // Cell size from game
        this.cellSize = game.cellSize;
    }
    
    /**
     * Clear the canvas
     */
    clear() {
        this.ctx.fillStyle = this.colors.background;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    /**
     * Draw grid lines (subtle)
     */
    drawGrid() {
        this.ctx.strokeStyle = this.colors.grid;
        this.ctx.lineWidth = 1;
        
        // Vertical lines
        for (let x = 0; x <= this.canvas.width; x += this.cellSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }
        
        // Horizontal lines
        for (let y = 0; y <= this.canvas.height; y += this.cellSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }
    }
    
    /**
     * Draw a single cell
     */
    drawCell(x, y, color, glow = false) {
        const px = x * this.cellSize;
        const py = y * this.cellSize;
        const size = this.cellSize - 1; // Slight gap between cells
        
        // Add glow effect
        if (glow) {
            this.ctx.shadowColor = color;
            this.ctx.shadowBlur = 10;
        }
        
        this.ctx.fillStyle = color;
        this.ctx.fillRect(px + 1, py + 1, size, size);
        
        // Reset shadow
        this.ctx.shadowBlur = 0;
    }
    
    /**
     * Draw the snake
     */
    drawSnake() {
        const snake = this.game.getSnake();
        
        snake.forEach((segment, index) => {
            const isHead = index === 0;
            const color = isHead ? this.colors.snakeHead : this.colors.snakeBody;
            
            // Draw segment with glow for head
            this.drawCell(segment.x, segment.y, color, isHead);
            
            // Draw eyes on head
            if (isHead) {
                this.drawSnakeEyes(segment);
            }
        });
    }
    
    /**
     * Draw eyes on snake head
     */
    drawSnakeEyes(head) {
        const px = head.x * this.cellSize;
        const py = head.y * this.cellSize;
        const direction = this.game.direction;
        
        this.ctx.fillStyle = '#fff';
        
        // Position eyes based on direction
        let eye1X, eye1Y, eye2X, eye2Y;
        const eyeSize = 4;
        const offset = 6;
        
        if (direction.x === 1) { // Moving right
            eye1X = px + this.cellSize - offset - eyeSize;
            eye1Y = py + offset;
            eye2X = px + this.cellSize - offset - eyeSize;
            eye2Y = py + this.cellSize - offset - eyeSize;
        } else if (direction.x === -1) { // Moving left
            eye1X = px + offset;
            eye1Y = py + offset;
            eye2X = px + offset;
            eye2Y = py + this.cellSize - offset - eyeSize;
        } else if (direction.y === -1) { // Moving up
            eye1X = px + offset;
            eye1Y = py + offset;
            eye2X = px + this.cellSize - offset - eyeSize;
            eye2Y = py + offset;
        } else { // Moving down
            eye1X = px + offset;
            eye1Y = py + this.cellSize - offset - eyeSize;
            eye2X = px + this.cellSize - offset - eyeSize;
            eye2Y = py + this.cellSize - offset - eyeSize;
        }
        
        this.ctx.fillRect(eye1X, eye1Y, eyeSize, eyeSize);
        this.ctx.fillRect(eye2X, eye2Y, eyeSize, eyeSize);
    }
    
    /**
     * Draw the apple
     */
    drawApple() {
        const apple = this.game.getApple();
        const px = apple.x * this.cellSize;
        const py = apple.y * this.cellSize;
        const size = this.cellSize - 2;
        
        // Glow effect
        this.ctx.shadowColor = this.colors.appleGlow;
        this.ctx.shadowBlur = 15;
        
        // Apple body
        this.ctx.fillStyle = this.colors.apple;
        this.ctx.beginPath();
        const centerX = px + this.cellSize / 2;
        const centerY = py + this.cellSize / 2;
        const radius = size / 2 - 2;
        this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Reset shadow
        this.ctx.shadowBlur = 0;
        
        // Apple stem
        this.ctx.fillStyle = '#4a7c59';
        this.ctx.fillRect(centerX - 1, py + 2, 2, 5);
    }
    
    /**
     * Render the entire game
     */
    render() {
        this.clear();
        this.drawGrid();
        this.drawApple();
        this.drawSnake();
    }
    
    /**
     * Update score display
     */
    updateScore(score) {
        const scoreElement = document.getElementById('score');
        if (scoreElement) {
            scoreElement.textContent = score;
        }
    }
    
    /**
     * Show game over screen
     */
    showGameOver(finalScore) {
        const gameOverElement = document.getElementById('gameOver');
        const finalScoreElement = document.getElementById('finalScore');
        
        if (gameOverElement) {
            gameOverElement.classList.remove('hidden');
        }
        if (finalScoreElement) {
            finalScoreElement.textContent = finalScore;
        }
    }
    
    /**
     * Hide game over screen
     */
    hideGameOver() {
        const gameOverElement = document.getElementById('gameOver');
        if (gameOverElement) {
            gameOverElement.classList.add('hidden');
        }
    }
}
