const http    = require('http');
const express = require('express');
const fs      = require('fs'); // Add this line
const app     = express();
const path    = require('path');
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended: false}));
//Middleware
app.get('/', (request, response, next) => {
    response.send("/");
});
app.get('/index', (request, response, next) => {
    response.sendFile('index.html', {root: path.join(__dirname, '/view')});
});
app.get('/question', (request, response, next) => {
    response.sendFile('question.html', {root: path.join(__dirname, '/view')});
});
app.get('/material', (request, response, next) => {
    response.sendFile('material.html', {root: path.join(__dirname, '/view')});
});

const rutasFormulario = require('./routes/forms.routes');
app.use('/forms', rutasFormulario);

app.use((request, response, next) => {
    response.status(404);
    response.send('¡Page Not Found!'); 
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
