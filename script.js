let playable = true;
const players = [0, 1]; // ISME BHI VHI DIMAAG LAGAYA HU!!!
const result = document.getElementById("result");
const boxes = document.querySelectorAll(".box");
let currentPlayer = players[parseInt(Math.random() * 2)];
const winPossibilities = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

result.addEventListener("click", (e) => {
  if (e.target.innerHTML !== "Lets Play!") {
    boxes.forEach((box) => {
      box.innerHTML = "";
      box.style.color = "black";
    });
    currentPlayer = players[parseInt(Math.random() * 2)];
    turnOf(currentPlayer);
    playable = true;
  }
});

function turnOf(player) {
  result.innerHTML = `${player === 0 ? "O" : "X"}'s Turn`;
}

function checkWinFor(player) {
  for (let i = 0; i < winPossibilities.length; i++) {
    if (
      boxes[winPossibilities[i][0]].innerText === player &&
      boxes[winPossibilities[i][1]].innerText === player &&
      boxes[winPossibilities[i][2]].innerText === player
    ) {
      /// YE BHI SIRF SEXY LOG SOCH SAKTE WHICH IS I AM OFCOURSE ;)
      boxes[winPossibilities[i][0]].style.color = "rgb(255, 60, 60)";
      boxes[winPossibilities[i][1]].style.color = "rgb(255, 60, 60)";
      boxes[winPossibilities[i][2]].style.color = "rgb(255, 60, 60)";
      endGame(player);
      return true;
    }
  }
  return false;
}

function checkDraw() {
  for (let i = 0; i < 9; i++) {
    if (boxes[i].innerText === "") {
      return;
    }
  }
  endGame("tie");
}

function endGame(winner) {
  document.getElementById(winner).innerHTML =
    parseInt(document.getElementById(winner).innerHTML) + 1;
  if (winner === "X") {
    result.innerHTML = "X is the winner!";
  } else if (winner === "O") {
    result.innerHTML = "O is the winner!";
  } else {
    result.innerHTML = "Its a Tie!";
  }
  setTimeout(() => {
    result.innerHTML = "Restart?";
  }, 2000);
  playable = false;
}

boxes.forEach((box) => {
  box.addEventListener("click", (e) => {
    document.getElementById("press").style.visibility = "visible";
    if (playable && e.target.innerHTML === "") {
      e.target.innerHTML = currentPlayer === 0 ? "O" : "X";
      if (!checkWinFor(e.target.innerText)) checkDraw();
      if (playable === true) {
        currentPlayer = players[1 - currentPlayer]; // KYA DIMAAG HAI BEHEEEENCHOOODDDDDD!!!  0 se 1 se 0 karne ke liye Striver bhaiya se seekha tha most probably.
        turnOf(currentPlayer);
      }
    }
  });
});
