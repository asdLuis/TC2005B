document.addEventListener('DOMContentLoaded', () => {
  const cells = document.querySelectorAll('.cell');
  const message = document.getElementById('message');
  const resetButton = document.getElementById('reset');

  cells.forEach(cell => {
    cell.addEventListener('click', () => {
      const row = cell.dataset.row;
      const col = cell.dataset.col;
      fetch('/api/game/turn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ row, col })
      })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          updateBoard(data.board);
          if (data.winner) {
            message.textContent = data.winner === 'Draw' ? 'It\'s a Draw!' : `${data.winner} Wins!`;
          } else {
            message.textContent = `Current Player: ${data.currentPlayer}`;
          }
        }
      });
    });
  });

  resetButton.addEventListener('click', () => {
    fetch('/api/game/create')
      .then(response => response.json())
      .then(data => {
        updateBoard(data.board);
        message.textContent = `Current Player: ${data.currentPlayer}`;
      });
  });

  window.rollDice = function() {
    fetch('/api/game/dice')
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          message.textContent = `Starting Player: ${data.startingPlayer}`;
        }
      });
  };

  function updateBoard(board) {
    cells.forEach(cell => {
      const row = cell.dataset.row;
      const col = cell.dataset.col;
      cell.textContent = board[row][col];
    });
  }
});
