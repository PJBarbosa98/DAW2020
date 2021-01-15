var express = require('express');
var router = express.Router();

var axios = require('axios');

var username = 'leo.ramalho99@gmail.com';
var password = '123';
var base_url = 'http://clav-api.di.uminho.pt/v2/';

router.get('/', (req, res) => {
	axios.post(base_url + 'users/login',
		{
			"username": username,
			"password": password
		})
		.then(info => {
			var token = info.data.token;
			axios.get(base_url + 'legislacao?token=' + token)
				.then(dados => {
					res.render('index', { diplomas: dados.data });
				})
				.catch(erro => console.log('Não consegui obter os dados!\n' + erro));

		})
		.catch(erro => {
			console.log('Não foi possível fazer login! ' + erro);
		})
});

router.get('/diplomas/:id', async function (req, res) {
	var parts = req.url.split('/');
	var objid = parts[parts.length-1];

	axios.post(base_url + 'users/login',
		{
			"username": username,
			"password": password
		})
		.then(info => {
			var token = info.data.token;
			axios.all([
				axios.get(base_url + 'legislacao/' + objid + '?token=' + token),
				axios.get(base_url + 'legislacao/' + objid + '/processos?token=' + token)
			])
				.then(axios.spread((diploma, processos) => {
					res.render('diploma', { diploma: diploma.data, processos: processos.data });
					//res.jsonp({ diploma: diploma.data, processos: processos.data });
				}))
				.catch(err => res.render('error', { error: err }))
		})
		.catch(erro => {
			console.log('Não foi possível fazer login! ' + erro);
		})
});

module.exports = router;