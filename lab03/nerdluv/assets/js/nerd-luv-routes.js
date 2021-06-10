
var express = require('express');
var router = express.Router();
var fileStream = require('fs');


router.get("/", function(req, res) {
    res.render("index.pug");
});

router.get("/signup", function(req, res) {
    res.render("signup.pug");
});

router.post("/signupp", function(req, res) {
    fileStream.writeFile(
        'singles.txt',
        "\n" + Object.values(req.body).toString(),
        {'flag':'a'},
        function(err) {
            if (err) {
                return console.error(err);
            }
        }
    );

    res.render("signup-success.pug", { username: req.body.name });
});

router.get("/matchesform", function(req, res) {
    res.render("matchesform.pug");
});

router.get("/findmatch-submit", function(req, res) {
    var name = req.query.name.trim();

    const matchPromise = new Promise((resolve, reject) => {
        fileStream.readFile('singles.txt', "utf-8", function(error, data) {
            data = data.split('\n');
            data = data.map(function(item, index) {
                item = item.split(',');
                item = {
                    index: index,
                    name: item[0],
                    gender: item[1],
                    age: item[2],
                    pt: item[3],
                    fos: item[4],
                    min: item[5],
                    max: item[6],
                };
                return item;
            });

            var userID = data.findIndex(p => p.name === name);
            var user = data[userID];
            var reqGender = user.gender === "F" ? "M" : "F";
            
            results = data.filter(
                p => p.gender === reqGender && 
                p.index !== userID && 
                (parseInt(p.age) >= parseInt(user.min) && parseInt(p.age) <= parseInt(user.max)) &&
                p.fos === user.fos
            );

            resolve(results);
        });

        
    });

    matchPromise.then(function(results) {
        // res.send(JSON.stringify(results));
        res.render("matches.pug", {matches: results, username: name});
    });
    
});

module.exports = router;