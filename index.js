$(document).ready(function() {
  let gameOver = false;
  let gameButtons = document.querySelectorAll("button");
  let gameMatrix = [[]];

  let playerOne = prompt("Enter Player One Name: (blue)", "");
  let playerTwo = prompt("Enter Player two Name: (red)", "");
  let k = 0,
    playerColor = "blue",
    player = playerOne;
  const reportWin = (row, column) => {
    gameOver = true;
    document.getElementById("game-over").innerHTML =
      "GAME OVER ! " + player + " won at " + (row + 1) + " " + (column + 1);
    $("button").prop("disabled", true);
  };
  const switchPlayer = () => {
    if (gameOver) {
      document.getElementById("turn-info").textContent =
        "Finished ! Refresh to play again !";
    } else {
      playerColor = player === playerTwo ? "blue" : "red";
      player = player === playerTwo ? playerOne : playerTwo;
      document.getElementById("turn-info").innerHTML =
        player + " : Your Turn pick any  " + playerColor + " chip .";
    }
  };
  const createMatrix = () => {
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        gameMatrix[i][j] = gameButtons[k];

        k++;
      }
      gameMatrix[i + 1] = [];
    }
  };
  createMatrix();
  //CHECK LEFT SIDE
  const checkLeft = (index, k, color, c) => {
    for (let i = 0; i < 3; i++) {
      if (gameMatrix[index][k]) {
        if (gameMatrix[index][k].value === color) {
          c += 1;
          k++;
        } else {
          c = 0;
          k++;
        }
      } else return 0;
    }
    return c;
  };
  //CHECK RIGHT SIDE
  const checkRight = (index, k, color, c) => {
    for (let i = 0; i < 3; i++) {
      if (gameMatrix[index][k]) {
        if (gameMatrix[index][k].value === color) {
          c += 1;
          k--;
        } else {
          c = 0;
          k++;
        }
      } else return 0;
    }
    return c;
  };

  //CHECK BOTTOM SIDE
  const checkBottom = (index, k, color, c) => {
    for (let i = 0; i < 3; i++) {
      if (gameMatrix[index][k]) {
        if (gameMatrix[index][k].value === color) {
          c += 1;
          index++;
        } else {
          c = 0;
          index++;
        }
      } else return 0;
    }
    return c;
  };
  //CHECK Diagonal SIDE
  const checkDiagonalRight = (index, k, color, c) => {
    for (let i = 0; i < 3; i++) {
      if (gameMatrix[index][k]) {
        if (gameMatrix[index][k].value === color) {
          c += 1;
          index++;
          k--;
        } else {
          c = 0;

          index--;
        }
      } else return 0;
    }
    return c;
  };
  const checkDiagonalLeft = (index, k, color, c) => {
    for (let i = 0; i < 3; i++) {
      if (gameMatrix[index][k]) {
        if (gameMatrix[index][k].value === color) {
          c += 1;
          index++;
          k++;
        } else {
          c = 0;

          index--;
        }
      } else return 0;
    }
    return c;
  };
  //CHECK Middle SIDE
  const checkMiddle = (index, k, color, c) => {
    if (
      gameMatrix[index][k] &&
      gameMatrix[index][k - 1] &&
      gameMatrix[index][k + 1]
    ) {
      c =
        gameMatrix[index][k - 1].value === color
          ? gameMatrix[index][k + 1].value === color
            ? 3
            : null
          : null;
    }

    return c;
  };

  const checkIt = (count, index, k) => {
    if (count === 3) {
      reportWin(index, k);
    }
  };
  const checkMatrix = (index, k, color) => {
    let count = 0;

    count = checkBottom(index, k, color, (count = 0));
    checkIt(count, index, k);
    count = checkLeft(index, k, color, (count = 0));
    checkIt(count, index, k);
    count = checkRight(index, k, color, (count = 0));
    checkIt(count, index, k);
    count = checkMiddle(index, k, color, (count = 0));
    checkIt(count, index, k);
    count = checkDiagonalRight(index, k, color, (count = 0));
    checkIt(count, index, k);
    count = checkDiagonalLeft(index, k, color, (count = 0));
    checkIt(count, index, k);
  };
  const drawMatrix = () => {
    $("button").click(function() {
      let k = gameMatrix[0].indexOf(this);
      for (let i = 5; i >= 0; i--) {
        if (gameMatrix[i][k].value) {
          continue;
        } else {
          gameMatrix[i][k].value = playerColor;
          gameMatrix[i][k].style.background = playerColor;
          checkMatrix(i, k, playerColor);
          switchPlayer();

          break;
        }
      }
    });
  };

  drawMatrix();
});
