
var http = require('http');
var fs = require('fs');
var path = require("path");
var express = require('express');
var calcModule = require('./assets/js/calc');

http.createServer(function(req, res) {
    
    var queryArgs = url.parse(req.url, true);

    var filePath = queryArgs.pathname;
    filePath = filePath.substr(1, filePath.length); // Remove first "/"

    var ext = path.extname(filePath);
    ext = ext.substr(1, ext.length);
    
    if(filePath === "") {
        filePath = "simpleCalc.html";
        ext = "html";
    } else if(filePath === "calc.js") {
        calcModule.calc(req, res, queryArgs.query);
        return res.end();
    }
    
    
    fs.readFile(filePath, function(err, data) {
        if (err) {
            return res.end("404 Not Found");
        }
        res.writeHead(200, {'Content-Type': 'text/' + ext}); // Content-Type not included
        res.write(data, "utf-8");
        return res.end();
    });
    
}).listen(8080);

