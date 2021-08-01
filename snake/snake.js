/** @type {HTMLCanvasElement} */

const canvas = document.getElementById("snake");
const ctx = canvas.getContext('2d');

class SnakePart {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
}

let speed = 7;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let head_x = 10;
let head_y = 10;
const snakeParts = [];
let tailLength = 2;

let food_x = 5;
let food_y = 5;

let velocity_x = 0;
let velocity_y = 0;

let score = 0;

const gulpSound = new Audio("gulp.mp3");

// screen update loop, 1000ms/speed
function drawScreen() {
    changeSnakePos();
    
    let result = isGameOver();
    if (result)
        return;

    clearScreen();

    checkFoodCollision();
    drawFood();
    drawSnake();

    drawScore();

    // setTimeout offers better control in speed than requestAnimationFrame
    setTimeout(drawScreen, 1000/speed);
}

function isGameOver() {
    let gameOver = false;

    if (velocity_y === 0 && velocity_x === 0) {
        return false;
    }

    // walls
    if (head_x < 0 || head_x === tileCount) {
        gameOver = true;
    }

    if (head_y < 0 || head_y === tileCount) {
        gameOver = true;
    }

    for (let i=0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        if (part.x === head_x && part.y === head_y) {
            gameOver = true;
            break;
        }
    }
    
    if (gameOver) {
        ctx.fillStyle = "#00a10b";
        ctx.font = "50px bold Verdana";
        ctx.fillText("Game Over", canvas.width / 4.8, canvas.height / 2);
    }

    return gameOver;
}

function drawScore() {
    ctx.fillStyle = '#fff';
    ctx.font = "12px Verdana";
    ctx.fillText("Score: " + score, canvas.width - 65, 15)
}

function clearScreen() {
    ctx.fillStyle = '#ae4ecc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    ctx.fillStyle = '#de232a';
    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }

    snakeParts.push(new SnakePart(head_x, head_y));
    
    while (snakeParts.length > tailLength) {
        snakeParts.shift();
    }
    
    ctx.fillStyle = '#de232a';
    ctx.fillRect(head_x * tileCount, head_y * tileCount, tileSize, tileSize);
}

function changeSnakePos() {
    head_x = head_x + velocity_x;
    head_y = head_y + velocity_y;
}

function drawFood() {
    ctx.fillStyle = '#ffe642';
    ctx.fillRect(food_x * tileCount, food_y * tileCount, tileSize, tileSize);
}

function checkFoodCollision() {
    if (food_x === head_x && food_y === head_y) {
        food_x = Math.floor(Math.random() * tileCount);
        food_y = Math.floor(Math.random() * tileCount);
        tailLength++;
        score++;
        gulpSound.play();
    }
}

document.body.addEventListener('keydown', keyDown);

function keyDown (event) {
    // order: up, down, left, right
    if (event.key === "ArrowUp") {
        if (velocity_y == 1)
            return;
        velocity_y = -1;
        velocity_x = 0;
    } else if (event.key === "ArrowDown") {
        if (velocity_y == -1)
            return;
        velocity_y = 1;
        velocity_x = 0;
    } else if (event.key === "ArrowLeft") {
        if (velocity_x == -1)
            return;
        velocity_y = 0;
        velocity_x = -1;
    } else if (event.key === "ArrowRight") {
        if (velocity_x == 1)
            return;
        velocity_y = 0;
        velocity_x = 1;
    }
}

drawScreen();
 