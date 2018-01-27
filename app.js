var express = require('express');
var app = express();

app.use(express.static('public'));

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });

 var cities = {
        'Albany': 'NY',
        'Boston': 'MA',
        'Providence': 'RI',
        'Hartford': 'CT',
        'Concord': 'NH'
   };
   
app.post('/cities', parseUrlencoded, function(request, response){
    var newCity = request.body;
    cities[newCity.name] = newCity.description;
    response.status(201).json = newCity.description;
});

app.delete('/cities/:name', function(request, response) {
    delete cities[request.cityName];
    response.sendStatus(200);
});
   
app.param('name', function(request, response,next) {
    var name = request.params.name;
    var city = name[0].toUpperCase() + name.slice(1).toLowerCase(); //normalize name

    //request.blockName = block;
    request.cityName = city
    
    next();
})   

// curl http://localhost:8080/cities?limit=3
app.get('/cities', function(request, response) {
    if (request.query.limit >= 1 && request.query.limit <= 5) {
        response.json(Object.keys(cities).slice(0, request.query.limit));
    } else if (request.query.limit > 5) {
        response.status(404).json('Number of Cities Requested Higher than Number Available')
    } else {
        response.json(Object.keys(cities)); //otherwise returns with all cities
    }
});   

app.get('/cities/:name', function(request, response){
    var description = cities[request.cityName];
    if (!description) {
        response.status(404).json('No description found for ' + request.params.name);
    } else {
        response.json(description); //200 default success code
    }
});


app.listen(process.env.PORT)
