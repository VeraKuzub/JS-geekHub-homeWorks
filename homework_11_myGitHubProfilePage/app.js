var express = require('express');
var http = require('http');
var app = express();

http.createServer(app).listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


app.use(express.static('client'));
