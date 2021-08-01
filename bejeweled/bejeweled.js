/** @type {HTMLCanvasElement} */

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById("bejeweled");
    const ctx = canvas.getContext('2d');

    const grid = document.getElementById('grid');
    const squares = [];

    const drawGameOver = document.getElementById("game-over-text");
    const end = drawGameOver.getContext('2d');

    let score = 0;
    const drawScore = document.getElementById("score-text");

    const drawCountdown = document.getElementById("countdown-text");
    let timeLeft = 59;

    const gameOverSound = new Audio("gameOver.wav");
    const pointsThreeAndFourSound = new Audio("pointsThreeAndFour.wav");
    const pointsFiveSound = new Audio("pointsFive.wav");

    const jewelColors = [
        'red',
        'yellow',
        'orange',
        'purple',
        'green',
        'blue',
        'white'
    ];

    let tileCount = 10;
    let tileLength = canvas.width / tileCount;

    function createBoard() {
        for (let x = 0; x < tileCount; x++) {
            for (let y = 0; y < tileCount; y++) {
                if (x % 2 === y % 2) {
                    ctx.fillStyle = '#4f483f';
                    ctx.fillRect(tileLength*x, tileLength*y, tileLength, tileLength);
                } else {
                    ctx.fillStyle = '#b5a188';
                    ctx.fillRect(tileLength*x, tileLength*y, tileLength, tileLength);
                }
            }
        }
    }

    function createJewels() {
        for (let i = 0; i < tileCount*tileCount; i++) {
            const square = document.createElement('div');
            square.setAttribute('draggable', true);
            square.setAttribute('id', i);
            let randomColor = Math.floor(Math.random() * jewelColors.length);
            square.style.backgroundColor = jewelColors[randomColor];
            
            square.style.width = "40px";
            square.style.height = "40px";
            square.style.borderRadius = "50%";
            square.style.padding = "10px 10px";
            square.style.boxSizing = "border-box";
            square.style.border = "2px solid #fff";
            grid.append(square);
            squares.push(square);
        }
    }

    createBoard();
    createJewels();

    let colorBeingDragged;
    let colorBeingReplaced;
    let squareIdBeingDragged;
    let squareIdBeingReplaced;

    squares.forEach(square => square.addEventListener('dragstart', dragStart));
    squares.forEach(square => square.addEventListener('dragend', dragEnd));
    squares.forEach(square => square.addEventListener('dragover', dragOver));
    squares.forEach(square => square.addEventListener('dragenter', dragEnter));
    squares.forEach(square => square.addEventListener('dragleave', dragLeave));
    squares.forEach(square => square.addEventListener('drop', dragDrop));


    function dragStart() {
        colorBeingDragged = this.style.backgroundColor;
        squareIdBeingDragged = parseInt(this.id)
        console.log(colorBeingDragged);
        console.log(this.id, 'dragstart');
    }

    function dragOver(e) {
        e.preventDefault();
        console.log(this.id, 'dragover');
    }

    function dragEnter(e) {
        e.preventDefault();
        console.log(this.id, 'dragenter');
    }

    function dragLeave() {
        console.log(this.id, 'dragleave');
    }

    function dragDrop() {
        console.log(this.id, 'drop');
        colorBeingReplaced = this.style.backgroundColor;
        squareIdBeingReplaced = parseInt(this.id);
        this.style.backgroundColor = colorBeingDragged;
        squares[squareIdBeingDragged].style.backgroundColor = colorBeingReplaced;
    }

    function dragEnd() {
        console.log(this.id, 'dragend');
        // Only switch between tiles next to one another
        let validMoves = [squareIdBeingDragged - 1, 
            squareIdBeingDragged - tileCount, 
            squareIdBeingDragged + 1,
            squareIdBeingDragged + tileCount,
        ];
        let validMove = validMoves.includes(squareIdBeingReplaced);

        if (squareIdBeingDragged  && validMove) {
            squareIdBeingReplaced = null;
        } else if (squareIdBeingReplaced && !validMove) {
            squares[squareIdBeingReplaced].style.backgroundColor = colorBeingReplaced;
            squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged;
        } else squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged;
    }

    // Drop jewels once they have been cleared
    function moveDown() {
        for(let i = 0; i < 90; i++) {
            if (squares[i + tileCount].style.backgroundColor === '') {
                squares[i + tileCount].style.backgroundColor = squares[i].style.backgroundColor;
                let randomColor = Math.floor(Math.random() * jewelColors.length);
                squares[i].style.backgroundColor = jewelColors[randomColor];
                const firstRow = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
                const isFirstRow = firstRow.includes(i)
                if (isFirstRow && squares[i].style.backgroundColor === '') {
                    let randomColor = Math.floor(Math.random() * jewelColors.length);
                    squares[i].style.backgroundColor = jewelColors[randomColor];
                }
            }
        }
    }

    // Checking for matches

    // Check for Row of Three
    function checkRowForThree() {
        for (let i = 0; i < 98; i++) {
            let rowOfThree = [i, i+1, i+2];
            let decidedColor = squares[i].style.backgroundColor;
            let isBlank = squares[i].style.backgroundColor === '';

            const notValid = [8, 9, 18, 19, 28, 29, 38, 39, 48, 49, 58, 59, 68, 69, 78, 79, 88, 89];

            if(notValid.includes(i)) continue;

            if (rowOfThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
                score += 3;
                pointsThreeAndFourSound.play();
                drawScore.innerHTML = `Score: ${score}`;
                rowOfThree.forEach(index => {
                    squares[index].style.backgroundColor = '';
                })
            }
        }
    }
    
    checkRowForThree();

    // Check for Column of Three
    function checkColumnForThree() {
        for (let i = 0; i < 80; i++) {
            let columnOfThree = [i, i+tileCount, i+tileCount*2];
            let decidedColor = squares[i].style.backgroundColor;
            let isBlank = squares[i].style.backgroundColor === '';

            if (columnOfThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
                score += 3;
                pointsThreeAndFourSound.play();
                drawScore.innerHTML = `Score: ${score}`;
                columnOfThree.forEach(index => {
                    squares[index].style.backgroundColor = '';
                })
            }
        }
    }
    
    checkColumnForThree();

    // Check for Row of Four
    function checkRowForFour() {
        for (let i = 0; i < 97; i++) {
            let rowOfFour = [i, i+1, i+2, i+3];
            let decidedColor = squares[i].style.backgroundColor;
            let isBlank = squares[i].style.backgroundColor === '';

            const notValid = [7, 8, 9, 17, 18, 19, 27, 28, 29, 37, 38, 39, 47, 48, 49, 57, 58, 59, 67, 68, 69, 77, 78, 79, 87, 88, 89];

            if(notValid.includes(i)) continue;

            if (rowOfFour.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
                score += 4;
                pointsThreeAndFourSound.play();
                timeLeft += 1;
                drawScore.innerHTML = `Score: ${score}`;
                rowOfFour.forEach(index => {
                    squares[index].style.backgroundColor = '';
                })
            }
        }
    }
    
    checkRowForFour();

    // Check for Column of Four
    function checkColumnForFour() {
        for (let i = 0; i < 70; i++) {
            let columnOfFour = [i, i+tileCount, i+tileCount*2, i+tileCount*3];
            let decidedColor = squares[i].style.backgroundColor;
            let isBlank = squares[i].style.backgroundColor === '';

            if (columnOfFour.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
                score += 4;
                pointsThreeAndFourSound.play();
                timeLeft += 1;
                drawScore.innerHTML = `Score: ${score}`;
                columnOfFour.forEach(index => {
                    squares[index].style.backgroundColor = '';
                })
            }
        }
    }
    
    checkColumnForFour();

    // Check for Row of Five
    function checkRowForFive() {
        for (let i = 0; i < 96; i++) {
            let rowOfFive = [i, i+1, i+2, i+3, i+4];
            let decidedColor = squares[i].style.backgroundColor;
            let isBlank = squares[i].style.backgroundColor === '';

            const notValid = [6, 7, 8, 9, 16, 17, 18, 19, 26, 27, 28, 29, 36, 37, 38, 39, 46, 47, 48, 49, 56, 57, 58, 59, 66, 67, 68, 69, 76, 77, 78, 79, 86, 87, 88, 89];

            if(notValid.includes(i)) continue;

            if (rowOfFive.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
                score += 5;
                pointsFiveSound.play();
                timeLeft += 2;
                drawScore.innerHTML = `Score: ${score}`;
                rowOfFive.forEach(index => {
                    squares[index].style.backgroundColor = '';
                })
            }
        }
    }
    
    checkRowForFive();

    // Check for Column of Five
    function checkColumnForFive() {
        for (let i = 0; i < 60; i++) {
            let columnOfFive = [i, i+tileCount, i+tileCount*2, i+tileCount*3, i+tileCount*4];
            let decidedColor = squares[i].style.backgroundColor;
            let isBlank = squares[i].style.backgroundColor === '';

            if (columnOfFive.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
                score += 5;
                pointsFiveSound.play();
                timeLeft += 2;
                drawScore.innerHTML = `Score: ${score}`;
                columnOfFive.forEach(index => {
                    squares[index].style.backgroundColor = '';
                })
            }
        }
    }
    
    checkColumnForFive();

    window.setInterval(function() {
        moveDown();
        checkRowForThree();
        checkColumnForThree();
        checkRowForFour();
        checkColumnForFour();
        checkRowForFive();
        checkColumnForFive();
    }, 100);
    

    const isGameOver =
        setInterval(function() {
            if (timeLeft <= 0) {
                clearInterval(isGameOver);
                gameOverSound.play();
                grid.style.display = "none";
                end.fillStyle = "#fff";
                end.font = "50px bold Verdana";
                end.fillText("Game Over", canvas.width / 4.8, canvas.height / 2);
            }
            drawCountdown.innerHTML = `Countdown: ${timeLeft}s`
            timeLeft -= 1;
        }, 1000)
    

    document.addEventListener('mousedown', function(event) {
        isGameOver();
    }, {once: true});

})

