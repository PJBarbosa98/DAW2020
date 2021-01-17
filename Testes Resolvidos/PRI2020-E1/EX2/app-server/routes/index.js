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
			axios.get(base_url + 'tipologias?token=' + token)
				.then(dados => {
					res.render('index', { title: 'Tipologias', tipologias: dados.data });
				})
				.catch(erro => console.log('Não consegui obter os dados!\n' + erro));
		})
		.catch(erro => {
			console.log('Não foi possível fazer login! ' + erro);
		})
});

router.get('/tipologias/:id', (req, res) => {
	axios.post(base_url + 'users/login',
		{
			"username": username,
			"password": password
		})
		.then(info => {
			var token = info.data.token;
			var tip_url = base_url + '/tipologias/' + req.params.id;
			axios.all([
					axios.get(tip_url + '?token=' + token),
					axios.get(tip_url + '/elementos?token=' + token),
					axios.get(tip_url + '/intervencao/dono?token=' + token),
					axios.get(tip_url + '/intervencao/participante?token=' + token),
				])
				.then(axios.spread((tipologia, entidades, dono, participante) => {
					res.render('tipologia', {
						tipologia: tipologia.data,
						entidades: entidades.data,
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

router.get('/entidades/:id', (req, res) => {
	axios.post(base_url + 'users/login',
		{
			"username": username,
			"password": password
		})
		.then(info => {
			var token = info.data.token;
			axios.get(base_url + 'entidades/' + req.params.id + '?token=' + token)
				.then(dados => {
					res.render('entidade', { entidade: dados.data });
				})
				.catch(erro => console.log('Não consegui obter os dados!\n' + erro));
		})
		.catch(erro => {
			console.log('Não foi possível fazer login! ' + erro);
		})
});


module.exports = router;