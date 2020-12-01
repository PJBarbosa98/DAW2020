var express = require('express');
var router = express.Router();

var Student = require('../controllers/student');

// student model (for database insertion)
var StudentModel = require('../models/student');

// GET home page
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Root' });
});

// GET students' list
router.get('/students', function(req, res) {
	// retrieve data
	Student.list()
	.then(data => res.render('students', { list: data }))
	.catch(err => res.render('error', { error: err }));
});

// GET individual student's page
router.get(/\/students\/(A|PG)[0-9]+$/, function(req, res) {
	
	// retrieve student id
	let parts = req.url.split('/');
	let student_id = parts[parts.length-1];

	// retrieve student information given its id
	Student.lookUp(student_id)
	.then(data => res.render('student_page', { student_info: data }))
	.catch(err => res.render('error', { error: err }));
});

// GET student register page
router.get(/\/students\/register$/, function(req, res) {
	res.render('register');
});

// GET student's edit page
router.get(/\/students\/edit\/(A|PG)[0-9]+$/, function(req, res) {
	// fetch student id
	let parts = req.url.split('/');
	let student_id = parts[parts.length-1];

	// fetch student data via student id
	Student.lookUp(student_id)
	.then(data => res.render('student_edit', { student_info: data }))
	.catch(err => res.render('error', { error: err }));
});


// POST student information
// either from registration or update pages
router.post('/students', function(req, res) {

	// fetch POST information from request body
	let numero = req.body.numero;
	let nome = req.body.nome;
	let git = req.body.git;
	let tpc = req.body.tpc.split(',');

	for (let i = 0; i < tpc.length; ++i) {
		tpc[i] = parseInt(tpc[i]);
	}

	// check if tpc is valid
	// in case it is not, alter it to [ 0, 0, 0, 0, 0, 0, 0, 0 ]
	if (tpc.length != 8) {
		tpc = [ 0, 0, 0, 0, 0, 0, 0, 0 ];
	}

	// Create Student object
	let new_student = new StudentModel({
		numero: numero,
		nome: nome,
		git: git,
		tpc: tpc
	});

	// handle PUT request (student edition)
	if (req.body._method == 'PUT') {
		// update student information
		Student.delete(numero)
		.then(data => console.log('Removido registo antigo'))
		.catch(err => res.render('error', { error: err }));

		Student.update(new_student)
		.then(data => res.render('index', { title: 'Informação alterada!' }))
		.catch(err => res.render('error', { error: err }));	
	}

	// handle POST request (student registration)
	else {

		// add student to the database and redirect to a new page
		Student.insert(new_student)
		.then(data => res.render('index', { title: 'Inserção de aluno!' }))
		.catch(err => res.render('error', { error: err }));
	}
})

// GET student's delete page
router.get(/\/students\/delete\/(A|PG)[0-9]+$/, function(req, res) {
	
	// retrieve student id
	let parts = req.url.split('/');
	let student_id = parts[parts.length-1];
	
	Student.delete(student_id)
	.then(data => res.render('index', { title: 'Aluno removido!'}))
	.catch(err => res.render('error', { error: err }));
});

module.exports = router;