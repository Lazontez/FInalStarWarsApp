// var http = require("http");
var express = require("express")
var path = require("path")
var app = express()
var fs = require("fs")

var survey_data = [
    {
        User_Name: "Jamison",
        QuestionOne: 3,
        QuestionTwo: 1,
        QuestionThree: 3,
        QuestionFour: 4,
        QuestionFive: 2,
        QuestionSix: 2,
        QuestionSeven: 4,
        QuestionEight: 5,
        QuestionNine: 2,
        QuestionTen: 4
    },
    {
        User_Name: "Jeff Hardy",
        QuestionOne: 5,
        QuestionTwo: 2,
        QuestionThree: 2,
        QuestionFour: 2,
        QuestionFive: 1,
        QuestionSix: 2,
        QuestionSeven: 3,
        QuestionEight: 4,
        QuestionNine: 3,
        QuestionTen: 4
    },
    {
        User_Name: "Ruth",
        QuestionOne: 3,
        QuestionTwo: 5,
        QuestionThree: 1,
        QuestionFour: 3,
        QuestionFive: 4,
        QuestionSix: 5,
        QuestionSeven: 2,
        QuestionEight: 3,
        QuestionNine: 1,
        QuestionTen: 5
    },
    {
        User_Name: "Nebu",
        QuestionOne: 1,
        QuestionTwo: 1,
        QuestionThree: 3,
        QuestionFour: 2,
        QuestionFive: 2,
        QuestionSix: 3,
        QuestionSeven: 3,
        QuestionEight: 3,
        QuestionNine: 3,
        QuestionTen: 1
    },


]



app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//specify the port we will use
var PORT = process.env.port || 8080

app.get('/', function (req, res) {

    res.send(html)
    res.header("Content-type", "text/html")
    res.sendFile(path.join(__dirname, './public/home.html'));
});


//when a get method on the url: /survey is called
app.get('/survey', function (req, res) {
    res.header("Content-type", "text/html")
    res.sendFile(path.join(__dirname, './public/survey.html'));



})
//when a get method is called
app.get("/api/survey", function (req, res) {
    res.send(survey_data);
});
//when a post method is called 
app.post('/api/survey', function (req, res) {
    survey_data.push(req.body)
    findMatch(req.body)

})
app.get('/api/survey', function (request, response) {
    response.json(survey_data)
});

function findMatch(data){
    for(var j=0;j<survey_data.length;j++){
        console.log(survey_data[j]);
        console.log(data)

    }
    //run a for loop through the survey data
    //and compare the answers given from the response
    //if th

}
//any other get method call to the survey
app.get('*', function (req, res) {
    fs.readFile("./public/home.html", "utf8", function (err, htmlCode) {
        var html = htmlCode;
        res.send(html)
    });
})
//turn the server on and listen for a request
app.listen(PORT, function () {
    console.log("listening to http://localhost:" + PORT)
})

