var express = require('express');
var router = express.Router();

var filme = require('../controllers/filme');

router.get('/api/filmes', (req, res) => {
	if ( !/\?.+/.test(req.url) )
	{
		filme.listar()
			.then(data => res.jsonp({ data: data }))
			.catch(err => res.status(500).jsonp({ error: err }));
	}
	else
	{
		if (req.query.by == 'ator')
		{
			filme.filme_por_ator()
				.then(data => res.jsonp({ data: data }))
				.catch(err => res.status(500).jsonp({ error: err }));
		}
		else if (req.query.by == 'genero')
		{
			filme.filme_por_categoria()
				.then(data => res.jsonp({ data: data }))
				.catch(err => res.status(500).jsonp({ error: err }));
		}
	}

});

router.get('/api/filmes/:id', (req, res) => {
	var partes = req.url.split('/');
	filme.filme_por_id(String(partes[partes.length-1]))
		.then(data => res.jsonp({ data: data }))
		.catch(err => res.status(500).jsonp({ error: err }));
});

router.get('/api/atores', (req, res) => {
	filme.atores()
		.then(data => res.jsonp({ data: data }))
		.catch(err => res.status(500).jsonp({ error: err }));
});

router.get('/api/filmesQuantAtor', (req, res) => {
	filme.quantos_atores()
		.then(data => res.jsonp({ data: data }))
		.catch(err => res.status(500).jsonp({ error: err }));
});

module.exports = router;
