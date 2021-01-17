var express = require('express');
var router = express.Router();

var obra = require('../controllers/obra');

router.get('/api/obras', (req, res) => {
	if ( !/\?.+/.test(req.url) )
	{
		obra.listar()
			.then(dados => res.jsonp({ dados: dados }))
			.catch(erro => res.status(500).jsonp({ erro: erro }));
	}
	else
	{
		if (req.query.compositor) {
			obra.obras_por_compositor(req.query.compositor)
				.then(dados => res.jsonp({ dados: dados }))
				.catch(erro => res.status(500).jsonp({ erro: erro }));
		}
		else if (req.query.instrumento) {
			obra.obras_por_instrumento(req.query.instrumento)
				.then(dados => res.jsonp({ dados: dados }))
				.catch(erro => res.status(500).jsonp({ erro: erro }));
		}
		else {
			res.status(404).jsonp({ erro: 'Rota não definida!' });
		}
	}
});

router.get('/api/obras/:id', (req, res) => {
	obra.obra_por_id(req.params.id)
		.then(dados => res.jsonp({ dados: dados }))
		.catch(erro => res.status(500).jsonp({ erro: erro }));
})

router.get('/api/tipos', (req, res) => {
	obra.listar_tipos()
		.then(dados => res.jsonp({ dados: dados }))
		.catch(erro => res.status(500).jsonp({ erro: erro }));
});

router.get('/api/obrasQuant', (req, res) => {
	obra.conta_partituras()
		.then(dados => res.jsonp({ dados: dados }))
		.catch(erro => res.status(500).jsonp({ erro: erro }));
});

router.get('*', (req, res) => {
	res.status(404).jsonp({ erro: 'Rota não definida!' });
})


module.exports = router;
