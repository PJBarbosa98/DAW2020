var http 	= require('http');
var axios 	= require('axios');

// npm i axios
// json-server --watch db.json -p 3001

// TO DO: IGNORE FAVICON REQUEST (CRASH)

http.createServer(function (req, res) {
	// Imprimir pedido
	console.log(req.method + ' ' + req.url);

	// Servidor responde apenas a pedidos GET
	if (req.method == 'GET')
	{
		// Página principal
		if (req.url == '/')
		{
			res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});

			res.write('<h2>Escola de Música</h2>');
			res.write('<ul>');
				res.write('<li><a href="/alunos">Lista de alunos</a></li>');
				// TO DO:
				//res.write('<li><a href="/cursos">Lista de cursos</a></li>');
				//res.write('<li><a href="/instrumentos">Lista de instrumentos</a></li>');
			res.write('</ul>');

			res.end();
		}

		// Lista de alunos
		else if (req.url == '/alunos')
		{
			axios.get('http://localhost:3001/alunos')
			.then(resp => {
				alunos = resp.data;
				alunos.forEach(p => {

					res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});

					res.write('<ul>');

					alunos.forEach(a => {
						res.write('<li>' + a.id + ' - ' + a.nome + '</li>');
					});

					res.write('</ul>');
					res.write('<address>[<a href="/">Voltar ao ínicio</a>]</address>');

					res.end();


				});
			})
			.catch(error => {
				console.log('Erro na obtenção da lista de alunos: ' + error);
			});
		}

		// TO DO:
		else
		{
			res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
			res.write('<p>Pedido não suportado: ' + req.method + ' ' + req.url + '</p>');
			res.end();
		}

	}

	else
	{
		res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
		res.write('<p>Pedido não suportado: ' + req.method + ' ' + req.url + '</p>');
		res.end();
	}

}).listen(4000);

console.log('Server started @ port 4000');
