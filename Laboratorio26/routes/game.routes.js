const express = require('express');
const router = express.Router();

let gameState = {
  board: [['', '', ''], ['', '', ''], ['', '', '']],
  currentPlayer: 'X',
  gameStarted: false,
};

// Check for a win or a draw
function checkGameState(board) {
  // Check rows, columns, and diagonals
  const lines = [
    // Rows
    [board[0][0], board[0][1], board[0][2]],
    [board[1][0], board[1][1], board[1][2]],
    [board[2][0], board[2][1], board[2][2]],
    // Columns
    [board[0][0], board[1][0], board[2][0]],
    [board[0][1], board[1][1], board[2][1]],
    [board[0][2], board[1][2], board[2][2]],
    // Diagonals
    [board[0][0], board[1][1], board[2][2]],
    [board[0][2], board[1][1], board[2][0]],
  ];

  for (let line of lines) {
    if (line[0] && line[0] === line[1] && line[0] === line[2]) {
      return line[0]; // Return the winner ('X' or 'O')
    }
  }

  // Check for a draw
  if (board.flat().every(cell => cell)) {
    return 'Draw';
  }

  return null; // No winner yet
}

// Roll the dice to decide who starts the game
router.get('/dice', (req, res) => {
  if (!gameState.gameStarted) {
    gameState.currentPlayer = Math.random() < 0.5 ? 'X' : 'O';
    gameState.gameStarted = true;
    res.status(200).json({ startingPlayer: gameState.currentPlayer });
  } else {
    res.status(400).json({ error: 'Game already started' });
  }
});

// Create a new game
router.get('/create', (req, res) => {
  gameState = {
    board: [['', '', ''], ['', '', ''], ['', '', '']],
    currentPlayer: 'X',
    gameStarted: false,
  };
  res.status(200).json(gameState);
});

// Get the current status of the game
router.get('/status', (req, res) => {
  res.status(200).json(gameState);
});

// Make a move
router.post('/turn', (req, res) => {
  const { row, col } = req.body;
  if (!gameState.gameStarted) {
    return res.status(400).json({ error: 'Game has not started yet' });
  }
  if (gameState.board[row][col] === '') {
    gameState.board[row][col] = gameState.currentPlayer;
    const winner = checkGameState(gameState.board);
    if (winner) {
      gameState.gameStarted = false;
      res.status(200).json({ board: gameState.board, winner });
    } else {
      gameState.currentPlayer = gameState.currentPlayer === 'X' ? 'O' : 'X';
      res.status(200).json({ board: gameState.board, currentPlayer: gameState.currentPlayer });
    }
  } else {
    res.status(400).json({ error: 'Cell already occupied' });
  }
});

module.exports = router;
