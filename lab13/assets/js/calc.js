
exports.calc = function(req, res, query) {
    let result = 0;
    switch(query.operation) {
        case "+":
            result = parseInt(query.n1) + parseInt(query.n2);
            break;
        case "-":
            result = parseInt(query.n1) - parseInt(query.n2);
            break;
        case "*":
            result = parseInt(query.n1) * parseInt(query.n2);
            break;
        case "/":
            result = parseInt(query.n1) / parseInt(query.n2);
            break;
    }

    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<!DOCTYPE html>");
    res.write("<html>");
    res.write("<body>");
    res.write("<h2>The Answer is: " + result);
    res.write("</h2>");
    res.write("</body>");
    res.write("</html>");
    return res.end();
};