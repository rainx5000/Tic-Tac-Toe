
   const player = (marker) => {
        let isWinner = false;
        const getMarker = () => marker
        const makeWinner = () => gameBoard.current().isWinner = true;
        const resetWinner = () => gameBoard.current().isWinner = false;

        let rowCount = [0,0,0]; //any num to hit to 3 declares a winner;
        let colCount = [0,0,0]; // any num to hit 3 declares a winner;
        let diagCount = [0,0,0]; //all three nums should be 1 declares winner
        let reverseDiagCount = [0,0,0] //all three nums should be 1 declares winner

        const resetStats = () => { //reset counters
            rowCount = [0,0,0]; 
            colCount = [0,0,0]; 
            diagCount = [0,0,0]; 
            reverseDiagCount = [0,0,0];
            isWinner = false;
        }

        const placeMarker = (cords) => { //puts the mark on the board array
            gameBoard.board[cords[0]][cords[1]] = gameBoard.current().getMarker();
            markerCount(cords[0], cords[1]);
           }

        const markerCount = (row, col) => { //tracks how many marks for each player are within a col/row/dia/revdiag
            colCount[col]+= 1;
            rowCount[row]+= 1;
            
            if (col == 1 && row == 1) {
                diagCount[col] = 1;
                reverseDiagCount[col] = 1;
            } else if (col == 0 && row == 0) {
                diagCount[col] = 1;
            } else if (col == 2 && row == 2) {
                diagCount[col] = 1;
            } else if (col == 2 && row == 0) {
                reverseDiagCount[row] = 1;
            } else if (col == 0 && row == 2) {
                reverseDiagCount[row] = 1;
            } 
        }

        const checkWinner = () => {    //will check scan the counter arrays
            rowCount.forEach(row => {  //will check for each row having a value of 3 - if so, the player wins
                row == '3' && makeWinner();
            })
            colCount.forEach(col => {
                col == '3' && makeWinner(); //checks for each col, having a value of 3 - if so, the player wins
            })
            _checkEqual(diagCount) && makeWinner(); //if all the values of dia is 1 - player wins -- each value basically represents each block in the diagnol 
            _checkEqual(reverseDiagCount) && makeWinner(); //same as above just opposite

            let tie = true;
            const board = gameBoard.board
            for (let row in board) {
                // tie = board[row].every(el => el.length > 0) ? true : false;     //problem is it needs to make sure ALL OF THE ARE TRUE THEN MAKE TRUE           
                if (board[row].every(el => el.length > 0)) {
                    tie = true;
                } else {
                    tie = false;
                    break;
                }
            }

            tie && gameBoard.makeTie() //checks if board is tie, if it is, gameBoard tie variable will become true
        }

       const _checkEqual = (arr) => arr.every(num => num === 1) //used to check if all the elements are the same value of an array used in checkWinner()
       
       
       return {
           getMarker,
           isWinner,
           makeWinner,
           markerCount,
           placeMarker,
           rowCount,
           colCount,
           diagCount,
           reverseDiagCount,
           resetStats,
           checkWinner,
           resetWinner,
        }
   } 

   const gameBoard = (function() {
       const players = [player('X'), player('O')];

       const current = () => players[0];
       const switchTurn = () => players.reverse();

       const getWinner = () => gameBoard.current().isWinner;
       let isTie = false;
       const makeTie = () => isTie = true;
       const getTie = () => isTie;
       const resetTie = () => isTie = false;

       let board = {
           0: ['','',''],
           1: ['','',''],
           2: ['','','']
       }

       const resetBoard = () => {
        for (let row in board) {
         board[row] = ['','','']
        }   

        players.forEach(player => {
            player.resetStats();
        }) 
        
    }

       return {
           players,
           board,
           current,
           switchTurn,
           getWinner,
           resetBoard,
           makeTie,
           isTie,
           getTie,
           resetTie
       }

   })()

   const displayController = (function () {
    const menuForm = document.querySelector('.menu');
    const player1Input = document.querySelector('#player1-input');
    const player2Input = document.querySelector('#player2-input');
    const cells = document.querySelectorAll('.cell');
    const markers = document.querySelectorAll('.marker');
    const restartGame = document.querySelector('.game-over');
    const resultHeading = document.querySelector('.result');
    const player1Display = document.querySelector('.player1-display');
    const player2Display = document.querySelector('.player2-display');
    const gameContainer = document.querySelector('.game-container');


    //player names from menu to display
    menuForm.addEventListener('submit', (e) => {
        e.preventDefault();

        player1Display.textContent = player1Input.value;
        player1Display.classList.add('bold');
        player2Display.textContent = player2Input.value;
        
        menuForm.classList.add('display-off')
        gameContainer.classList.remove('display-off', 'stopClick')
        

    })

    cells.forEach(cell => {
       cell.addEventListener('click', (e) => {
           if (e.target.textContent.length === 0) { //lets you only click once on a spot
            e.target.textContent = gameBoard.current().getMarker();

            gameBoard.current().placeMarker(e.target.dataset.cell.split('-')); //cords of current cell moving into gameBoard
            gameBoard.current().checkWinner();
            // gameBoard.getWinner() 
            checkWinner();
           } 
        }) 
    })


    const gameOver = () => {
        const markersArr = Array.from(markers);
        const winnerDisplay = markersArr.filter(player => player.textContent == gameBoard.current().getMarker())
        let winnerName = winnerDisplay[0].nextElementSibling;

        if (gameBoard.current().isWinner) {
            resultHeading.textContent = `${winnerName.textContent} has won -`
            winnerDisplay[0].nextElementSibling.textContent = winnerName.textContent + ' wins!'
        } else if (gameBoard.getTie()) {
            resultHeading.textContent = 'Tie Game'
        }

        gameBoard.current().resetWinner();
        gameBoard.resetTie();

        restartGame.classList.remove('display-off');
        cells.forEach(cell => cell.classList.add('stopClick')) //stops the user from clicking any more
    }

    document.querySelector('.replay').addEventListener('click', (e) => {
        DOMReset()
        gameBoard.resetBoard()
        restartGame.classList.add('display-off');
        cells.forEach(cell => cell.classList.remove('stopClick')) //stops the user from clicking any more

        player1Display.classList.toggle('bold');
        player2Display.classList.toggle('bold');
        gameBoard.switchTurn()
    })
        
    document.querySelector('.new-game').addEventListener('click', (e) => {
        player1Input.value = '';
        player2Input.value = '';
        resultHeading.textContent = ''
        cells.forEach(cell => {cell.textContent = ''})
        gameBoard.resetBoard()
        restartGame.classList.add('display-off');
        menuForm.classList.remove('display-off');
        cells.forEach(cell => cell.classList.remove('stopClick')) //stops the user from clicking any more
        player1Display.classList.remove('bold');
        player2Display.classList.remove('bold');
        gameContainer.classList.add('display-off')
        gameBoard.current().getMarker() != 'X' && switchTurn()
    })
    const DOMReset = () => {
        resultHeading.textContent = ''
        cells.forEach(cell => {cell.textContent = ''})
        player1Display.textContent = player1Input.value;
        player2Display.textContent = player2Input.value;
    }



    //setting cords of each cell
    let counterRow = 0;
    let counterCell = 0;
    cells.forEach((cell, index) => {
        cell.dataset.cell = `${counterRow}-${counterCell}`;
        counterCell++

        if (index == '2') {
            counterCell = 0;
            counterRow++
        } else if (index == '5') {
            counterCell = 0;
            counterRow++
        }
    })

    function checkWinner () {
        if (gameBoard.current().isWinner || gameBoard.getTie()) {
            return gameOver();
        } else {
            player1Display.classList.toggle('bold');
            player2Display.classList.toggle('bold');
            gameBoard.switchTurn();
        }
    }
   })()







