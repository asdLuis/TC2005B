const http    = require('http');
const express = require('express');
const path    = require('path');
const fs      = require('fs');
const app     = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (request, response, next) => {
    response.setHeader('Content-Type', 'text/plain');
    response.send("Hola Mundo");
    response.end(); 
});

app.get('/test_ejs', (request, response, next) => {
    let frases = [];
    frases.push("Hola Mundo");
    frases.push("Hola Clase");
    frases.push("Hola Alumnos");
    frases.push("Hola Profesor");
    frases.push("Hola Laboratorio");

    response.render('index', {
        frases: frases
    });
});

app.use((request, response, next) => {
    response.status(404);
    response.send('¡Page Not Found!'); 
});

app.listen(3000);
