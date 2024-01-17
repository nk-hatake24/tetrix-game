document.addEventListener('DOMContentLoaded', () =>{
    // first page
    const anchor = document.querySelector('.anchor')
    const tetris = document.querySelector('.tetris')
    // second page tetris
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const last = Array.from(document.querySelectorAll('#last'))
    const width = 10
    const scoreDisplay = document.querySelector('#score')
    const start = document.querySelector('#start-button')
    const lowSpeed = document.querySelector('#lowSpeed') 
    const normal = document.querySelector('#normal') 
    const highSpeed = document.querySelector('#highSpeed') 
    const choiceLevel = document.querySelector('.choiceLevel') 
    const up = document.querySelector(".up")
    const down = document.querySelector(".down")
    const left = document.querySelector(".left")
    const right = document.querySelector(".right")

    var verify = 0//to verify de speed

    let nextRandom = 0
    let timerId
    let score = 0


   
        anchor.addEventListener("click", () => {
            choiceLevel.scrollIntoView({ behavior: 'smooth' });
        });
    

    document.addEventListener('keydown', function(event) {
        if (event.keyCode === 38) { // 38 est le code de la touche 'haut'
            event.preventDefault(); // Empêche le défilement
        }
    });

    //the testominos
    // const lTestominos = [
    //     [1, width+1, width*2+1,2],
    //     [width , width+1, width*2+1, width*2+2],
    //     [1,width+1, width*2+1, width*2],
    //     [width, width*2, width*2+1,width*2+2]
    // ]

    const lTetrominos = [
        [1, width+1, width*2+1, 2], // Rotation 1
        [width, width+1, width+2, width*2+2], // Rotation 2
        [1, width+1, width*2+1, width*2], // Rotation 3
        [width, width+1, width+2, width*2] // Rotation 4
    ]

    const ztetromino = [
        [0,width,width+1,width*2+1],
        [width+1,width+2,width*2,width*2+1],
        [0,width,width+1,width*2+1],
        [width+1,width+2,width*2,width*2+1],
    ]

    const tTetrominio = [
        [1, width, width+1, width+2],
        [1, width+1, width+2, width*2+1],
        [width, width+1, width+2, width*2+1], 
        [1, width, width+1, width*2+1]
    ]

    const oTetromino = [
         [0,1,width,width+1],
         [0,1,width,width+1],
         [0,1,width,width+1],
         [0,1,width,width+1],
    ]

    const iTetromino = [
        [1, width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3],
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3]
    ]

    const theTetrominoes = [lTetrominos, ztetromino, tTetrominio, oTetromino, iTetromino]

    let random = Math.floor(Math.random()*theTetrominoes.length)
    let currentPosition = 4
    let currentRotation = 0
    let current = theTetrominoes[random][currentRotation]

    // draw the testominos

function draw(){
    current.forEach(index => {
        squares[currentPosition + index].classList.add('tetromino')
    })
}

    
// undraw the testomino
function undraw() {
        current.forEach(index => {
        squares[currentPosition + index].classList.remove('tetromino')
    }) 
}



// assignes keycodes
function control(e){
    if(e.keyCode === 37){
        moveLeft()
    }else if(e.keyCode === 38){
        rotate()
    }
    else if(e.keyCode === 39){
        moveRight()
     }
    else if(e.keyCode === 40){
        moveDown()
    }
    
}


// button to rotate
up.addEventListener('click', rotate)
down.addEventListener('click', moveDown)
right.addEventListener('click',  moveRight)
left.addEventListener('click', moveLeft)


document.addEventListener('keyup', control)

//move down function
function moveDown() {
    undraw()
    currentPosition += width
    draw()
    freeze()
}

// freeze function


function freeze() {
    // Vérifier la collision avec le bas de la grille ou un tétraminos existant
    if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
        // Ajouter la classe 'taken' aux carrés du tétraminos actuel
        current.forEach(index => squares[currentPosition + index].classList.add('taken'));

        // Redémarrer le tétraminos et gérer le prochain
        startNewTetromino();
    }
}

function startNewTetromino() {
    // Sélectionner un nouveau tétraminos aléatoire
    random = nextRandom;
    nextRandom = Math.floor(Math.random() * theTetrominoes.length);
    current = theTetrominoes[random][currentRotation];

    // Réinitialiser la position horizontale du tétraminos
    currentPosition = 4;

    // Dessiner la grille avec le nouveau tétraminos
    draw();

    // Afficher le prochain tétraminos
    displayShape();

    // Ajouter la logique pour ajouter des points, vérifier le game over, etc.
    addScore();
    gameOver();
}






// move the tetromino left
function moveLeft(){
    undraw()
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)

    if(!isAtLeftEdge) currentPosition -= 1

    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
        currentPosition += 1
    }

    draw()
}

function moveRight(){
    undraw()
    const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1)

    if(!isAtRightEdge) currentPosition += 1

    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
        currentPosition -= 1
    }

    draw()
}


//rotate the testromino

function rotate(){
    undraw()
    currentRotation++
    if(currentRotation === current.length){
        currentRotation = 0
    }
    current = theTetrominoes[random][currentRotation]
    draw()
}

// show the nexttetromino in the mini grid display
const displaySquares = Array.from(document.querySelectorAll('.mini-grid div'))
const displayWidth = 4
let displayIndex = 0


// the testrominos without rotation
const upNextTetrominoes = [
    [1, displayWidth + 1, displayWidth * 2 + 1, 2], //lTestromino
    [0, displayWidth, displayWidth + 1, displayWidth * 2+1],// zTetromino
    [1, displayWidth, displayWidth + 1, displayWidth + 2], //tTetromino
    [0, 1, displayWidth, displayWidth + 1], // otetromino
    [1, displayWidth + 1, displayWidth * 2 + 1 ,displayWidth * 3 + 1] //ztetromino
]

// display shapes in the mini-grid
function displayShape() {
// remove any trace of the tertominoin the entire grid
    displaySquares.forEach(square => {
        square.classList.remove('tetromino')
    })

upNextTetrominoes[nextRandom].forEach(index => {
    displaySquares[displayIndex + index].classList .add('tetromino')
})
}


// low speed button

    lowSpeed.addEventListener('click', ()=> {
        verify = 1
        tetris.scrollIntoView({ behavior: 'smooth' });

})


// normal speed

    normal.addEventListener('click', ()=> {
        verify = 2
    tetris.scrollIntoView({ behavior: 'smooth' });

        
})


// high speed

    highSpeed.addEventListener('click', ()=> {
        verify = 3
        tetris.scrollIntoView({ behavior: 'smooth' });

        
})



// add functionalities to the start/pause button
const starter = () =>{
start.addEventListener('click', () => {
    if (scoreDisplay.innerHTML === 'game over') {
        restartGame();
    }else if (timerId){
        clearInterval(timerId)
        timerId = null
    }else{
        draw()
        // timerId = setInterval(moveDown, 500)
        if(verify === 1){
            timerId = setInterval(moveDown, 600)
        }else if(verify === 2){
            timerId = setInterval(moveDown, 300)
        }else if(verify === 3){
            timerId = setInterval(moveDown, 100)
        }else{
            timerId = setInterval(moveDown, 500)
        }
        nextRandom = Math.floor(Math.random() * theTetrominoes.length)
        displayShape()
    }
})
}
starter()


// add score
function addScore(){
    for (let i = 0; i < 199; i += width){
        const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

        if (row.every(index => squares[index].classList.contains('taken'))){
            score += 10
            scoreDisplay.innerHTML = score
            row.forEach(index => {
                squares[index].classList.remove('taken')
                squares[index].classList.remove('tetromino')
            })
            const squaresRemoved = squares.splice(i, width)
            squares = squaresRemoved.concat(squares)
            squares.forEach(cell => grid.appendChild(cell))
        
        }
    }
}

//game over
function gameOver(){
    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
        scoreDisplay.innerHTML = 'game over'
        clearInterval(timerId)
        start.textContent = 'Restart'
    }
}

// restartGame
function restartGame() {
    // Réinitialiser le score
    score = 0;
    start.textContent = 'start/pause';
    scoreDisplay.innerHTML = score;

    // Effacer la grille
    squares.forEach(square => {
        square.classList.remove('tetromino', 'taken');
    });


    // Réinitialiser les positions et les rotations des Tetrominos
    currentPosition = 4;
    currentRotation = 0;
    random = Math.floor(Math.random() * theTetrominoes.length);
    current = theTetrominoes[random][currentRotation];
    

    // Redémarrer le timer
    if(timerId) {
        clearInterval(timerId);
        timerId = null
    }
    choiceLevel.scrollIntoView({ behavior: 'smooth' });
    // timerId = setInterval(moveDown, 500);

    // // Préparer le prochain Tetromino
    nextRandom = Math.floor(Math.random() * theTetrominoes.length);
    displayShape();
    last.forEach(index => index.classList.add('taken'));
    
    
    
    
}

})

