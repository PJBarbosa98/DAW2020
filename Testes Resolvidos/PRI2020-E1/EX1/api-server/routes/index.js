var express = require('express');
var router = express.Router();

var pub = require('../controllers/pub');

router.get('/api/pubs', (req, res) => {
	if (!/\?.+/.test(req.url)) {
		pub
		.listar()
		.then(data => res.jsonp({ data: data }))
		.catch(err => res.status(500).jsonp({ error: err }));
	}
	else {
		console.log(req.query.type);
		if (req.query.type && !req.query.year) {
			pub
			.pub_por_tipo(req.query.type)
			.then(data => res.jsonp({ data: data }))
			.catch(err => res.status(500).jsonp({ error: err }));
		}
		else if (req.query.type && req.query.year) {
			pub
			.pub_por_tipo_e_ano(req.query.type, req.query.year)
			.then(data => res.jsonp({ data: data }))
			.catch(err => res.status(500).jsonp({ error: err }));
		}
		else if (!req.query.type && !req.query.year && req.query.autor) {
			pub
			.pubs_do_autor(req.query.autor)
			.then(data => res.jsonp({ data: data }))
			.catch(err => res.status(500).jsonp({ error: err }));
		}
	}
});

router.get('/api/pubs/:id', (req, res) => {
	pub
	.pub_por_id(req.params.id)
	.then(data => res.jsonp({ data: data }))
	.catch(err => res.status(500).jsonp({ error: err }));
});

router.get('/api/types', (req, res) => {
	pub
	.listar_tipos()
	.then(data => res.jsonp({ data: data }))
	.catch(err => res.status(500).jsonp({ error: err }));
});

router.get('/api/autores', (req, res) => {
	pub
	.listar_autores()
	.then(data => res.jsonp({ data: data }))
	.catch(err => res.status(500).jsonp({ error: err }));
});

module.exports = router;