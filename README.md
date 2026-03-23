# Snake HTML5

A classic Snake game built with HTML5 Canvas and vanilla JavaScript.

![Snake Game](screenshot.png)

## Description

This is a modern implementation of the classic Snake game that runs directly in your browser. Navigate the snake to eat apples and grow longer without hitting the walls or yourself!

## Features

- 🐍 Classic Snake gameplay
- 🍎 Apple collecting with score tracking
- ⌨️ Keyboard controls (Arrow keys or WASD)
- ⏸️ Pause/Resume with Space bar
- 🎮 Game over detection (walls & self-collision)
- 🔄 Restart functionality
- 🎨 Modern dark theme with neon colors

## Requirements

- Any modern web browser (Chrome, Firefox, Safari, Edge)
- No installation required

## Installation

```bash
# Clone the repository
git clone https://github.com/ccxdomo/snake-html5.git

# Navigate to the directory
cd snake-html5

# Open index.html in your browser
# Or serve via local server:
python3 -m http.server 8000
# Then visit http://localhost:8000
```

## Usage

1. Open `index.html` in your browser
2. Use **Arrow keys** or **WASD** to control the snake
3. Press **Space** to pause/resume
4. Click **Restart** to play again after game over

## Project Structure

```
snake-html5/
├── index.html          # Main HTML file with canvas
├── css/
│   └── style.css       # Modern dark theme styling
├── js/
│   ├── main.js         # Game loop and initialization
│   ├── game.js         # Game logic and state management
│   ├── input.js        # Keyboard event handling
│   └── renderer.js     # Canvas drawing functions
└── README.md           # This file
```

## Game Mechanics

- Snake starts in the center, length 3, moving right
- Eat apples (red) to grow and increase score (+10 points)
- Game over if snake hits walls or itself
- Cannot reverse direction immediately
- Speed: 10 moves per second

## License

MIT License - Feel free to use and modify!
