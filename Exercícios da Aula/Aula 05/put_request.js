const axios = require('axios');

axios.post('http://localhost:3001/instrumentos', {
	'id' 	: 'I78',
	'#text' : 'Pífaro'
}).then(resp => {
	console.log(resp.headers.location);
}).catch(error => {
	console.log(error);
})