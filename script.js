

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






    