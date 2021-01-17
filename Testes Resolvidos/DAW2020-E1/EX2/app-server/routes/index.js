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
			axios.get(base_url + 'entidades?token=' + token)
				.then(dados => {
					res.render('index', { entidades: dados.data });
				})
				.catch(erro => console.log('Não consegui obter os dados!\n' + erro));

		})
		.catch(erro => {
			console.log('Não foi possível fazer login! ' + erro);
		})
});

router.get('/entidades/:id', (req, res) => {
	axios.post(base_url + 'users/login',
		{
			"username": username,
			"password": password
		})
		.then(info => {
			var token = info.data.token;
			var entid = req.params.id;
			axios.all([
					axios.get(base_url + 'entidades/' + entid + '?token=' + token),
					axios.get(base_url + 'entidades/' + entid
						+ '/tipologias?token=' + token),
					axios.get(base_url + 'entidades/' + entid
						+ '/intervencao/dono?token=' + token),
					axios.get(base_url + 'entidades/' + entid
						+ '/intervencao/participante?token=' + token)
				])
				.then(axios.spread((entidade, tipologias, dono, participante) => {
					res.render('individual', {
						entidade: entidade.data,
						tipologias: tipologias.data,
						dono: dono.data,
						participante: participante.data
					});
				}))
				.catch(err => res.render('error', { error: err }));
		})
		.catch(erro => {
			console.log('Não foi possível fazer login! ' + erro);
		})
});

module.exports = router;