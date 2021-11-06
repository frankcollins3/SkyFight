// Credit to Bill Mei for code related to random ship placement.
// Credit to https://github.com/LearnTeachCode for code related to the ai board 


console.log("loaded");
// Declare Variables
let gameOver = false;
let p1HitCount = 0;
let aiHitCount = 0;
let carrier = {name: 'carrier', length: 5, dir: 0, location: [], hit: [], placed: false};
let fighterjet = {name: 'fighterjet', length: 4, dir: 0, location: [], hit: [], placed: false};
let stealthfighter = {name: 'stealthfighter', length: 3, dir: 0, location: [], hit: [], placed: false};
let airfighter = {name: 'airfighter', length: 3, dir: 0, location: [], hit: [], placed: false};
let patrol = {name: 'patrol', length: 2, dir: 0, location: [], hit: [], placed: false};
// dir = direction -> 0 = vertical, 1 = horizontal
let p1Planes = [carrier, fighterjet, stealthfighter, airfighter, patrol];
let aiPlanes= [carrier, fighterjet, stealthfighter, airfighter, patrol];
let p1Targeted = [];
let aiTargeted = [];
let player = 0; // 0 is human and 1 is AI
let aiBoard = 
[[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0]];
let EMPTY = 0;
let MISS = 1;
let PLANE = 2;
let HIT = 3;
let SUNK = 4; 
let VERTICAL = 0;
let HORIZONTAL = 1;
// 0 = empty, 1 = miss, 2 = undamaged ship, 3 = damaged ship, 4 = sunken ship

let rowCoord; 
let colCoord;
let selectedPlane; 
let rowCoordPlayer;
let colCoordPlayer;
let divs = [];
let cBoardHandle;
let pBoardHandle;
let mouseoutHandle
let mouseoverHandle;

//need AI PLACEMENT.


// DOM References 
document.addEventListener("DOMContentLoaded", function() {
    let playerBoard = document.getElementById("playerboard");
    let computerBoard = document.getElementById("computerboard");
    let resetButton = document.getElementById("reset");
    let startButton = document.getElementById("start");
    let commenceOperationButton = document.getElementById("fire")
    let carrierButton = document.getElementById("carrier");
    let fighterjetButton = document.getElementById("fighterjet");
    let stealthfighterButton = document.getElementById("stealthfighter");
    let airfighterButton = document.getElementById("airfighter");
    let patrolButton = document.getElementById("patrol");
    let rotateButton = document.getElementById("rotate");
    let intro = document.getElementById("intro")
    let h2El = document.getElementById("instructions1");
    let h3El = document.getElementById("instructions2");
    let h2El2 = document.getElementById("end");
    let pFleetEl = document.getElementById("player");
    let cFleetEl = document.getElementById("enemy");
    let hitSound = document.getElementById("hitsound");
    let missSound = document.getElementById("misssound");
    let backgroundSound = document.getElementById("backgroundsound");
    let body = document.getElementById("body");
    let main = document.getElementById("main");
    let footer = document.getElementById("footer");
    
    document.body.style.backgroundImage = "url('photos/hanger.jpeg')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    
    function playHitSound() {
        hitSound.pause();
        hitSound.currentTime = 0;
        hitSound.play();
        console.log("loadedHitSound");
    }

    function playMissSound() {
        missSound.pause();
        missSound.currentTime = 0;
        missSound.play();
        console.log("loadedMissSound");
    }

    function playBackgroundSound() {
        backgroundSound.pause();
        backgroundSound.currentTime = 0;
        backgroundSound.play().loop = true;
        console.log("loadedBackgroundSound");
    }

    // Create gameboards
    function createGameBoards () {
        for (let i = 0; i <= 9; i++) {
            for (let j = 0; j <= 9; j++) {
                var playerSquare = document.createElement("div");
                playerBoard.appendChild(playerSquare);
                playerSquare.classList.add("square")
                playerSquare.id = "p" + i + j; 
                var computerSquare = document.createElement("div");
                computerBoard.appendChild(computerSquare);
                computerSquare.classList.add("square")
                computerSquare.id = "c" + i + j; 
                
            }
        }
    };





// Selects the ship that I want to place.


// Initialize Game
// 1. Splash Screen 
// 2. Place ships and don't fire on opponenet
// 3. Once ships are placed you can commence operation
// 4. Once you win or the game is over you can reset
// 5. Reset clears the board.             

// 1. Splash Screen
// Opening sequence and start
// Background and text and start button
startButton.addEventListener("click", function(e) {
    playBackgroundSound();
});


// 2. Once you hit the start button
// Load the squares
// Place the ships
// Prevent firing on opponent
// AI loads their board. 
    
    function dropPlane(plane, rowCoordPlayer, colCoordPlayer) { // Source: Modified from Bill Mei
    var position = [];
    var newPosition = [];
    var row = parseInt(rowCoordPlayer);
    var col = parseInt(colCoordPlayer);
    if (!plane.placed) {
        for (var i = 0; i < plane.length; i++) {
            if (plane.dir === VERTICAL) {
                if (row <= 10 - plane.length) {
                    
                    position[i] = row + i;
                    newPosition = position.map(function(loc) {
                        return 'p' + loc + col;
                    });
                    plane.placed = true;
                    document.getElementById(selectedPlane.name).disabled = true; 
                }
            } else {
                if (col <= 10 - plane.length) {
                    position[i] = col + i;
                    newPosition = position.map(function(loc) {
                        return 'p' + row + loc;
                    });
                    plane.placed = true
                    document.getElementById(selectedPlane.name).disabled = true; 
                }
            }
        }
        
    }
    return newPosition;
    };        
    
    function rotatePlane(plane) {
        if (plane.dir === VERTICAL) {
            plane.dir = HORIZONTAL; 
        } else {
            plane.dir = VERTICAL;
        }
    };
    // Place human player ships
    function placePlanes() {
                    
                    
                    
        carrierButton.addEventListener("click", function(e) {
            selectedPlane = p1Planes[0];
            console.log(selectedPlane);
        });
        fighterjetButton.addEventListener("click", function(e) {
            selectedPlane = p1Planes[1];
            console.log(selectedPlane);
        });
        stealthfighterButton.addEventListener("click", function(e) {
            selectedPlane = p1Planes[2];
            console.log(selectedPlane);
        });
        airfighterButton.addEventListener("click", function(e) {
            selectedPlane = p1Planes[3];
            console.log(selectedPlane);
        });
        patrolButton.addEventListener("click", function(e) {
            selectedPlane = p1Planes[4];
            console.log(selectedPlane);
        });
        
        
        rotateButton.addEventListener("click", function(e) {
            //Need to hold the ship that you chose and then rotate the ship. 
            rotatePlane(selectedPlane);
        });
         
        // This is for showing where the player is thinking about placing the ship
        playerBoard.addEventListener("mouseover", mouseoverHandle);
        
        
        function mouseoverHandle(event) {
            rowCoordPlayer = event.target.id.substring(1,2);
            colCoordPlayer = event.target.id.substring(2,3);
            var row = parseInt(rowCoordPlayer);
            var col = parseInt(colCoordPlayer);
            var position = [];
            var ids = [];
            console.log(selectedPlane);
            for (var i = 0; i < selectedPlane.length; i++) {
                if (selectedPlane.dir === VERTICAL) {
                    if (row <= 10 - selectedPlane.length) {
                        position[i] = row + i;
                        ids = position.map(function(loc) {
                            return '#p' + loc + col;
                        });
                    }
                } else {
                    if (col <= 10 - selectedPlane.length) {
                        position[i] = col + i;
                        ids = position.map(function(loc) {
                            return '#p' + row + loc;
                        });
                    }
                }
            }
            // console.log(ids.join(", "));
            divs = document.querySelectorAll(ids.join(", "));
            for (let i = 0; i < divs.length; i++) {
                divs[i].classList.add("plane");
            }
        };
        
        
        // playerBoard.removeEventListener("mouseover", mouseoverHandle);
        
        playerBoard.addEventListener("mouseout", mouseoutHandle);

        function mouseoutHandle(event) {
            
            for (let i = 0; i < divs.length; i++) {
                divs[i].classList.remove("plane");
            }
            
        };
        // playerBoard.removeEventListener("mouseout", mouseoutHandle);
        
        playerBoard.addEventListener("click", pBoardHandle); 
        
        
        function pBoardHandle(event) {
            //place the planes
            rowCoordPlayer = event.target.id.substring(1,2);
            colCoordPlayer = event.target.id.substring(2,3);
            var rowID = [];
            var colID = [];
            console.log(selectedPlane);
            selectedPlane.location = dropPlane(selectedPlane, rowCoordPlayer, colCoordPlayer);
            var p1PlaneLocation = selectedPlane.location;
            p1PlaneLocation = p1PlaneLocation.map(function(loc){
                return '#' + loc;
            });
            var locationIDs = document.querySelectorAll(p1PlaneLocation.join(", "));
            console.log(locationIDs);
            for (let i = 0; i < locationIDs.length; i++) {
                locationIDs[i].classList.add("placed");
            }
            
        }
        // playerBoard.removeEventListener("mouseover", mouseoverHandle);
        // playerBoard.removeEventListener("mouseout", mouseoutHandle);
        
    };    

    // Begin placement of AI ships. First function checks whether or not placement is within the bounds of the grid.
    function checkWithinBounds (row, col, plane) { // Source: Modified from Bill Mei
        if (plane.dir === VERTICAL) {
            if (row + plane.length < 9) {
                return true;
            } else {
                return false;
            }
        } else {
            if (col + plane.length < 9) {
                return true;
            } else {
                return false;
            }
        }
    };
    
    // Creates the location array which positions the AI ship
    function create(row, col, plane, direction) { // Source: Modified from Bill Mei
        rowCoord = row;
        colCoord = col;
        ship.dir = direction;
        for (var i = 0; i < plane.length; i++) {
            if (plane.dir === VERTICAL) {
                aiBoard[rowCoord + i][colCoord] = PLANE;
            } else {
                aiBoard[rowCoord][colCoord + i] = PLANE;
            }
        }

    };
    
    // Check placement to make sure planes are not placed on top of each other
    function checkPlacement (row, col, plane) {
        // First, check if the plane is within the grid
        if (checkWithinBounds(row, col, plane)) {
            for (var i = 0; i < plane.length; i++) {
                if (plane.dir === VERTICAL) {
                    if (aiBoard[row + i][col] === PLANE ||
                        aiBoard[row + i][col] === MISS ||
                        aiBoard[row + i][col] === SUNK) {
                            return false;
                        }
                    } else {
                        if (aiBoard[row][col + i] === PLANE ||
                            aiBoard[row][col + i] === MISS ||
                            aiBoard[row][col + i] === SUNK) {
                                return false;
                            }
                        }
            }
            return true;
        } else {
            return false;
        }
    };

    // modified stack overflow code. These were a big challenge. 
    function placeAIPlanesRandomly() { 
        // var coordinates 
        for (var i = 0; i < aiPlanes.length; i++) {
            // Prevents the random placement of already placed planes
            var notPlaced = true; 
            while (notPlaced) {
                var randomRow = Math.floor(5 * Math.random());
                var randomCol = Math.floor(5 * Math.random());
                var randomDirection = Math.round(Math.random());
                
                if (checkPlacement(randomRow, randomCol, aiPlanes[i])) {
                    create(randomRow, randomCol, aiPLanes[i], randomDirection);
                    // plane Coords = this.fleetRoster[i].getAllShipCells();
                    notPlaced = false;
                }
            };
        };
    }; 
    
    
   
    function gameInit() {
        main.classList.remove("hidden");
        main.classList.add("visible");
        footer.classList.remove("hidden");
        footer.classList.add("visible");
        createGameBoards();
     
        placePlanes();
        placeAIPlanesRandomly();
        commenceOperationButton.disabled = false;
        console.log(aiBoard);
    };
            
            
    startButton.addEventListener("click", function(e) {
        gameInit();
        intro.removeChild(startButton);
        intro.removeChild(h2El);
        h3El.classList.add("visible");
        // startButton.classList.add("hidden"); 
        // h2El.classList.add("hidden");
    })        
            
            
            
            
            
            
            // Additional Functions
// 3. Game play 
    function commenceOperation() {
        
        function endGame() {
            gameOver = true;
            computerBoard.removeEventListener("click", cBoardHandle); 
            if (p1HitCount >= 17) {
                h2El2.textContent = "Youve shot all their planes down! Victory is upon Thee!"
                pFleetEl.classList.add("position2");
                cFleetEl.classList.add("position2");
            } else {
                h2El2.textContent = "L7 You LOSE L7 ";
                pFleetEl.classList.add("position2");
                cFleetEl.classList.add("position2");
            }
        };
        
        
        function checkWin() {
            if(p1HitCount >= 17 || aiHitCount >= 17) {
                endGame();
            }
        };
        
        
        function checkSpace(array, e, rowCoord, colCoord) {
            if (array[rowCoord][colCoord] === 0) {
                e.target.classList.add("miss");
                playMissSound();
                array[rowCoord][colCoord] = 1;
            } else if (array[rowCoord][colCoord] === 2) {
                e.target.classList.add("hit");
                playHitSound();
                array[rowCoord][colCoord] = 3;
                p1HitCount++;
                // Check win
                // checkSunk(array);
                
                
            };
        }
        
        function aiGuess() {
            var randomRow = Math.floor(9 * Math.random());
            var randomCol = Math.floor(9 * Math.random());
            var pID = "p" + randomRow + randomCol; 
            console.log(pID);
            if (!aiTargeted.includes(pID)) {
             //check id before adding the square based on whether it's been hit. 
                for (let i = 0; i < p1Planes.length; i++) {
                    if (p1Planes[i].location.includes(pID) && !p1Planes[i].hit.includes(pID)) {   
                        p1Planes[i].hit.push(pID);
                        document.getElementById(pID).classList.remove("placed");
                        document.getElementById(pID).classList.add("hit");
                        playHitSound();
                        aiTargeted.push(pID);
                        aiHitCount++;
                    } else if (!p1Planes[i].location.includes(pID)) {
                        document.getElementById(pID).classList.add("miss");
                        playMissSound();
                        aiTargeted.push(pID);
                    }
                }
            }
        };
        
        cBoardHandle = computerBoard.addEventListener("click", function(e) {
            // target a square
            // change the color 
            // hit or miss
            if(!(p1Targeted[e.target.id]) && !gameOver) {
                p1Targeted.push(e.target.id);
                rowCoord = e.target.id.substring(1,2);
                colCoord = e.target.id.substring(2,3);
                // Check space
                checkSpace(aiBoard, e, rowCoord, colCoord);
            }
            setTimeout(function() {
                aiGuess() 
            }, 1000);
            checkWin();
            
            
            
        });
    };


    commenceOperationButton.addEventListener("click", function(e) {
        commenceOperation();
        commenceOperationsButton.disabled = true; 
    });

            
// 4. Reset           
            
            
    function resetGame() {
        gameOver = false;
        for (let i = 0; i < p1Planes.length; i++) {
            document.getElementById(p1Planes[i].name).disabled = false; 
            document.getElementById(p1Planes[i].placed = false);
            document.getElementById(p1Planes[i].name).classList.remove("placed");
            document.getElementById(p1Planes[i].location = []);
            document.getElementById(p1Planes[i].hit = []);
        };
        p1HitCount = 0;
        aiHitCount = 0;
        p1Targeted = [];
        aiTargeted = [];     
        aiBoard = 
        [[0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0]];
        rowCoord = 0; 
        colCoord = 0;
        selectedPlane = null; 
        rowCoordPlayer = "";
        colCoordPlayer = "";
        divs = [];
        while (playerBoard.firstChild) {
            playerBoard.removeChild(playerBoard.firstChild);
        };
        while (computerBoard.firstChild) {
            computerBoard.removeChild(computerBoard.firstChild);
        };
        h2El2.textContent = "";
        gameInit();
        playBackgroundSound();

        
    };

    resetButton.addEventListener("click", function(e) {
        resetGame();
    });
}); 