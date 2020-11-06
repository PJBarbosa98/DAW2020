/**
 *
 * DAW2020 - T4 - `arq_server.js`
 *
 * Server for arqueoplaces in the Portuguese NW
 * Responds to requests of the type:
 *
 *		localhost:xxxx/arqs/y, where
 *
 * 			xxxx is the port and 
 * 			y the index of the y record
 */

var http 	= require('http')
var fs 		= require('fs')

var aux 	= require('./arq_aux.js')

PORT 		= 7777

http.createServer(function (req, res) {

	console.log(req.method + ' ' + req.url + ' // ' + aux.myDateTime());

	// response for valid request of shape arqs
	// present index page
	if (req.url.match(/arqs$/) || req.url.match(/arqs\/$/))
	{
		fs.readFile('../site/index.html', function(err, data) {
	
			res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
			res.write(data);
			res.end();
	
		});
	}

	// response for valid requests of shape arqs/n
	// for 1 <= n <= 122
	else if (req.url.match(/arqs\/([1-9]|[1-8][0-9]|9[0-9]|1[01][0-9]|12[0-2])$/))
	{
		
		// requested index
		// for e.g., arqs/7 returns 7
		var num = req.url.split('/')[2];

		// read and present file arq{num}.html
		fs.readFile('../site/arq' + num + '.html', function (err, data) {

			res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
			res.write(data);
			res.end();

		});

	}
	// response for invalid requests (404)
	else
	{
		res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
		error_page = ' 															\
			<!DOCTYPE html>														\
			<html>															\
				<head>														\
					<title>													\
						404 - Not Found 										\
					</title>												\
				</head>														\
				<body>														\
					<h2>Error (404)</h2>											\
					<p>Page not found! Please check your request</p> 							\
				</body>														\
			</html> '

		res.write(error_page);
		res.end();
	}


}).listen(PORT);