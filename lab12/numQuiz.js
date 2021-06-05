
var http = require("http");
var url = require("url");
var querystring = require('querystring');

var userAns = [];
var score = 0;

http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});

    if(req.method === "GET") {
        
        var queryVariables = JSON.parse(JSON.stringify(url.parse(req.url, true).query));
        
        if(Object.keys(queryVariables).length > 0) {
            let qNum = parseInt(queryVariables.qNum);
            userAns.push(parseInt(queryVariables.num));
            score = quizAns.filter(e => userAns.indexOf(e) !== -1).length;
            
            if(qNum < quizQuestions.length) {
                // console.log(qNum);
                res.write(getForm(qNum));
            } else {
                // console.log(score);
                res.write(getQuizResult());
            }
        } else {
            res.write(getForm(0));
        }
        
    } else {
        
        // var queryVariables = url.parse(req.url, true).query;
        // console.log(queryVariables);
        // res.write("queryVariables.num");
    }
    
    // res.write(url.parse(req.num, true).query);
    res.end();
}).listen(8080);

var quizQuestions = [
    [3, 1, 4, 1, 5],
    [1, 1, 2, 3, 5],
    [1, 4, 9, 16, 25],
    [2, 3, 5, 7, 11],
    [1, 2, 4, 8, 16],
];
var quizAns = [9, 8, 36, 13, 32];



var getForm = function(qn) {
    var nextQ;
    var questionNumber = 0;
    switch(qn) {
        case 0:
            nextQ = quizQuestions[0].toString();
            questionNumber = 1;
            break;
        case 1: 
            nextQ = quizQuestions[1].toString();
            questionNumber = 2;
            break;
        case 2: 
            nextQ = quizQuestions[2].toString();
            questionNumber = 3;
            break;
        case 3: 
            nextQ = quizQuestions[3].toString();
            questionNumber = 4;
            break;
        case 4: 
            nextQ = quizQuestions[4].toString();
            questionNumber = 5;
            break;
    }
    var quizForm = "<form method='get' action='http://localhost:8080/'>";
    quizForm += "<div>";
        quizForm += "<h1>The Number Quiz</h1>";
        quizForm += "<p>Your current score is " + score + ".</p>";
        quizForm += "<p>Guess the next number in the sequence.</p>";
        quizForm += "<p>" + nextQ + "</p>";
        quizForm += "<p>Your Answer:<input type='number' name='num'></p>";
        quizForm += "<input type='hidden' name='qNum' value='" + questionNumber + "'>";
        quizForm += "<button type='submit'>Submit</button>";
    quizForm += "</div>";
    quizForm += "</form>";

    return quizForm;
}

let getQuizResult = function() {
    let result = "<div>";
    result += "<h1>The Number Quiz</h1>";
        result += "<p>Your current score is " + score + ".</p>";
        result += "<p>You have completed the number quiz, with a score of " + 
            score + " out of " + quizQuestions.length + ".</p>";
    result += "</div>";

    score = 0;
    return result;
}

