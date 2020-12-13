var express = require('express');
var router = express.Router();

var Utilizador = require('../controllers/Utilizador');
var UtilizadorModel = require('../models/Utilizador');

/* GET Home Page */
router.get('/', function (req, res) {
	res.render('index', { title: 'e-Library - Bem-Vindo(a)' });
});

/* GET Página de Registo */
router.get('/registo', function (req, res) {
	res.render('registo', { title: 'e-Library - Página de Registo' });
})

router.post('/', function (req, res) {

	let nome = req.body['nome'];
	let email = req.body['email'];
	let filiacao = req.body['filiacao'];
	let nivel = req.body['nivel'];
	let password = req.body['password'];

	var d = new Date();

	let dataRegisto = d.toISOString().substr(0, 10);
	let dataUltimoAcesso = d.toISOString().substr(0, 10);

	let novoUtilizador = new UtilizadorModel({
		nome: nome,
		email: email,
		filiacao: filiacao,
		nivel: nivel,
		password: password,
		dataRegisto: dataRegisto,
		dataUltimoAcesso: dataUltimoAcesso
	});

	// Insere utlizador na base de dados e redireciona para a página de sucesso
	Utilizador.insert(novoUtilizador)
	.then(data => res.render('registo_sucesso', { title: 'e-Library - Utilizador Criado' }))
	.catch(err => res.render('error', { error: err }));
});


module.exports = router;
