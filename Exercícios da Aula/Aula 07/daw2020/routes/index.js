var express = require('express');
var router = express.Router();

var Student = require('../controllers/student')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// GET /students 
router.get('/students', function(req, res) {
  // data retrieval from database
  Student.list()
  .then(data => {
  	res.render('students', { list: data });
  })
  .catch(err => {
  	res.render('error', { error: err });
  })

});

module.exports = router;
