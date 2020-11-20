var http 	= require('http');
var axios 	= require('axios');
var fs 		= require('fs');

var static 	= require('./static');

/********************************************************************
 *
 * SET UP:
 *
 * cd db/
 * json-server --watch db.json -p 3001
 *
 ********************************************************************/

var todo_server = http.createServer(function (req, res) {

	// Logger: What was requested and at what time
	var d = new Date().toISOString().substr(0, 16);
	console.log(req.method + ' ' + req.url + ' ' + d);

	// Request treatment
	switch (req.method) {
		
		case "GET":

			// Handle static resources
			if (static.recursoEstatico(req))
			{
				static.sirvoRecursoEstatico(req, res);
				console.log('serving static resource: ' + req.url);
			}


			// GET /
			if (req.url == '/')
			{
				res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});

				res.write(
					`
					<!DOCTYPE html>
					<html>
					<head>
						<title>Goals List - Welcome</title>
						<link rel="icon" href="favicon.ico"/>
						<link rel="stylesheet" href="w3.css"/>
					</head>
					<body class="w3-lime">
						<div class="w3-container w3-center" style="margin-top: 10%;">
							<h2 class="w3-lime">Goals List</h2>
							<h3 class="w3-lime">Welcome</h3>
							<br><br>
							
							<div
								class="w3-indigo w3-panel w3-border w3-round-large"
								style="width: 25% !important; margin: auto;"
							>
								<p>Check your <a href="/tasks">Goals!</a></p>
							</div>
						</div>
					</body>
					</html>
					`
				);

				res.end();
			}

			// GET tasks/
			else if (req.url == '/tasks')
			{
				res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
				res.write('<h2>TASKSSSSSS Under Construction...</h2>');
				res.write('<p>The page you requested has not been built yet!</p>');
				res.end();	
			}

			break;

		case "POST":
			res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
			res.write('<h2>Under Construction...</h2>');
			res.write('<p>The page you requested has not been built yet!</p>');
			res.end();
			break;

		case "PUT":
			res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
			res.write('<h2>Under Construction...</h2>');
			res.write('<p>The page you requested has not been built yet!</p>');
			res.end();
			break;

		case "DELETE":
			res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
			res.write('<h2>Under Construction...</h2>');
			res.write('<p>The page you requested has not been built yet!</p>');
			res.end();
			break;

		// Invalid request
		default:
			res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
			res.write('<h2>Error (404)</h2>');
			res.write('<p>The page you requested has not been found!</p>');
			res.end();
			break;

	}

});

// Run server
todo_server.listen(4000);
