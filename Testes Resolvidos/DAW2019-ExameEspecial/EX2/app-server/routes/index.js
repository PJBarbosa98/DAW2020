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
					res.render('index', { tipologias: dados.data });
				})
				.catch(erro => res.render('error', { error: erro }));
		})
		.catch(erro => {
			res.render('error', { error: erro });
		});
});

router.get('/tipologia/:id', (req, res) => {
	var partes = req.url.split('/');
	var tip_id = partes[partes.length-1];
	axios.post(base_url + 'users/login',
		{
			"username": username,
			"password": password
		})
		.then(info => {
			var token = info.data.token;
			axios.all([
					axios.get(base_url + 'tipologias/' + tip_id + '?token=' + token),
					axios.get(base_url + 'tipologias/' + tip_id
						+ '/elementos?token=' + token),
					axios.get(base_url + 'tipologias/' + tip_id
						+ '/intervencao/dono?token=' + token)
				])
				.then(axios.spread((tip, ent_pert, ent_dono) => {
					res.render('tipologia', {
						tipologia: tip.data,
						pertencentes: ent_pert.data,
						ent_dona: ent_dono.data
					});
				}))
				.catch(erro => res.render('error', { error: erro }));

		})
		.catch(erro => {
			res.render('error', { error: erro });
		});
});

module.exports = router;