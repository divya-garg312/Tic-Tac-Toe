let p1 = document.getElementById("player1");
let p2 = document.getElementById("player2");
let playerTurn = document.getElementById("turn");
let reset = document.getElementById("reset");
let result = document.getElementById("result");
let start = document.getElementById("start");
let boxes = document.querySelectorAll(".box");
let turn = 0;
let handleclick;

reset.addEventListener('click', () => {
   restart();
   if (start.textContent == 'Restart') {
      start.textContent = 'Start';
   }
   p1.value = '';
   p2.value = '';
})

function gameBoard(player1, player2) {
   let flag = 0;
   let gameOver = false;
   let currentPlayer = flag % 2 ? player2 : player1;
   let arr = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];
   updatePlayername(currentPlayer.playerName);

   handleclick = (event) => {
      turn++;
      if (turn == 9 && gameOver == false) result.textContent = `It's A Draw`;
      let box=event.target;
      let index=Array.from(boxes).indexOf(box);
      if (!gameOver) {
         let row = Math.floor(index / 3);
         let column = index % 3;
         if (validMove(row, column)) {
            putMarker(row, column, currentPlayer.marker);
            if (winnerFound()) {
               if (currentPlayer.marker == 'X')
                  result.innerHTML = `${currentPlayer.playerName} is Winner🎉<br><span>X</span>-treme Victory`;
               else
                  result.innerHTML = `${currentPlayer.playerName} is Winner🎉<br><span>O</span>-mazing Champion`;
               gameOver = true;
            }
            box.textContent = currentPlayer.marker;
            box.style.fontSize = "5vw";
            box.style.textAlign = "center";
            flag = flag == 0 ? 1 : 0;
            currentPlayer = flag % 2 ? player2 : player1;
            updatePlayername(currentPlayer.playerName);
         }
      }
   }

   boxes.forEach(box => {
      box.addEventListener('click', handleclick);
   });

   const putMarker = (row, column, marker) => {
      arr[row][column] = marker;
   }

   const validMove = (row, column) => {
      if (arr[row][column] == '-') return true;
      else return false;
   }

   const winnerFound = () => {
      for (let i = 0; i < 3; i++) {
         if (checkWinner(arr[0][i], arr[1][i], arr[2][i])) {
            [boxes[i + 0], boxes[i + 3], boxes[i + 6]].forEach(box => box.style.backgroundColor = "red");
            return true;
         }
         if (checkWinner(arr[i][0], arr[i][1], arr[i][2])) {
            [boxes[i*3 + 0], boxes[i*3 + 1], boxes[i*3 + 2]].forEach(box => box.style.backgroundColor = "red");
            return true;
         }
      }
      if (checkWinner(arr[0][0], arr[1][1], arr[2][2])) {
         [boxes[0], boxes[4], boxes[8]].forEach(box => box.style.backgroundColor = "red");
         return true;
      }
      if (checkWinner(arr[0][2], arr[1][1], arr[2][0])) {
         [boxes[2], boxes[4], boxes[6]].forEach(box => box.style.backgroundColor = "red");
         return true;
      }
      return false;
   }

   const checkWinner = (a, b, c) => {
      if (a == b && b == c && a != '-' && b != '-' && c != '-') return true;
      else return false;
   }
}

const updatePlayername = (playerName) => playerTurn.textContent = `${playerName}'s turn`;

const playerInfo = (playerName, marker) => {
   return { playerName, marker };
};

start.addEventListener('click', () => {
   if (start.textContent == "Start")  start.textContent = "Restart";
   restart();
   if (p1.value != '' && p2.value != '') {
      let player1 = playerInfo(p1.value, 'X');
      let player2 = playerInfo(p2.value, 'O');
      gameBoard(player1, player2);
   }
   else alert("Enter Player's Name");
});

const restart = () => {
   boxes.forEach(box => {
      box.textContent = '';
      box.removeAttribute("style");
      box.removeEventListener('click',handleclick);
   });
   turn = 0;
   playerTurn.textContent = '';
   result.textContent = '';
}













