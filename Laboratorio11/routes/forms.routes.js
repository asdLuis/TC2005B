const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/', (request, response, next) => {
    response.sendFile('forms.html', {root: path.join(__dirname, '../view')});
});
router.post('/post-form', (request, response, next) => {
    
    const name = request.body.name;
    const answer = request.body.answer;

    const dataToSave = `Name: ${name}, Answer: ${answer}\n`;
    fs.appendFile(path.resolve(__dirname, '../update/formData.txt'), dataToSave, err => {
        if (err) {
            console.error('Error saving data:', err);
            response.statusCode = 500;
            response.end('Internal Server Error');
            return;
        }
        response.statusCode = 200;
        response.end('Form submitted successfully!');
    });
});

module.exports = router;