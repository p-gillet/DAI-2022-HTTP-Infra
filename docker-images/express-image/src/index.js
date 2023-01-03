const Chance = require('chance');
const express = require('express');
const app = express();
const chance = new Chance();
const port = 3000;

app.get('/', function (req, res) {
    res.send(generateStudents());
});

app.listen(port, function (){
    console.log("Accepting HTTP requests on port " + port + "!");
})

function generateStudents() {
    var numberOfStudents = chance.integer({min: 0, max: 10});
    console.log("Generating " + numberOfStudents + " students");
    var students = [];
    for (var i = 0; i < numberOfStudents; i++) {
        var gender = chance.gender();
        var birthYear = chance.year({min: 1986, max: 1996});
        students.push({
            firstName: chance.first({
                gender: gender
            }),
            lastName: chance.last(),
            gender: gender,
            birthday: chance.birthday({
                year: birthYear
            })
        });
    }
    console.log(students);
    return students;
}