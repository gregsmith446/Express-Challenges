var express = require('express');
var app = express();

// alternative way/longer way 
// app.get('/', function(request, response) {
//     response.sendFile(__dirname + '/public.index.html');
// })

app.use(express.static('public'));

app.get('/cities', function(request, response){
   var cities = ['New York', 'Boston', 'Providence', 'Hartford'];
   response.json(cities);
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