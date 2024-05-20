const http    = require('http');
const express = require('express');
const path    = require('path');
const fs      = require('fs');
const app     = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (request, response, next) => {
    const mariadb = require("mariadb");
    const pool = mariadb.createPool({
    host:"localhost",
    user:"root",
    password:"root",
    connectionLimit:5
    });
});

const server = http.createServer( (request, response) => {    
    console.log(request.url);
});
app.listen(3000);