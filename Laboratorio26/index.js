const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config(); // Load environment variables

const gameRoutes = require('./routes/game.routes');
const playerRoutes = require('./routes/player.routes');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/api/game', gameRoutes);
app.use('/api/player', playerRoutes);

app.get('/', (req, res) => {
  res.render('index');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
