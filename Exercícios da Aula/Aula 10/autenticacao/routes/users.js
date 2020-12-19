var express = require('express');
var router = express.Router();

var passport = require('passport');


/* GET Login Page */
router.get('/login', function (req, res) {
	console.log('Na callback do GET Login...');
	console.log(req.sessionID);
	res.render('login-form');
});

/* GET Logout Page */
router.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});

// Access via /users/login (check `app.js`) [ @ app.use('/users', usersRouter); ]
router.post('/login', passport.authenticate('local'), function (req, res) {
	//console.log('Na callback do POST Login...');
	//console.log('Do form: ' + JSON.stringify(req.body));
	console.log('Do passport: ' + JSON.stringify(req.user));
	res.redirect('/protegida');
});


module.exports = router;
