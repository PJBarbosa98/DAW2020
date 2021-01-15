var express = require('express');
var router = express.Router();

var obra = require('../controllers/obra');

router.get('/api/obras', (req, res) => {
	if ( !/\?.+/.test(req.url) )
	{
		obra.listar()
			.then(data => {
				res.jsonp({ data: data });
			})
			.catch(err => {
				res.status(500).jsonp({ error: err });
			});
	}
	else
	{
		if (req.query.by == 'compositor')
		{
			obra.obra_por_compositor()
				.then(data => {
					res.jsonp({ data: data });
				})
				.catch(err => {
					res.status(500).jsonp({ error: err });
				});
		}
		else if (req.query.by == 'instrumento')
		{
			obra.obra_por_instrumento()
				.then(data => {
					res.jsonp({ data: data });
				})
				.catch(err => {
					res.status(500).jsonp({ error: err });
				});
		}
	}
});

router.get('/api/obras/:id', (req, res) => {
	var parts = req.url.split('/');
	obra.consultarID(parts[parts.length-1])
		.then(data => {
			res.jsonp({ data: data });
		})
		.catch(err => {
			res.status(500).jsonp({ error: err });
		});
});

router.get('/api/compositores', (req, res) => {
	obra.compositores()
		.then(data => {
			res.jsonp({ data: data });
		})
		.catch(err => {
			res.status(500).jsonp({ error: err });
		});
});

router.get('/api/obrasQuant', (req, res) => {
	obra.contar()
		.then(data => {
			res.jsonp({ data: data });
		})
		.catch(err => {
			res.status(500).jsonp({ error: err });
		})
});


module.exports = router;
