const width = 28
const grid = document.querySelector(".grid")
const scoreDisplay = document.getElementById("score")
const positionDisplay = document.getElementById("position")
const pacDotScoreValue = 1
const powerPelletScoreValue =10
const squares = []
//const ghosts = []
let scoreCount = 0
let pacDotCount = 0
let powerPelletCount = 0

// 0 - pac-dots
// 1 - wall
// 2 - ghost-lair
// 3 - power-pellet
// 4 - empty

const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1 
]

scoreDisplay.textContent = scoreCount



function createBoard(){
    for(let i = 0; i < layout.length; i++){
        const square = document.createElement("div")
        grid.appendChild(square)
        squares.push(square)

        if (layout[i] === 0) {
            squares[i].className = "pac-dot"
        } else if (layout[i] === 1) {
            squares[i].className = "wall"
        } else if (layout[i] === 3) {
            squares[i].className = "power-pellet"
        } else if (layout[i] === 2) {
            squares[i].className = "ghost-lair"
        }
    }
}

createBoard()



// Defines starting position of PacMan
let currentPacManIndex = 490
squares[currentPacManIndex].className = "pacman"
positionDisplay.textContent = currentPacManIndex

function updatePositionDisplay() {
    positionDisplay.textContent = currentPacManIndex
}



// Allows PacMan to move up, down, left, right
function movePacMan(spaces) {
    squares[currentPacManIndex].classList.remove("pacman")

    if (layout[currentPacManIndex + spaces] !== 1) {
                
        currentPacManIndex += spaces
        
    } else if ( (currentPacManIndex === 364) && (spaces === -1) ) {

        currentPacManIndex = 391

    } else if ( (currentPacManIndex === 391) && (spaces === 1) ) {

        currentPacManIndex = 364
    }

    squares[currentPacManIndex].classList.add("pacman")
    updatePositionDisplay()
}



// An alternative way to move PacMan
function movePacManModulusStyle(dir){
    squares[currentPacManIndex].classList.remove("pacman")

    // Taking the shortcut
    if ((dir === -1) && (currentPacManIndex === 364)) {

        currentPacManIndex = 391

    } else if ((dir === 1) && (currentPacManIndex === 391)) {

        currentPacManIndex = 364

    } else if (!(squares[currentPacManIndex + dir].classList.contains("wall")) &&
        !(squares[currentPacManIndex + dir].classList.contains("ghost-lair"))) {

        //Left
        if ((dir === -1) && (currentPacManIndex % width !== 0) ) { 

            currentPacManIndex += dir

        //right
        } else if ((dir === 1) && (currentPacManIndex % width < 27)) { 
            
            currentPacManIndex += dir

        //dn
        } else if ((dir === width) && ((currentPacManIndex + dir) < (width * width))) {
            
            currentPacManIndex += dir

        //up
        } else if ((dir === -width) && ( (currentPacManIndex + dir) > 0 ) ) { 
            
            currentPacManIndex += dir

        } 
    }

    squares[currentPacManIndex].classList.add("pacman")
    updatePositionDisplay()
}



// Adds points to the score if a PacDot or a PowerPellet is eaten
function updateScore(value){
    scoreCount += value
    scoreDisplay.textContent = scoreCount
}



// Activates the powers of the PowerPellet
function activatePowerPellet(){
    // Ghosts become scared
    ghosts.forEach((ghost) => {
        ghost.isScared = true
    })

    // Use setTimeout to unscare ghosts after 10sec.
    setTimeout(function() {
        ghosts.forEach((ghost) => {
            ghost.isScared = false
        })
    }, 10000)
}



// Checks if there is a PacDot or PowerPellet for PacMan to eat
function checkPacDot (){
    if (squares[currentPacManIndex].classList.contains("pac-dot")) {

        squares[currentPacManIndex].classList.remove("pac-dot")
        updateScore(pacDotScoreValue)
        pacDotCount++

    } else if (squares[currentPacManIndex].classList.contains("power-pellet")) {

        squares[currentPacManIndex].classList.remove("power-pellet")
        updateScore(powerPelletScoreValue)
        powerPelletCount++
        activatePowerPellet()
    }
}



// Defines what should be down if one of the arrow keys are pressed
function control(e){

    switch (e.keyCode) {
        case 40:                    // DOWN
            
            //movePacMan(28)
            movePacManModulusStyle(width)
            break

        case 38:                    // UP
            
            //movePacMan(-28)
            movePacManModulusStyle(-width)
            break

        case 37:                    // LEFT
            
            //movePacMan(-1)
            movePacManModulusStyle(-1)
            break

        case 39:                    // RIGHT
            
            //movePacMan(1)
            movePacManModulusStyle(1)
            break
    }

    checkPacDot()
}



// "listens" for a keyboard key to be released 
document.addEventListener("keyup", control)



// Creating our Ghosts
class Ghost {
    constructor(classAndGhostName, ghostStartingIndex, ghostSpeed){
        this.classAndGhostName = classAndGhostName
        this.ghostStartingIndex = ghostStartingIndex
        this.ghostSpeed = ghostSpeed
        this.currentIndex = ghostStartingIndex
        this.isScared = false
        this.timerId = NaN
        this.timeStartId = NaN
        this.startPos = true
    }
}

const ghosts = [
    new Ghost("blinky", 348, 250),
    new Ghost("pinky", 376, 400),
    new Ghost("inky", 351, 300),
    new Ghost("clyde", 379, 500)
]

ghosts.forEach((ghost) => {
    squares[ghost.ghostStartingIndex].classList.add(ghost.classAndGhostName)
    squares[ghost.ghostStartingIndex].classList.add("ghost")
})


// Moving our Ghosts


function moveGhost(ghost) {
    
    const directions = [1, -1, width, -width]

    const blinkyPath = [1, -width, -width]
    const inkyPath = [-1, -width, -width]
    const pinkyPath = [width, 1, -width, -width, -width, -width]
    const clydePath = [1, width, -1, -1, -width, -width, -width, -width]

    let direction = directions[Math.floor(Math.random() * directions.length)]

    // let runCounter = 0 // Debug Tool
    
    
    
    // Ghosts moving at intervals
    ghost.timerId = setInterval(function(){
        
        // Start sequence so all ghosts get out of the lair
        if (ghost.classAndGhostName === "blinky" && ghost.startPos) {

            squares[ghost.currentIndex].classList.remove(ghost.classAndGhostName)
            squares[ghost.currentIndex].classList.remove("ghost")
            ghost.currentIndex += blinkyPath[0]
            squares[ghost.currentIndex].classList.add(ghost.classAndGhostName)
            squares[ghost.currentIndex].classList.add("ghost")

            blinkyPath.shift()

            if (blinkyPath.length === 0) {
                direction = directions[3]
                ghost.startPos = false
                blinkyPath.push(1, -width, -width, -1)
            }

        } else if (ghost.classAndGhostName === "inky" && ghost.startPos) {

                squares[ghost.currentIndex].classList.remove(ghost.classAndGhostName)
                squares[ghost.currentIndex].classList.remove("ghost")
                ghost.currentIndex += inkyPath[0]
                squares[ghost.currentIndex].classList.add(ghost.classAndGhostName)
                squares[ghost.currentIndex].classList.add("ghost")

                inkyPath.shift()

                if (inkyPath.length === 0) {
                    direction = directions[3]                    
                    ghost.startPos = false
                    inkyPath.push(-1, -width, -width)
                }

        } else if (ghost.classAndGhostName === "pinky" && ghost.startPos) {

                squares[ghost.currentIndex].classList.remove(ghost.classAndGhostName)
                squares[ghost.currentIndex].classList.remove("ghost")
                ghost.currentIndex += pinkyPath[0]
                squares[ghost.currentIndex].classList.add(ghost.classAndGhostName)
                squares[ghost.currentIndex].classList.add("ghost")

                pinkyPath.shift()

                if (pinkyPath.length === 0) {
                    direction = directions[3]
                    ghost.startPos = false
                    pinkyPath.push(width, 1, -width, -width, -width, -width)
                }
            
        } else if (ghost.classAndGhostName === "clyde" && ghost.startPos) {

                squares[ghost.currentIndex].classList.remove(ghost.classAndGhostName)
                squares[ghost.currentIndex].classList.remove("ghost")
                ghost.currentIndex += clydePath[0]
                squares[ghost.currentIndex].classList.add(ghost.classAndGhostName)
                squares[ghost.currentIndex].classList.add("ghost")

                clydePath.shift()

                if (clydePath.length === 0) {
                    direction = directions[3]
                    ghost.startPos = false
                    clydePath.push(1, width, -1, -1, -width, -width, -width, -width)
                }
        }
        
        // Post-start sequence how ghosts move inside the maze
        if (ghost.startPos === false){

            if (
                !(squares[ghost.currentIndex + direction].classList.contains("wall"))
                && 
                !(squares[ghost.currentIndex + direction].classList.contains("ghost"))
                ){

                squares[ghost.currentIndex].classList.remove(ghost.classAndGhostName)
                squares[ghost.currentIndex].classList.remove("ghost")
                squares[ghost.currentIndex].classList.remove("scared-ghost")

                ghost.currentIndex += direction

                squares[ghost.currentIndex].classList.add(ghost.classAndGhostName)
                squares[ghost.currentIndex].classList.add("ghost")
                if (ghost.isScared){
                    squares[ghost.currentIndex].classList.add("scared-ghost")
                }
            } else {
                // prevents ghosts from going backwards
                const possDirections = [1, -1, width, -width]
                const newDirections = []
            
                const usedDirIndex = possDirections.indexOf(direction)
                const oppUsedDirIndex = possDirections.indexOf( (direction * -1) )
                
                for (let i = 0; i < possDirections.length; i++){
                    if ( !(i === usedDirIndex) && !(i === oppUsedDirIndex) ){
                        newDirections.push(possDirections[i])
                    }
                }
                
                const randomDir = newDirections[Math.floor(Math.random() * newDirections.length)]

                if (
                    !(squares[ghost.currentIndex + randomDir].classList.contains("wall"))
                    && 
                    !(squares[ghost.currentIndex + randomDir].classList.contains("ghost"))
                    ){
            
                        direction = randomDir
            
                } else {
                        direction = (randomDir * -1)
                }

                // direction = directions[Math.floor(Math.random() * directions.length)]
            }
        }

        // Scared Ghosts Scenario
        if (ghost.isScared) {
            squares[ghost.currentIndex].classList.add("scared-ghost")
        }

        if ( (ghost.isScared) && (squares[ghost.currentIndex].classList.contains("pacman")) ) {
            squares[ghost.currentIndex].classList.remove("ghost", "scared-ghost", ghost.classAndGhostName)
            ghost.startPos = true
            ghost.isScared = false
            updateScore(100)
            ghost.currentIndex = ghost.ghostStartingIndex
            squares[ghost.currentIndex].classList.add("ghost", ghost.classAndGhostName)
        }

        checkForGameOver()
        checkForWin()
        
    }, ghost.ghostSpeed)
    
}

ghosts.forEach(moveGhost)

function checkForGameOver(){
    if (squares[currentPacManIndex].classList.contains("ghost") &&
    !(squares[currentPacManIndex].classList.contains("scared-ghost")) ){
        
        ghosts.forEach((ghost) => {
            clearInterval(ghost.timerId)
        })

        document.removeEventListener("keyup", control)

        scoreDisplay.textContent = "GAME OVER"
    }
}

function checkForWin(){
    if (pacDotCount === 234 && powerPelletCount === 4) {

        ghosts.forEach((ghost) => {
            clearInterval(ghost.timerId)
        })

        document.removeEventListener("keyup", control)

        scoreDisplay.textContent = "YOU WIN!!!!!"
    }
}