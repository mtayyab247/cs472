

var mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Tayyab##123',
    database: 'entries'
});

connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the MySQL server.');
});

let getSearchResult = function(req, res) {
    let query = "SELECT * From entries.entries WHERE word='" + req.query.term + "'";

    connection.query(query, function(err, results, fields) {
        if (err) {
            console.log(err.message);
        }
        res.send(results);
    });
};

module.exports.getSearchResult = getSearchResult;