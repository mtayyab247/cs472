
var express = require('express');
var app = express();
var router = require("./assets/js/nerd-luv-routes");
var bodyParser  = require('body-parser');

app.set('view-engine', 'pug');
app.set('views', './views');
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(express.static('./assets'));
app.use("/", router);

app.listen(1000); 