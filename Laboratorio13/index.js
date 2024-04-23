// import the libraries
const http   = require('http');
const express = require('express');
const path    = require('path');
const app     = express();

// set components ejs
app.set('view engine', 'ejs');
app.set('views', 'views') // ejs are comming out of the views folder

// set components body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public'))); // This is to serve static files

// public url
app.get('/', (request, response, next) => {
    response.send("Hola Mundo");
});

app.get('/index', (request, response, next) => {
    response.sendFile('index.html', {root: path.join(__dirname, '/public')});
});

app.get('/test_ejs', (request, response, next) => {
    response.render("users/login")
});

const userRoutes = require('./routes/usuarios.routes');
app.use('/users', userRoutes);

const server = http.createServer((request, response) => {
    console.log(request.url);
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

