//requires express and sets it = to app
var express = require('express');
var app = express();
//parses the data from the user and makes it useable for us
//set it equal to parseURLencoded
var bodyParser = require('body-parser');
var parseUrlEncoded = bodyParser.urlencoded({ extended: false });

//cities object in JSON format
 var cities = {
        'Albany': 'NY',
        'Boston': 'MA',
        'Providence': 'RI',
        'Hartford': 'CT',
        'Concord': 'NH'
   };

//WORKS
//create static middleware = serves files to app from the public directory
app.use(express.static('public'));

//WORKS
//get method route to limit the number of cities by using paramaters
// test with curl http://localhost:8080/cities?limit=3
app.get('/cities', function(request, response) {
    if (request.query.limit >= 1 && request.query.limit <= 5) {
        response.json(Object.keys(cities).slice(0, request.query.limit));
    } else if (request.query.limit > 5) {
        response.status(404).json('Number of Cities Requested Higher than Number Available')
    } else {
        response.json(Object.keys(cities)); //otherwise returns with all cities
    }
});   

//WORKS
//normalize the city name in the URL
//test with curl http://localhost:8080/cities/nameofcity
app.param('name', function(request, response,next) {
    var name = request.params.name;
    var city = name[0].toUpperCase() + name.slice(1).toLowerCase(); //normalize name

    request.cityName = city
    
    next();
})

//WORKS
//get method route to show the state for the requested city
//test with curl http://localhost:8080/cities/nameofcity
app.get('/cities/:name', function(request, response){
    var description = cities[request.cityName];
    if (!description) {
        response.status(404).json('No description found for ' + request.params.name);
    } else {
        response.json(description); //200 default success code
    }
});

//attempting to use global variable to fix app.post
var length = Object.keys(cities).length; //find the length of the object, needs global scope

// does not work
//post method route for adding new cities to <UL>
app.post('/cities', parseUrlEncoded, function(request, response){
    if (request.body.addCity.length > 4 || request.body.state.length > 2) {    
        var newCity = request.body;
        cities[newCity.addCity] = newCity.state;
        response.status(201).json(newCity.addCity);
    } else {
        response.status(400).json("city must be more than 4 characters, state more than 2");
        alert = "Invalid Entry";
    }
    });

//does not work
//delete method route for deleting cities from <UL>
app.delete('/cities/:addCity', function(request, response) {
    delete cities[request.cityName];
    response.sendStatus(200);
});
   
app.listen(process.env.PORT, function() {
    console.log("your express app is running");
});
