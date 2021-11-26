/** @type {HTMLCanvasElement} */

const canvas = document.getElementById("tetris");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

// Scale of grid and tetris matrix
const scaleFactor = 16;

// Adding scoreboard and timer elements
const drawGameOver = document.getElementById("game-over-text");
const end = drawGameOver.getContext('2d');

let score = 0;
const drawScore = document.getElementById("score-text");

const drawCountdown = document.getElementById("countdown-text");
let timeLeft = 119;

const gameOverSound = new Audio("gameOver.wav");
const sweepSound = new Audio("sweep.wav");

class drawScreen{
    constructor(clr, xPos, yPos, boxWidth, boxHeight) {
        this.clr = clr;
        this.xPos = xPos;
        this.yPos = yPos;
        this.boxWidth = boxWidth;
        this.boxHeight = boxHeight;
    }

    draw(context) {
        context.fillStyle = this.clr;
        context.fillRect(this.xPos, this.yPos, this.boxWidth, this.boxHeight);
    }
}

function clearScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Line thickness for Tetris game border
const thickness = 1;

// Tetris game dimensions
const gameStartX = 0;
const gameStartY = 0;
const gameWidth = 224;
const gameHeight = 352;


function addedCanvasValuesToDrawScreen() {
    // Clear screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw canvas background
    let canvasBG = new drawScreen("#fff200", 0, 0, canvas.width, canvas.height);
    canvasBG.draw(ctx);
}

function addBoxValuesToDrawScreen() {
    // Draw tetris box
    let boxBorder = new drawScreen("#000", gameStartX - thickness, gameStartY - thickness, gameWidth + thickness*2, gameHeight + thickness*2);
    boxBorder.draw(ctx);

    let boxFill = new drawScreen("#fff200", gameStartX, gameStartY, gameWidth, gameHeight);
    boxFill.draw(ctx);

}

addedCanvasValuesToDrawScreen();
addBoxValuesToDrawScreen();

function arenaSweep() {
    outer: for (let y = arena.length - 1; y > 0; --y) {
        for (let x = 0; x < arena.length; ++x) {
            if (arena[y][x] === 0) {
                continue outer;
            }
        }

        const row = arena.splice(y, 1)[0].fill(0);
        arena.unshift(row);
        ++y;
        timeLeft+=5;

        score += 10;
        sweepSound.play();
        drawScore.innerHTML = `Score: ${score}`;
    }
}

function collide(arena, player) {
    const [m, o] = [player.matrix, player.pos];

    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 && (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

function createMatrix(w, h) {
    const matrix = [];

    while (h--) {
        matrix.push(new Array(w).fill(0));
    }

    return matrix;
}

function createPiece(type) {
    if (type === "T") {
        return [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0],
        ];
    } else if (type === "O") {
        return [
            [2, 2],
            [2, 2],
        ];
    } else if (type === "L") {
        return [
            [0, 3, 0],
            [0, 3, 0],
            [0, 3, 3],
        ];
    } else if (type === "J") {
        return [
            [0, 4, 0],
            [0, 4, 0],
            [4, 4, 0],
        ];
    } else if (type === "I") {
        return [
            [0, 5, 0, 0],
            [0, 5, 0, 0],
            [0, 5, 0, 0],
            [0, 5, 0, 0],
        ];
    } else if (type === "S") {
        return [
            [0, 6, 6],
            [6, 6, 0],
            [0, 0, 0],
        ];
    } else if (type === "Z") {
        return [
            [7, 7, 0],
            [0, 7, 7],
            [0, 0, 0],
        ];
    }
}

function draw() {
    addedCanvasValuesToDrawScreen();
    addBoxValuesToDrawScreen();

    drawMatrix(arena, {x:0, y: 0});

    drawMatrix(player.matrix, player.pos);
}

function drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                let matrixBlock = new drawScreen(colors[value], (x + offset.x)*scaleFactor, (y + offset.y)*scaleFactor, (1)*scaleFactor, (1)*scaleFactor);
                matrixBlock.draw(ctx);
            }
        });
    });
}

function merge(arena, player) {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                arena[y + player.pos.y][x + player.pos.x] = value;
            }
        })
    })
}

function playerDrop() {
    player.pos.y++;
    if (collide(arena, player)) {
        player.pos.y--;
        merge(arena, player);
        playerReset();
        arenaSweep();
    }
    dropCounter = 0;
}

function playerMove(dir) {
    player.pos.x += dir;
    if (collide(arena, player)) {
        player.pos.x -= dir;
    }
}

function playerReset() {
    const pieces = "ILJOTSZ";
    player.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
    player.pos.y = 0;
    player.pos.x = (arena[0].length / 2 | 0) - (player.matrix[0].length / 2 | 0); 
    if (collide(arena, player)) {
        arena.forEach(row => row.fill(0));
    }
}

function playerRotate(dir) {
    const pos = player.pos.x;
    let offset = 1;
    rotate(player.matrix, dir);
    while (collide(arena, player)) {
        player.pos.x += offset;
        offset = - (offset + (offset > 0 ? 1 : -1));
        if (offset > player.matrix[0].length) {
            rotate(player.matrix, - dir);
            player.pos.x = pos;
            return;
        }
    }
}

function rotate(matrix, dir) {
    for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < y; ++x) {
            [
                matrix[x][y],
                matrix[y][x],
            ] = [
                matrix[y][x],
                matrix[x][y],
            ]
        }
    }

    if (dir >  0) {
        matrix.forEach(row => row.reverse());
    } else {
        matrix.reverse();
    }
}

// In milliseconds
let dropCounter = 0;
let dropInterval = 1000;

let lastTime = 0;

let animation = true;

function update(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;

    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        playerDrop();
    }

    draw();

    if (animation) {
        requestAnimationFrame(update);
    } else {
        cancelAnimationFrame(update);
    }
};

const colors = [
    null,
    'purple',
    'red',
    'green',
    'blue',
    'hotpink',
    'darkgoldenrod',
    'rebeccapurple'
]

const arena = createMatrix(14, 22);
const pieces = "ILJOTSZ";

const player = {
    pos: {x: 1, y: 2},
    matrix: createPiece(pieces[pieces.length * Math.random() | 0]),
};

document.addEventListener("keydown", arrowKeys, true);

function arrowKeys(event) {
    if (event.key === "ArrowLeft") { // keyCode = 37
        playerMove(-1);
    } else if (event.key === "ArrowRight") { // keyCode = 39
        playerMove(1);
    } else if (event.key === "ArrowDown") { // keyCode = 40
        playerDrop();
    } else if (event.key === "ArrowUp") { // keyCode = 38
        playerRotate(1);
    }
}

document.onkeyup = function() {
    update();
}

const isGameOver =
    setInterval(function() {
        if (timeLeft <= 0) {
            clearInterval(isGameOver);
            gameOverSound.play();
            drawCountdown.innerHTML = `Countdown: 0s`
            animation = false;
            document.removeEventListener("keydown", arrowKeys, true);
            end.fillStyle = "#000";
            end.font = "50px bold Verdana";
            end.fillText("Game Over", canvas.width / 4.8, canvas.height / 2);
        } else if (timeLeft >= 70){
            drawCountdown.innerHTML = `Countdown: 1:${timeLeft-60}min`
            timeLeft -= 1;
        } else if (timeLeft > 60 && timeLeft < 70) {
            drawCountdown.innerHTML = `Countdown: 1:0${timeLeft-60}min`
            timeLeft -= 1;
        } else if (timeLeft === 60) {
            drawCountdown.innerHTML = `Countdown: 1min`
            timeLeft -= 1;
        } else if (timeLeft <= 59 && timeLeft > 0) {
            drawCountdown.innerHTML = `Countdown: ${timeLeft}s`
            timeLeft -= 1;
        }
    }, 1000)

document.addEventListener('keyup', function(event) {
    isGameOver();
}, {once: true});