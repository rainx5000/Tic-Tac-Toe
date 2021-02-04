
   const player = (marker) => {
        let isWinner = false;
        const getMarker = () => marker
        const makeWinner = () => gameBoard.current().isWinner = true;
        const resetWinner = () => gameBoard.current().isWinner = false;

        let rowCount = [0,0,0]; //any num to hit to 3 declares a winner;
        let colCount = [0,0,0]; // any num to hit 3 declares a winner;
        let diagCount = [0,0,0]; //all three nums should be 1 declares winner
        let reverseDiagCount = [0,0,0] //all three nums should be 1 declares winner

        const resetStats = () => {
            rowCount = [0,0,0]; 
            colCount = [0,0,0]; 
            diagCount = [0,0,0]; 
            reverseDiagCount = [0,0,0];
            isWinner = false;
        }

        const placeMarker = (cords) => {
            gameBoard.board[cords[0]][cords[1]] = gameBoard.current().getMarker();
            markerCount(cords[0], cords[1]);
           }

        const markerCount = (row, col) => {
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
            console.log (`rowCount: ${rowCount} and colCount: ${colCount} diaCount: ${diagCount} revdiaG: ${reverseDiagCount}`)
            // checkWinner();
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

            tie && gameBoard.makeTie()
            // console.log(tie)
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
    //    const lastPlayer = () => players[1];
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
            console.log(player)
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
    const menuBtn = document.querySelector('.menu-submit-btn');
    const menuForm = document.querySelector('.menu');
    const player1Input = document.querySelector('#player1-input');
    const player2Input = document.querySelector('#player2-input');
    const cells = document.querySelectorAll('.cell');
    const turnDisplay = document.querySelector('.turn-display');
    const markers = document.querySelectorAll('.marker');
    const restartGame = document.querySelector('.game-over');


    //player names from menu to display
    menuForm.addEventListener('submit', (e) => {
        e.preventDefault();

        document.querySelector('.player1-display').textContent = '- ' + player1Input.value;
        document.querySelector('.player2-display').textContent = '- ' + player2Input.value;
        
        menuForm.classList.add('display-off')
        document.querySelector('.game-container').classList.remove('display-off', 'stopClick')
        

    })

    cells.forEach(cell => {
       cell.addEventListener('click', (e) => {
           if (e.target.textContent.length === 0) { //lets you only click once on a spot
            e.target.textContent = gameBoard.current().getMarker();
            gameBoard.current().placeMarker(e.target.dataset.cell.split('-')); //cords of current cell moving into gameBoard
            gameBoard.current().checkWinner();
            gameBoard.getWinner() 
            console.log(gameBoard.getWinner())
            gameBoard.current().isWinner == true && gameOver();
            gameBoard.getTie() == true && gameOver();
            gameBoard.switchTurn(); 
           } 
        }) 
    })


    const gameOver = () => {
        const markersArr = Array.from(markers);
        const winnerDisplay = markersArr.filter(player => player.textContent == gameBoard.current().getMarker())
        let winnerName = winnerDisplay[0].nextElementSibling.textContent;
        gameBoard.current().isWinner && (winnerDisplay[0].nextElementSibling.textContent = winnerName + ' wins!')

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
    })
        
    document.querySelector('.new-game').addEventListener('click', (e) => {
        player1Input.value = '';
        player2Input.value = '';
        cells.forEach(cell => {cell.textContent = ''})
        gameBoard.resetBoard()
        restartGame.classList.add('display-off');
        menuForm.classList.remove('display-off');
        cells.forEach(cell => cell.classList.remove('stopClick')) //stops the user from clicking any more
    })
    const DOMReset = () => {
        cells.forEach(cell => {cell.textContent = ''})
        document.querySelector('.player1-display').textContent = '- ' + player1Input.value;
        document.querySelector('.player2-display').textContent = '- ' + player2Input.value;
    }



    //setting unique values of each cell based on position
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
   })()



//when its a tie - stop the game
//ask if they want to play again or go back to menu

//when all the cells are filled with a marker - its a tie 

//make it show visually who's turn it is

//make names required for form