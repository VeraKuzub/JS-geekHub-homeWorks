let http = require('http');
let fs = require('fs');

http.createServer(function (req, res) {
	let info;
	if (req.url == '/' ) {
		fs.readFile('../index.html' function(err, info){
			if(err) {
				console.error(err);
				res.statusCode = 500;
				res.end('Error on the Server');
				return;
			}
			res.end(info);
		});
	}
}).listen(3000);

// server.listen(1337, '127.0.0.1');
console.log('Server is running');
