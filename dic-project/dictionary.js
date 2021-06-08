

var express = require('express');
var app = express();
var routes = require('./assets/js/routes');

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static(__dirname + '/assets'));

app.use('/', routes);

app.listen(8080);
