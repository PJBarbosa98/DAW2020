var http 	= require('http');
var axios 	= require('axios');
var fs 		= require('fs');

var templates 	= require('./templates');
var static 		= require('./static');
var {parse} 	= require('querystring');

// put requests with html
// https://stackoverflow.com/questions/8054165/using-put-method-in-html-form

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
			else if (req.url == '/')
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
			else if (/\/tasks\/(t)[0-9]+$/.test(req.url))
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
			else if (/\/tasks\/new$/.test(req.url))
			{
				res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
				res.write(templates.generate_register_form());
				res.end();
			}

			// GET tasks/delete/{id}
			// Delete task with id `id`
			else if (/\/tasks\/delete\/(t)[0-9]+$/.test(req.url))
			{
				res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
				res.write(templates.generate_delete_page());

				// Task deletion request

				let parts 	= req.url.split('/');
				let t_id 	= parts[parts.length - 1];

				axios.delete('http://localhost:3001/tasks/' + t_id);
				
				res.end();
			}


			// GET tasks/edit/{id}
			// Edit task with id `id`
			else if (/\/tasks\/edit\/(t)[0-9]+$/.test(req.url))
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

			// GET /tasks/clear
			// Remove completed tasks from the database
			else if (/\/tasks\/clear$/.test(req.url))
			{

				// TO DO:
				// fetch all tasks (axios.get ?)
				// filter those with 'status' == 'Completed'
				// delete them (axios.delete)

				// Fetch all tasks
				axios.get('http://localhost:3001/tasks')
				.then(response => {

					var tasks = response.data;

					tasks.forEach(t => {

						// Filter those with 'status' == 'Completed'
						if (t.status == 'Completed')
						{
							// Delete them
							axios.delete('http://localhost:3001/tasks/' + t.id);
						}
					});

					res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
					res.write(templates.generate_clear_page());
					res.end();

				})
				.catch(error => {
					res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
					res.write("<p>Failed to get tasks for deletion!</p>");
					res.end();
				})


			}

			// Invalid GET request
			else
			{
				res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
				res.write('<p>Invalid GET Request!</p>');
				res.end();	
			}


			break;

		case "POST":
			recoverInfo(req, result => {

				console.log('POST request with body: ' + JSON.stringify(result));

				// Unwrap PUT request

				let is_put = JSON.stringify(result).split(':');
				// Fetch "_method" (if possible)
				is_put = is_put[0].substring(1).trim();

				// PUT REQUEST
				if (is_put.normalize() == '"_method"'.normalize())
				{
					
					// --- PUT requests' body -----------------------

					// Remove '{"_method":"PUT",' from PUT request
					let put_req = JSON.stringify(result).substring(17);
					// Add '{' at the beginning of the PUT request
					put_req 	= '{' + put_req;

					// --- Record to be altered ---------------------

					let put_url = JSON.stringify(result).split(',')[1].substring(6);
					
					put_url 	= put_url.substring(0, put_url.length-1);
					put_url	 	= 'http://localhost:3001/tasks/' + put_url;

					// --- PUT request itself -----------------------

					axios.put(put_url, JSON.parse(put_req))
					.then(resp => {
						res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
						res.write(templates.generate_edit_confirmed());
						res.end();
					})
					.catch(error => {
						res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
						res.write('<p>Got an error while editig a task!</p>');
						res.end();	
					})

				}

				// NOT A PUT REQUEST
				else
				{
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
				}			
			})

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
