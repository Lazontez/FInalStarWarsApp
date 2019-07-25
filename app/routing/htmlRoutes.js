var http = require("http");
function handleRequest(req, res) {
    //Prepare the server to be able to handle a html file
    res.writeHead(200, { 'Content-Type': 'text/html' });
    //make a variable called fs which we will use to connect to the 'filesystem' module in node
    var fs = require("fs");
    //create a variiable called url which we store the url from the request to the server
    var url = req.url;
    //if the url is '/' read the home.html file and respond with that file
    if (url == "/") {
        fs.readFile("./home.html", "utf8", function (err, htmlCode) {
            var html = htmlCode;
            res.end(html)
        });
    }
    //if the url has '/survey' in the read the './survey.html' file and respond with the html code inside of it
    else if (url == "/survey") {
        fs.readFile("./survey.html", function (err, htmlCode) {
            res.end(htmlCode);

        });
    }
};
//create a variable called server in which we create a sever and pass through the handleRequest function in it
var server = http.createServer(handleRequest);
//specify the port we will use
var PORT = 7355
//turn the server on and listen for a request
server.listen(PORT, function () {
    console.log("listening to http://localhost:" + PORT)
})

