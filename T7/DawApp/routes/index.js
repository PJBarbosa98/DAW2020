var express = require('express');
var router = express.Router();

var Student = require('../controllers/student');

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


module.exports = router;
