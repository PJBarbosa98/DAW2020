var http 	= require('http');
var axios 	= require('axios');
var fs 		= require('fs');

var templates 	= require('./templates');
var static 		= require('./static');
var {parse} 	= require('querystring');

/********************************************************************
 *
 * SET UP:
 *
 * cd db/
 * json-server --watch db.json -p 3001
 *
 ********************************************************************/


/********************************************************************
 *
 * Auxiliary Functions
 *
 ********************************************************************/

/* recoverInfo : retrieves task info from request body */
function recoverInfo ( request, callback )
{
	if (request.headers['content-type'] == 'application/x-www-form-urlencoded') {
		let body = '';
		request.on('data', bloco => {
			body += bloco.toString();
		})
		request.on('end', () => {
			console.log(body);
			callback(parse(body));
		})
	}
}

/********************************************************************
 *
 * Create Server
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
				//console.log('Serving static resource: ' + req.url);
			}


			// GET /
			if (req.url == '/')
			{
				res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
				res.write(templates.welcome_page());
				res.end();
			}

			// GET tasks/
			else if (req.url == '/tasks')
			{
				axios.get('http://localhost:3001/tasks')
				.then(response => {

					var tasks = response.data;

					res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
					res.write(templates.generate_tasks_page(tasks, d));
					res.end();

				})
				.catch(error => {
					res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
					res.write("<p>Failed to get tasks list!</p>");
					res.end();
				})
			}

			// GET tasks/{id}
			// Fetch individual task page given its `id` value
			// `id` must be of shape `t{number}`
			if (/\/tasks\/(t)[0-9]+$/.test(req.url))
			{
				// Request URL split by ('/')
				let parts 	= req.url.split('/');
				// Task ID (retrieved from `parts`)
				let t_id 	= parts[parts.length - 1];
				
				axios.get('http://localhost:3001/tasks/' + t_id)
				.then(response => {

					var task = response.data;

					res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
					res.write(templates.generate_individual_task_page(task));
					res.end();
				})
				.catch(error => {
					res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
					res.write("<p>Failed to get task!</p>");
					res.end();
				});
			}

			// GET tasks/new
			// Create new Task
			if (/\/tasks\/new$/.test(req.url))
			{
				res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
				res.write(templates.generate_register_form());
				res.end();
			}



			// GET tasks/edit/{id}
			// Edit task with id `id`
			if (/\/tasks\/edit\/(t)[0-9]+$/.test(req.url))
			{

				// Request URL split by ('/')
				let parts 	= req.url.split('/');
				// Task ID (retrieved from `parts`)
				let t_id 	= parts[parts.length - 1];

				axios.get('http://localhost:3001/tasks/' + t_id)
				.then(response => {

					var task = response.data;

					console.log('edit: ' + task);
					res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
					res.write(templates.edit_task_form(task));
					res.end();
				})
				.catch(error => {
					res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
					res.write("<p>Failed to edit task!</p>");
					res.end();
				});
			}


			break;

		case "POST":
			recoverInfo(req, result => {

				console.log('POST request with body: ' + JSON.stringify(result));
				axios.post('http://localhost:3001/tasks', result)
				.then(resp => {
					res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
					res.write(templates.generate_new_task_confirmed(resp.data));
					res.end();
				})
				.catch(error => {
					res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
					res.write('<p>Got an error while creating a new task!</p>');
					res.end();
				});
			
			})

			break;			

/*
res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
// Replace this code with a POST request to the API server
recuperaInfo(req, resultado => {
    console.log('POST de aluno:' + JSON.stringify(resultado))
    axios.post('http://localhost:3000/alunos', resultado)
        .then(resp => {
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
            res.write(geraPostConfirm( resp.data, d))
            res.end()
        })
        .catch(erro => {
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
            res.write('<p>Erro no POST: ' + erro + '</p>')
            res.write('<p><a href="/">Voltar</a></p>')
            res.end()
        })
})
*/


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

console.log('Server running @ port 4000\nAccess: http://localhost:4000/');
