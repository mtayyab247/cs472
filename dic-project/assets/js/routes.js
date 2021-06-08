
var express = require('express');
var router = express.Router();
var search = require(__dirname + '/dict-db');

router.get('/', function(req, res) {
    res.render('dict');
});

router.get('/word-search', function(req, res) {
    search.getSearchResult(req, res);
});

module.exports = router;