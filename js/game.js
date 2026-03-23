/**
 * Game logic module - handles snake movement, apple spawning, collision detection, and scoring
 */

const GRID_SIZE = 20;
const CELL_SIZE = 25;
const INITIAL_SPEED = 100; // ms per frame
const SCORE_PER_APPLE = 10;

class SnakeGame {
    constructor() {
        this.gridWidth = GRID_SIZE;
        this.gridHeight = GRID_SIZE;
        this.cellSize = CELL_SIZE;
        this.speed = INITIAL_SPEED;
        this.score = 0;
        this.isGameOver = false;
        this.isPaused = false;
        
        // Direction constants
        this.DIRECTIONS = {
            UP: { x: 0, y: -1 },
            DOWN: { x: 0, y: 1 },
            LEFT: { x: -1, y: 0 },
            RIGHT: { x: 1, y: 0 }
        };
        
        this.reset();
    }
    
    reset() {
        // Initialize snake at center, length 3, moving right
        const centerX = Math.floor(this.gridWidth / 2);
        const centerY = Math.floor(this.gridHeight / 2);
        
        this.snake = [
            { x: centerX, y: centerY },
            { x: centerX - 1, y: centerY },
            { x: centerX - 2, y: centerY }
        ];
        
        this.direction = this.DIRECTIONS.RIGHT;
        this.nextDirection = this.DIRECTIONS.RIGHT;
        this.score = 0;
        this.isGameOver = false;
        this.isPaused = false;
        
        // Spawn first apple
        this.spawnApple();
    }
    
    /**
     * Set the next direction, preventing immediate reverse
     */
    setDirection(newDirection) {
        // Prevent reverse direction
        const isOpposite = (
            (newDirection === this.DIRECTIONS.UP && this.direction === this.DIRECTIONS.DOWN) ||
            (newDirection === this.DIRECTIONS.DOWN && this.direction === this.DIRECTIONS.UP) ||
            (newDirection === this.DIRECTIONS.LEFT && this.direction === this.DIRECTIONS.RIGHT) ||
            (newDirection === this.DIRECTIONS.RIGHT && this.direction === this.DIRECTIONS.LEFT)
        );
        
        if (!isOpposite) {
            this.nextDirection = newDirection;
        }
    }
    
    /**
     * Spawn apple at random position not on snake body
     */
    spawnApple() {
        let position;
        let isOnSnake;
        
        do {
            position = {
                x: Math.floor(Math.random() * this.gridWidth),
                y: Math.floor(Math.random() * this.gridHeight)
            };
            
            // Check if position is on snake body
            isOnSnake = this.snake.some(segment => 
                segment.x === position.x && segment.y === position.y
            );
        } while (isOnSnake);
        
        this.apple = position;
    }
    
    /**
     * Update game state - called every frame
     */
    update() {
        if (this.isGameOver || this.isPaused) {
            return;
        }
        
        // Apply queued direction change
        this.direction = this.nextDirection;
        
        // Calculate new head position
        const head = this.snake[0];
        const newHead = {
            x: head.x + this.direction.x,
            y: head.y + this.direction.y
        };
        
        // Check wall collision
        if (this.isWallCollision(newHead)) {
            this.gameOver();
            return;
        }
        
        // Check self collision
        if (this.isSelfCollision(newHead)) {
            this.gameOver();
            return;
        }
        
        // Move snake
        this.snake.unshift(newHead);
        
        // Check apple collision
        if (newHead.x === this.apple.x && newHead.y === this.apple.y) {
            // Snake ate apple - increase score and spawn new apple
            this.score += SCORE_PER_APPLE;
            this.spawnApple();
            // Don't remove tail - snake grows
        } else {
            // Remove tail - snake moves
            this.snake.pop();
        }
    }
    
    /**
     * Check if position collides with wall
     */
    isWallCollision(position) {
        return (
            position.x < 0 ||
            position.x >= this.gridWidth ||
            position.y < 0 ||
            position.y >= this.gridHeight
        );
    }
    
    /**
     * Check if position collides with snake body (excluding head)
     */
    isSelfCollision(position) {
        // Check collision with any body segment
        return this.snake.some(segment => 
            segment.x === position.x && segment.y === position.y
        );
    }
    
    /**
     * End the game
     */
    gameOver() {
        this.isGameOver = true;
    }
    
    /**
     * Get current score
     */
    getScore() {
        return this.score;
    }
    
    /**
     * Get snake body
     */
    getSnake() {
        return this.snake;
    }
    
    /**
     * Get apple position
     */
    getApple() {
        return this.apple;
    }
    
    /**
     * Check if game is over
     */
    isGameOverState() {
        return this.isGameOver;
    }
}
