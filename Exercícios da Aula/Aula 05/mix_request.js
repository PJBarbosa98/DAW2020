/*
 * run:
 *
 * json-server --watch jcr_pubs.json
 * json-server --watch db.json -p 3001
 *
 */

const axios = require('axios');

axios.get('http://localhost:3001/cursos')
	.then(resp => {
		var cursos = resp.data;	

		for (var i = 0; i < cursos.length; ++i) {
			axios.post('http://localhost:3000/pubs', {
				'id'	: cursos[i].id,
				'title'	: cursos[i].designacao,
				'year'	: '2020'	
			}).then(resp => {
				console.log('Inseri o registo: ' + resp.data.id);
			}).catch(error => {
				console.log('Erro no POST: ' + error);
			});
		}

	})
	.catch(error => {
		console.log('Erro no GET: ' + error);
	})