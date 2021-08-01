/** @type {HTMLCanvasElement} */

const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

const scaleFactor = 10;

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

function drawMatrix(matrix, offset) {
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

const player = {
    matrix: 
    [
        [0, 0, 0, 1, 0],
        [0, 0, 1, 1, 0],
        [1, 1, 1, 1, 1]
    ],
    pos: {x: 1, y: 36}, 
    score: 0,
};

function createMatrix(w, h) {
    const matrix = [];

    while (h--) {
        matrix.push(new Array(w).fill(0));
    }

    return matrix;
}

const arena = createMatrix(20, 20);

function draw() {
    drawMatrix(arena, {x: 0, y: 0});
    drawMatrix(player.matrix, player.pos);
}

document.addEventListener("keydown", playerControls);

function playerControls(event) {
    if (event.key === "ArrowLeft") {
        player.pos.x++;
    } else if (event.key === "ArrowRight") {
        player.pos.x--;
    } else if (event.key = "Spacebar") {
        
    }
}

draw();