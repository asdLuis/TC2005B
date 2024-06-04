const express = require('express');
const router = express.Router();

const players = {
  1: { name: 'Player 1', symbol: 'X' },
  2: { name: 'Player 2', symbol: 'O' }
};

router.get('/:playerNumber', (req, res) => {
  const playerNumber = req.params.playerNumber;
  const player = players[playerNumber];
  if (player) {
    res.status(200).json(player);
  } else {
    res.status(404).json({ error: 'Player not found' });
  }
});

module.exports = router;
