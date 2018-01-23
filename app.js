var express = require('express');
var app = express();

app.get('/', function(request, response) {
    response.send('Helloooooo Worlddddd\n'); // \n puts on new line
});

// can also write the above like this in node HTTP syntax
// app.get('/', function(request, response) {
//     response.write("Hello World");
//     response.end(); 
// });

app.get('/name', function(request, response) {
    var name = "Greg Smith\n";
    response.redirect(301, '/surprise'); //redirect with moved permanently code
    response.send(name);
});

app.get('/date', function(request, response) {
    var today = new Date();
    response.send(today); 
});

app.listen(process.env.PORT, function() {
    console.log('listening on port 3000');
});