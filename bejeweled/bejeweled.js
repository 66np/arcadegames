/** @type {HTMLCanvasElement} */

// attr: https://www.youtube.com/watch?v=XD5sZWxwJUk&t=412s&ab_channel=CodewithAniaKub%C3%B3w

const canvas = document.getElementById("bejeweled");
const ctx = canvas.getContext('2d');

const squares = [];

const tileColors = [
    'red',
    'yellow',
    'orange',
    'purple',
    'green',
    'blue',
    'white'
];

let tileCount = 10;
let tileSize = canvas.width / tileCount;

function createBoard() {
    for (var x = 0; x < tileCount; x++) {
        let i = tileSize * x;
        for (var y = 0; y < tileCount; y++) {
            if (x % 2 === y % 2) {
                ctx.fillStyle = '#4f483f';
                ctx.fillRect(40*x, 40*y, 40, 40);
            } else {
                ctx.fillStyle = '#b5a188';
                ctx.fillRect(40*x, 40*y, 40, 40);
            }

            let j = tileSize * y;

            let clr = Math.floor(Math.random() * tileColors.length);
            ctx.beginPath();

            if (clr === 0) {
                ctx.arc(i + tileSize / 2, j + tileSize / 2, 15, 0 , 2*Math.PI);
            } else if (clr === 1) {
                ctx.moveTo(i + tileSize / 2, j + tileSize * .1);
                ctx.lineTo(i + tileSize * .6, j + tileSize * .3);
                ctx.lineTo(i + tileSize * .85, j + tileSize * .3);
                ctx.lineTo(i + tileSize * .7, j + tileSize * .55);
                ctx.lineTo(i + tileSize * .75, j + tileSize * .8);
                ctx.lineTo(i + tileSize / 2, j + tileSize * .65);
                ctx.lineTo(i + tileSize * .25, j + tileSize * .8);
                ctx.lineTo(i + tileSize * .3, j + tileSize * .55);
                ctx.lineTo(i + tileSize * .15, j + tileSize * .3);
                ctx.lineTo(i + tileSize * .4, j + tileSize * .3);
            } else if (clr === 2) {
                ctx.moveTo(i + tileSize *.3, j + tileSize * .18);
                ctx.lineTo(i + tileSize *.7, j + tileSize * .18);
                ctx.lineTo(i + tileSize *.85, j + tileSize / 2);
                ctx.lineTo(i + tileSize *.7, j + tileSize *.82);
                ctx.lineTo(i + tileSize *.3, j + tileSize *.82);
                ctx.lineTo(i + tileSize *.15, j + tileSize / 2);
            } else if (clr === 3) {
                ctx.moveTo(i + tileSize / 2, j + tileSize * .05);
                ctx.lineTo(i + tileSize * .1, j + tileSize * .8);
                ctx.lineTo(i + tileSize * .9, j + tileSize * .8);
            } else if (clr === 4) {
                ctx.moveTo(i + tileSize / 2, j + tileSize * .1);
                ctx.lineTo(i + tileSize * .85, j + tileSize * .4);
                ctx.lineTo(i + tileSize * .7, j + tileSize * .8);
                ctx.lineTo(i + tileSize * .3, j + tileSize * .8);
                ctx.lineTo(i + tileSize * .15, j + tileSize * .4);
            } else if (clr === 5) {
                ctx.moveTo(i + tileSize * .2, j + tileSize * .15);
                ctx.lineTo(i + tileSize * .8, j + tileSize * .15);
                ctx.lineTo(i + tileSize * .8, j + tileSize * .80);
                ctx.lineTo(i + tileSize * .2, j + tileSize * .80);
            } else if (clr === 6) {
                ctx.moveTo(i + tileSize / 2, j + tileSize * .15);
                ctx.lineTo(i + tileSize * .8, j + tileSize * .4);
                ctx.lineTo(i + tileSize / 2, j + tileSize * .80);
                ctx.lineTo(i + tileSize * .2, j + tileSize * .4);
            }
            ctx.closePath();
            ctx.fillStyle = tileColors[clr];
            ctx.fill();
        }
    }
}


function drawScreen() {
    createBoard();
}

drawScreen();