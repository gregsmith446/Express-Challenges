var express = require('express');
var app = express();

app.use(express.static('public'));

 var cities = {
        'New York': 'New York',
        'Boston': 'Mass',
        'Providence': 'Rhode Island',
        'Hartford': 'Connecticut',
        'Concord': 'New Hampshire'
   };
   
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
    var name = request.params.name; //the value of city
    var block = name[0].toUpperCase() + name.slice(1).toLowerCase(); //normalize name
    var description = cities[block];
    if (!description) {
        response.status(404).json('No description found for ' + request.params.name);
    } else {
        response.json(description); //200 default success code
    }
});


app.listen(process.env.PORT)








// Lesson 1
// app.get('/', function(request, response) {
//     response.send('Helloooooo Worlddddd\n'); // \n puts on new line
// });

// app.get('/name', function(request, response) {
//     var name = "Greg Smith\n";
//     response.redirect(301, '/surprise'); //redirect with moved permanently code
//     response.send(name);
// });

// app.get('/date', function(request, response) {
//     var today = new Date();
//     response.send(today); 
// });

// app.listen(process.env.PORT, function() {
//     console.log('listening on port 3000');
// });

// // can also write the first function like this in node HTTP syntax
// // app.get('/', function(request, response) {
// //     response.write("Hello World");
// //     response.end(); 
// // });