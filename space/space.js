/** @type {HTMLCanvasElement} */

const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

const scaleFactor = 5;

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

class drawTrangle{
    constructor(clr, xPos, yPos, boxWidth, boxHeight) {
        this.clr = clr;
        this.xPos = xPos;
        this.yPos = yPos;
        this.boxWidth = boxWidth;
        this.boxHeight = boxHeight;
    }   

    draw(context) {       
        context.fillStyle = this.clr;
        
        context.beginPath();
        context.moveTo(this.xPos + this.boxWidth, this.yPos + this.boxHeight);
        context.lineTo(this.xPos, this.yPos + this.boxHeight);
        context.lineTo(this.xPos + this.boxWidth, this.yPos);
        context.closePath();
        
        context.fill();
    }
}

function addedCanvasValuesToDrawScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let canvasBG = new drawScreen("#1c5fa6", 0, 0, canvas.width, canvas.height)
    canvasBG.draw(ctx);
}

addedCanvasValuesToDrawScreen();

function clearScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function firstNonZeroInArray(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === 0) {
            continue;
        } else {
            return i;
        }
    }
}

function lastNonZeroInArray(arr) {
    for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] === 0) {
            continue;
        } else {
            return i;
        }
    }
}


// For player's unique shape
function drawMatrixPlayer(matrix, offset) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0 && (row.every(num => num === row[0]) || (x === lastNonZeroInArray(row) && x !== firstNonZeroInArray(row)))) {
                let matrixBlock = new drawScreen('orangered', (x + offset.x)*scaleFactor, (y + offset.y)*scaleFactor, (1)*scaleFactor, (1)*scaleFactor);
                matrixBlock.draw(ctx);
            } else if (x === firstNonZeroInArray(row)) {
                let matrixBlock = new drawTrangle('orangered', (x + offset.x)*scaleFactor, (y + offset.y)*scaleFactor, (1)*scaleFactor, (1)*scaleFactor);
                matrixBlock.draw(ctx);
            }
        });
    });
}

const scaleFactorOpponent = 7;

// General reusable function
function drawMatrixOpponents(matrix, offset) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                let matrixBlock = new drawScreen('hotpink', (x + offset.x)*scaleFactorOpponent, (y + offset.y)*scaleFactorOpponent, (1)*scaleFactorOpponent, (1)*scaleFactorOpponent);
                matrixBlock.draw(ctx);
            }
        });
    });
}

const player = {
    matrix: 
    [
        [0, 0, 0, 1, 0],
        [0, 0, 1, 1, 0],
        [1, 1, 1, 1, 1]
    ],
    pos: {x: 7, y: 74},
};

const opponents = {
    matrix: 
    [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    pos: {x: 1, y: 1},
    score: 0,
}

function createMatrix(w, h) {
    const matrix = [];

    while (h--) {
        matrix.push(new Array(w).fill(0));
    }

    return matrix;
}

const arena = createMatrix(20, 20);

setInterval(function() {
    if (opponents.pos.x >= 1) {
        opponents.pos.x++;
    } else if (opponents.pos.x <= 10) {
        opponents.pos.x--;
    }
     clearScreen();

     addedCanvasValuesToDrawScreen();

    drawMatrixPlayer(arena, {x: 0, y: 0});
    drawMatrixPlayer(player.matrix, player.pos);

    drawMatrixOpponents(arena, {x: 0, y: 0});
    drawMatrixOpponents(opponents.matrix, opponents.pos);
}, 200);

function draw() {
    // clearScreen();

    // addedCanvasValuesToDrawScreen();

    drawMatrixPlayer(arena, {x: 0, y: 0});
    drawMatrixPlayer(player.matrix, player.pos);

    // opponents.pos.x++;
    // drawMatrixOpponents(opponents.matrix, opponents.pos);
}

// draw();

document.addEventListener("keydown", playerControls, true);

function playerControls(event) {
    if (event.key === "ArrowLeft") {
        player.pos.x-=2;
        if (player.pos.x <= 1) {
            player.pos.x = 1;
        }
    } else if (event.key === "ArrowRight") {
        player.pos.x+=2;
        if (player.pos.x >= 74) {
            player.pos.x = 74;
        }
    } 

    draw();
}

draw();