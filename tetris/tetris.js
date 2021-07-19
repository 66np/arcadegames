/** @type {HTMLCanvasElement} */

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("tetris");
    const ctx = canvas.getContext("2d");

    function clearScreen() {
        ctx.fillStyle = '#fff200';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    clearScreen();

    const grid = document.getElementById('grid-tetris');
    let squares = Array.from(grid.querySelectorAll("#grid-block"));
    const width = 13;
    const height = 20;
    let currentPosition = 4;

    // Assign functions to keycodes
    function control(event) {
        if (event.keyCode === 39) {
            moveRight();
        } else if (event.keyCode === 38) {
            rotate();
        } else if (event.keyCode === 37) {
            moveLeft();
        } else if (event.keyCode === 40) {
            moveDown();
        }
    }

    document.addEventListener('keyup', control);

    // Defining Tetramino shapes

    const lTetromino = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
    ];

    const zTetromino = [
        [0, width, width+1, width*2+1],
        [width+1, width+2, width*2, width*2+1],
        [0, width, width+1, width*2+1],
        [width+1, width+2, width*2, width*2+1]
    ];

    const tTetromino = [
        [1, width, width+1, width+2],
        [1, width+1, width+2, width*2+1],
        [width, width+1, width+2, width*2+1],
        [1, width, width+1, width*2+1]
    ];

    const oTetromino = [
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1]
    ];

    const iTetromino = [
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3],
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3]
    ];

    const theTetrominos = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

    // Random selection of Tetromino
    let random = Math.floor(Math.random()*theTetrominos.length);
    let currentRotation = 0;
    let current = theTetrominos[random][currentRotation];

    // Draw the shape
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetris-block');
        })
    }

    // Undraw the shape
    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetris-block');
        })
    }

    // Move down shape
    function moveDown() {
        undraw();
        currentPosition = currentPosition += width;
        draw();
        freeze();
    }

    // Move left and prevent collisions with shapes moving left
    function moveRight() {
        undraw();
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1);
        if (!isAtRightEdge) currentPosition += 1;
        if (current.some(index => squares[currentPosition + index].classList.contains("tetris-block2"))) {
            currentPosition -= 1;
        }
        draw();
    }

    function moveLeft() {
        undraw();
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
        if (!isAtLeftEdge) currentPosition -= 1;
        if(current.some(index =>  squares[currentPosition + index].classList.contains("tetris-block2"))) {
            currentPosition += 1;
        }
        draw();
    }

    // Rotate Tetromino
    function rotate() {
        undraw();
        currentRotation++;
        if (currentRotation === current.length) {
            currentRotation = 0;
        }
        current = theTetrominos[random][currentRotation];
        draw();
    }
    
    draw();
})