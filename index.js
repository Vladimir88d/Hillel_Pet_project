


var http = require('http');
var fs = require('fs');
http.createServer(function (request, response) {


    let path = '';
    let contentType = 'text/html';

    switch (request.url.split('.')[1]) {
        case 'css':
            path = '.' + request.url;
            contentType = 'text/css';
            break;
        case 'js':
            path = '.' + request.url;
            contentType = 'text/javascript';
            break;
        case 'svg':
            path = '.' + request.url;
            contentType = 'image/svg+xml';
            break;
        case 'png':
            path = '.' + request.url;
            contentType = 'image/png';
            break;
        default:
            path = 'index.html';
            contentType = 'text/html';

    }
    fs.readFile(path, function (error, data) {
        response.writeHead(200, { 'Content-Type': contentType });
        response.write(data);
        console.log(request.url);
        response.end();
    });

}).listen(3333);