var http = require('http');

http.createServer(function (req, res) {

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(JSON.stringify(req));
    res.end('Hello World12!');
}).listen(8080);