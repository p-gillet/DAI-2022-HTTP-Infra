const Chance = require('chance');
const express = require('express');
const app = express();
const chance = new Chance();
const port = 3000;

app.get('/', function (req, res) {
    res.send(generateAnimals());
});

app.listen(port, function (){
    console.log("Accepting HTTP requests on port " + port + "!");
})

function generateAnimals() {
    var numberOfAnimals = 1/*chance.integer({min: 0, max: 10})*/;
    console.log("Generating " + numberOfAnimals + " animals");
    var animals = [];
    for (var i = 0; i < numberOfAnimals; i++) {
        var gender = chance.gender();
        var birthYear = chance.year({min: 1950, max: 2023});
        animals.push({
            firstName: chance.first({
                gender: gender
            }),
            gender: gender,
            birthday: chance.birthday({
                year: birthYear
            }),
            species: chance.animal()
        });
    }
    console.log(animals);
    return animals;
}