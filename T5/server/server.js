var http 	= require('http');
var axios 	= require('axios');

// NOTE: set dataset to port 3001 using json-server
// by running the following command:
// json-server --watch db.json -p 3001

http.createServer(function (req, res) {

	// print request
	console.log(req.method + ' ' + req.url);

	// server only responds to GET requests
	if (req.method == 'GET')
	{

		// main page
		if (req.url == '/')
		{
			res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
			res.write('<head><title>Índice</title></head>');
			res.write('<h2>Escola de Música</h2>');
			res.write('<ul>');
				res.write('<li><a href="/alunos">Lista de Alunos</a></li>');
				res.write('<li><a href="/cursos">Lista de Cursos</a></li>');
				res.write('<li><a href="/instrumentos">Lista de Instrumentos</a></li>');
			res.write('</ul>');
			res.end();
		}

		// alunos' page
		else if (req.url == '/alunos')
		{

			axios.get('http://localhost:3001/alunos')
			.then(resp => {
				alunos = resp.data;

				res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
				res.write('<head><title>Lista de Alunos</title></head>');
				res.write('<h2>Lista de Alunos</h2>');

				res.write('<ul>');
				alunos.forEach(a => {
					res.write('<li><a href="/alunos/' + a.id + '">' + a.id + ' - ' + a.nome + '</a></li>');
				});
				res.write('</ul>');
				
				res.write('<address>[<a href="/">Voltar ao ínicio</a>]</address>');
				res.end();
			})
			.catch(error => {
				console.log('Erro na obtenção da lista de alunos: ' + error);
			});
		}
		// individual students' page
		else if (	req.url.match(/alunos\/A(?:[0-9]|[1-9][0-9]{1,4})/)
				|| 	req.url.match(/alunos\/AE-(?:[0-9]|[1-9][0-9]{1,2}|1000)/))
		{

			axios.get('http://localhost:3001' + req.url)
			.then(resp => {
				res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});

				aluno = resp.data;

				res.write('<head><title>' + aluno.id + '</title></head>');

				res.write('<table style="border: 1px solid black; border-collapse: collapse;">');
					res.write('<tr>');
						res.write('<th style="border: 1px solid black; border-collapse: collapse; padding: 15px;">ID</th>');
						res.write('<th style="border: 1px solid black; border-collapse: collapse; padding: 15px;">Nome</th>');
						res.write('<th style="border: 1px solid black; border-collapse: collapse; padding: 15px;">Data de Nascimento</th>');
						res.write('<th style="border: 1px solid black; border-collapse: collapse; padding: 15px;">Curso</th>');
						res.write('<th style="border: 1px solid black; border-collapse: collapse; padding: 15px;">Ano no Curso</th>');
						res.write('<th style="border: 1px solid black; border-collapse: collapse; padding: 15px;">Instrumentos</th>');
					res.write('</tr>');

					res.write('<tr>');
						res.write('<td style="border: 1px solid black; border-collapse: collapse; padding: 15px;">' + aluno.id + '</td>');
						res.write('<td style="border: 1px solid black; border-collapse: collapse; padding: 15px;">' + aluno.nome + '</td>');
						res.write('<td style="border: 1px solid black; border-collapse: collapse; padding: 15px;">' + aluno.dataNasc + '</td>');
						res.write('<td style="border: 1px solid black; border-collapse: collapse; padding: 15px;">' + aluno.curso + '</td>');
						res.write('<td style="border: 1px solid black; border-collapse: collapse; padding: 15px;">' + aluno.anoCurso + '</td>');
						res.write('<td style="border: 1px solid black; border-collapse: collapse; padding: 15px;">' + aluno.instrumento + '</td>');
					res.write('</tr>');
				
				res.write('</table>');

				res.write('</br></br>');
				res.write('<address>[<a href="/alunos">Voltar à lista de alunos</a>]</address>');
				res.end();
			})
			.catch(error => {
				console.log('Erro na obtenção do aluno: ' + error);
			});

		}
		// cursos' page
		else if (req.url == '/cursos')
		{
			axios.get('http://localhost:3001/cursos')
			.then(resp => {
				cursos = resp.data;

				res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
				res.write('<head><title>Lista de Cursos</title></head>');
				res.write('<h2>Lista de Cursos</h2>');

				res.write('<ul>');
				cursos.forEach(c => {
					res.write('<li><a href="/cursos/' + c.id + '">' + c.id + 
						' - ' + c.designacao + '</a></li>');
				});
				res.write('</ul>');
				
				res.write('<address>[<a href="/">Voltar ao ínicio</a>]</address>');
				res.end();
			})
			.catch(error => {
				console.log('Erro na obtenção da lista de cursos: ' + error);
			});
		}
		// individual course's page
		else if (	req.url.match(/cursos\/CS([0-9]|[1-8][0-9]|9[0-9]|100)/)
				|| 	req.url.match(/cursos\/CB([0-9]|[1-8][0-9]|9[0-9]|100)/))
		{
			axios.get('http://localhost:3001' + req.url)
			.then(resp => {
				res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
				
				curso = resp.data;
				res.write('<head><title>' + curso.id + '</title></head>');

				// little work-around to fetch instrument's name
				var instrumento = curso.instrumento;
				// convert JSON to JavaScript string
				// additionally, replace the field `#text` with `text`
				instrumento = JSON.stringify(instrumento).replace('#text', 'text');
				// convert result back to JSON
				instrumento = JSON.parse(instrumento);

				res.write('<table style="border: 1px solid black; border-collapse: collapse;">');
					res.write('<tr>');
						res.write('<th style="border: 1px solid black; border-collapse: collapse; padding: 15px;">ID</th>');
						res.write('<th style="border: 1px solid black; border-collapse: collapse; padding: 15px;">Designação</th>');
						res.write('<th style="border: 1px solid black; border-collapse: collapse; padding: 15px;">Duração</th>');
						res.write('<th style="border: 1px solid black; border-collapse: collapse; padding: 15px;">Instrumento</th>');
					res.write('</tr>');
					
					res.write('<tr>');
						res.write('<td style="border: 1px solid black; border-collapse: collapse; padding: 15px;">' + curso.id + '</td>');
						res.write('<td style="border: 1px solid black; border-collapse: collapse; padding: 15px;">' + curso.designacao + '</td>');
						res.write('<td style="border: 1px solid black; border-collapse: collapse; padding: 15px;">' + curso.duracao + '</td>');
						res.write('<td style="border: 1px solid black; border-collapse: collapse; padding: 15px;">' + instrumento.text + '</td>');
					res.write('</tr>');
				res.write('</table>');

				res.write('</br></br>');
				res.write('<address>[<a href="/cursos">Voltar à lista de cursos</a>]</address>');


				res.end();
			})
			.catch(error => {
				console.log('Erro na obtenção do curso: ' + error);
			});
		}
	
		// instrumentos' page
		else if (req.url == '/instrumentos')
		{
			axios.get('http://localhost:3001/instrumentos')
			.then(resp => {
				instrumentos = resp.data;

				res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
				res.write('<head><title>Lista de Instrumentos</title></head>');
				res.write('<h2>Lista de Instrumentos</h2>');

				res.write('<ul>');
				console.log(instrumentos);
				instrumentos.forEach(i => {

					// weird work-around
					var i_str = JSON.stringify(i).replace('#text', 'text');
					var final = JSON.parse(i_str);
					res.write('<li>' + final.id + ' - ' + final.text + '</li>');

				});
				res.write('</ul>');
				
				res.write('<address>[<a href="/">Voltar ao ínicio</a>]</address>');
				res.end();
			})
			.catch(error => {
				console.log('Erro na obtenção da lista de cursos: ' + error);
			});

		}

		// any other request (error)
		else
		{
			res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
			res.write('<head><title>Erro</title></head>');
			res.write('<p>ERRO: Invalid Request (' + req.method + ' ' + req.url + ')</p>');
			res.end();
		}

	}
	// invalid request
	else
	{
		res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
		res.write('<head><title>Erro</title></head>');
		res.write('<p>ERRO: Invalid Request (' + req.metod + ' ' + req.url + ')</p>');
		res.end();
	}

}).listen(4000);