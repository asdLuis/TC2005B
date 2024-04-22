const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');

const server = http.createServer((request, response) => {
    console.log(request.url);

    switch (request.url) {
        case "/":
            response.setHeader('Content-Type', 'text/plain');
            response.write("/");
            response.end();
            break;
        case "/index":
            response.setHeader('Content-Type', 'text/html');
            const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');
            response.write(html);
            response.end();
            break;
        case "/forms":
            if (request.method === 'POST') {
                let body = '';
                request.on('data', chunk => {
                    body += chunk.toString();
                });

                request.on('end', () => {
                    const formData = new URLSearchParams(body);
                    const name = formData.get('name');
                    const answer = formData.get('answer');

                    // Save data to a text file
                    const dataToSave = `Name: ${name}, Answer: ${answer}\n`;
                    fs.appendFile(path.resolve(__dirname, './formData.txt'), dataToSave, err => {
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
            } else {
                response.setHeader('Content-Type', 'text/html');
                const forms = fs.readFileSync(path.resolve(__dirname, './forms.html'), 'utf8');
                response.write(forms);
                response.end();
            }
            break;
        default:
            response.statusCode = 404;
            response.end();
            break;
    }

});

server.listen(3000);
