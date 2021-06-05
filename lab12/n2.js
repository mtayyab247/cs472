var http = require('http');
var dt = require( "/Users/mdtay/Desktop/compro/WAP/cs472/lab12/myDate" );

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("The date and time are currently: " + dt.myDate());
    res.end();
}).listen(8080);