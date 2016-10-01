"use strict";

console.log('worker started');

onmessage = function(e) {
  if (e.data.startFib !== undefined) {
    console.log('start time: ', Date());
    postMessage({result: nPaths(7)});
  }
}

onerror = function(e) {
  console.log('Worker Error: ', e.message);
}



// ********** Fibonacci Algorithm **********

function fibonacci(num) {
  if (num <= 1) return 1;
  
  return fibonacci(num - 1) + fibonacci(num - 2);
}


// ********** nPaths Algorithm **********

function makeBoard(n) {
  var board = [];
  for (var i = 0; i < n; i++) {
    board.push([]);
    for (var j = 0; j < n; j++) {
      board[i].push(false);
    }
  }
  board.togglePiece = function(i, j) {
    this[i][j] = !this[i][j];
  }
  board.hasBeenVisited = function(i, j) {
    return !!this[i][j];
  }
  return board;
}

function nPaths(size) {
  let board = makeBoard(size);

  return checkBoard(0, 0, board);

  function checkBoard(i, j, board) {
    // Check if the current position is the other corner of the board
    // If yes, return 1 (represents a successful board traversal)
    if (i === size - 1 && j === size - 1) {
      return 1;
    }

    // Create a copy of the board state, and modify the state
    let boardCopy = [];

    board.forEach(row => { 
      boardCopy.push(row.slice());
    });

    boardCopy[i][j] = true;

    // Create a counter for the number of successes from child paths
    let successfulPaths = 0;

    if (boardCopy[i][j + 1] === false) successfulPaths += checkBoard(i, j + 1, boardCopy);
    if (boardCopy[i][j - 1] === false) successfulPaths += checkBoard(i, j - 1, boardCopy);
    if (boardCopy[i + 1] && typeof boardCopy[i + 1] !== ' function') {
      if (boardCopy[i + 1][j] === false) successfulPaths += checkBoard(i + 1, j, boardCopy);
    }
    if (boardCopy[i - 1] && typeof boardCopy[i - 1] !== ' function') {
      if (boardCopy[i - 1][j] === false) successfulPaths += checkBoard(i - 1, j, boardCopy);
    }

  
    return successfulPaths;
  }
}
