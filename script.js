

//create a DOM module where it will return every value of every btn on menu
//create a controller that handles those values into the game
//create a gameboard 



// document.body.addEventListener('mousedown', (e) => {
//     console.log(e.target.dataset.cell)
// })

// const DOM = (() => {
//     const menuBtn = document.querySelector('.menu-submit-btn');
//     const menuForm = document.querySelector('.menu');
//     const Player1Input = document.querySelector('#player1-input');
//     const Player2AIOption = document.querySelector('.player2-input-ai');
//     const Player2HumanOption = document.querySelector('.player2-input-human');
//     const menuPlayer2Input = document.querySelector('.player2-name');
//     const cells = document.querySelectorAll('.cell');
//     const turnDisplay = document.querySelector('.turn-display');

//     cells.forEach((cell, index) => {
//         cell.dataset.cell = (index+1).toString();
//     })

//     // let player1Name = '';
//     // Player1Input.addEventListener('input', player)

  

//     // const player1 = function() {
//     //     player1Name = Player1Input.value
//     // }

//     // const player1 = (Player1Input) => {
//     //     Player1Input.addEventListener('input', player)
//     // }



    


//     return {
//         menuBtn,
//         menuForm,
//         Player1Input,
//         Player2AIOption,
//         Player2HumanOption,
//         menuPlayer2Input,
//         cells,
//         turnDisplay,
//         players: [Player1Input, menuPlayer2Input],
//         // player1Name,
//         // player1,
//         // // player1: function() {
//         // //     return 'hello'
//         // // }
//     }
// })();




// const menuController = (() => {
//     const player1Input = DOM.Player1Input;
//     const player2Input = DOM.menuPlayer2Input;
//     const players = DOM.players;
//     const AI = 'AI';

//     let player1Name;
//     let player2Name;


        
//     //event listeners update the names based on the user input
//     player1Input.addEventListener('input', (e) => {
//         player1Name = player1Input.value;
//     })
//     player2Input.addEventListener('input', (e) => {
//         player2Name = player2Input.value;
//     })
   


//     DOM.menuForm.addEventListener('click', (e) => {
//         if (e.target.classList.contains('player2-input-ai')) {
//             DOM.menuPlayer2Input.classList.add('display-off')
            
//         } else if (e.target.classList.contains('player2-input-human')) {
//             DOM.menuPlayer2Input.classList.remove('display-off')
//         }
//     })

//     DOM.menuForm.addEventListener('submit', (e) => {
//         e.preventDefault();
//         DOM.menuForm.classList.add('display-off');
//     })

//     const playerFactory = (name) => {
//         name = name
//         marker = name == player1Name ? 'x' : 'o'; 
//         return {name, marker}
//     }
    

//     return {
//         player1: function(){
//             return playerFactory(player1Name)
//         },
//         player2: function(){
//             if (DOM.Player2AIOption.checked) {
//                 return playerFactory(AI)
//             } else {
//                 return playerFactory(player2Name)
//             }
//         },
//     }
// })()






// const gameBoard = (() => {
// //    const player1 = DOM.player1();
// //    const player2 = DOM.player2();

//     const winConditions = [
//         [1,2,3],
//         [4,5,6],
//         [7,8,9],
//         [1,4,7],
//         [2,5,8],
//         [3,6,9],
//         [1,3,9],
//         [3,6,7]
//     ]
//     let current = 'x';
    

//     return {
//         winConditions,
//         current


//     }
// })()

// const gameController = (() => {
    
// })()
















    // menu.addEventListener('submit', (e) => {
    //         e.preventDefault();
    //         player1 = playerFactory(menuPlayer1.value) //player always going to factory function
    //         if (Player2AI.checked) {
    //             console.log('ai')//ai to ai object
    //         } else {
    //             player2 = playerFactory(menuPlayer2Input.value) //player to factory function

    //         }
    //     })



//when move is made, reverse the array of players which would change the current player

//get our cell that we marked and put it on the board

//when we click on the selected cell, we can grab the data cell and shove it into a function as an argument to use
//to store into board


   const player = (marker) => {
        const getMarker = () => marker
        let isWinner = false;

        const makeWinner = () => gameBoard.current().isWinner = true;

        const rowCount = [0,0,0]; //any num to hit to 3 declares a winner;
        const colCount = [0,0,0]; // any num to hit 3 declares a winner;
        const diagCount = [0,0,0]; //all three nums should be 1 declares winner
        const reverseDiagCount = [0,0,0] //all three nums should be 1 declares winner

        const markerCount = (row, col) => {
            colCount[col]+= 1;
            rowCount[row]+= 1;
            console.log (`rowCount: ${rowCount} and colCount: ${colCount}`)
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
            checkWinner();
            //function that would check for winner
        }

        const checkWinner = () => {
            
            rowCount.forEach(row => {
                row == '3' && makeWinner();
            })
            colCount.forEach(col => {
                col == '3' && makeWinner();
            })
            _checkEqual(diagCount) && makeWinner();
            _checkEqual(reverseDiagCount) && makeWinner();
            console.log(isWinner)
        }

       const placeMarker = (cords) => {
        gameBoard.board[cords[0]][cords[1]] = gameBoard.current().getMarker();
        markerCount(cords[0], cords[1]);
       }

       const _checkEqual = (arr) => arr.every(num => num === 1) 




       return {
           getMarker,
           isWinner,
           makeWinner,
           markerCount,
           placeMarker,
           rowCount,
           colCount,
           diagCount,
           reverseDiagCount
        }
   } 

   const gameBoard = (function() {
       const players = [player('X'), player('O')];

       const current = () => players[0];

       const switchTurn = () => players.reverse();
       const getWinner = () => gameBoard.current().isWinner;

       

    

       const board = {
           0: ['','',''],
           1: ['','',''],
           2: ['','','']
       }

       

       return {
           players,
           board,
           current,
           switchTurn,
           getWinner
       }

   })()

   const displayController = (function () {
    const menuBtn = document.querySelector('.menu-submit-btn');
    const menuForm = document.querySelector('.menu');
    const player1Input = document.querySelector('#player1-input');
    const player2Input = document.querySelector('#player2-input');
    const cells = document.querySelectorAll('.cell');
    const turnDisplay = document.querySelector('.turn-display');
    const markers = document.querySelectorAll('.marker')


    //player names from menu to display
    menuForm.addEventListener('submit', (e) => {
        e.preventDefault();

        document.querySelector('.player1-display').textContent = player1Input.value + ' ';
        document.querySelector('.player2-display').textContent = player2Input.value + ' ';
        
        menuForm.classList.add('display-off')
    })

    cells.forEach(cell => {
       cell.addEventListener('click', (e) => {
           if (e.target.textContent.length === 0) {
            e.target.textContent = gameBoard.current().getMarker();
           } 
           gameBoard.current().placeMarker(e.target.dataset.cell.split('-')); //cords of current cell moving into gameBoard
           gameBoard.getWinner() && console.log(`GAMEOVER ${gameBoard.current().getMarker()} won`)
           gameBoard.switchTurn();
        
        }) 
    })

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

