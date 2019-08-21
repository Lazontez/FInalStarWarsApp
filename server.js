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
var PORT = process.env.PORT || 8075

app.get('/', function (req, res) {

    res.header("Content-type", "text/html")
    res.sendFile(path.join(__dirname, './app/public/home.html'));
});
//when a get method on the url: /survey is called
app.get('/survey', function (req, res) {
    res.header("Content-type", "text/html")
    res.sendFile(path.join(__dirname, './app/public/survey.html'));



})
//when a get method is called
// app.get("/api/survey", function (req, res) {
//     res.send(survey_data);
// });
//when a post method is called 
app.post('/api/survey', function (req, res) {
    // survey_data.push(req.body)
    res.send(findMatch(req.body))

})
app.get('/api/survey', function (request, response) {
    response.json(survey_data)
});
function parseMatchArr(array) {
    // var data = ["array","1","3","2","2"]
    var parsedData = []
    for (x = 1; x < array.length; x++) {
        parsedData.push(parseFloat(array[x]));
    };
    if (x == array.length) {
        return parsedData
    }

}
function findMatch(data) {
    var dataTotal = 0;
    var surveyTotal = 0;
    var match = []
    var inTheHole=0
    for (var j = 0; j < survey_data.length; j++) {
        var differance = 0;
        var dataArr = Object.values(data);
        var survey_dataArr = Object.values(survey_data);

        //run a loop through the dataArr and add the values of the array up to a variable called dataTotal
        //add up the value of the current surveydataarr to see how much the value is then subtract it from the dataTotalq
        // console.log(parseMatchArr(dataArr).reduce((a, b) => a + b, 0));
        if (parseMatchArr(dataArr).reduce((a, b) => a - b, 0) - parseMatchArr(Object.values(survey_data[j])).reduce((a, b) => a - b, 0) > surveyTotal) {
            dataTotal = parseMatchArr(dataArr).reduce((a, b) => a - b, 0) - parseMatchArr(Object.values(survey_data[j])).reduce((a, b) => a - b, 0);
            inTheHole++
            if(inTheHole==2){
                console.log("You Matched with "+ survey_data[j].User_Name)
                return survey_data[j]

            }
            

        }

        //run a for loop through the survey data
        //and compare the answers given from the response
        //if th

    }
}
//any other get method call to the survey
app.get('*', function (req, res) {
    fs.readFile("./app/public/home.html", "utf8", function (err, htmlCode) {
        var html = htmlCode;
        res.send(html)
    });
})
//turn the server on and listen for a request
app.listen(PORT, function () {
    console.log("listening to http://localhost:" + PORT)
})

