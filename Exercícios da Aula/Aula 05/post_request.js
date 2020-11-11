const axios = require('axios');

axios.post('http://localhost:3000/pubs', {
	'id' 	: 'DAW2020',
	'title'	: 'Aula5',
	'year'	: '2020'
})	.then(resp => {
	console.log(resp.data);
}) 	.catch(error => {
	console.log('ERRO: ' + error);
});


