var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

var users = [
	{
		username: 	'jcr',
		level: 		'admin',
		passwd: 	'123'
	},
	{
		username: 	'asdrubal',
		level: 		'editor',
		passwd: 	'456'
	}
];

router.post('/', function (req, res) {
	if (req.body.username) {
		var u = users.find(element => element.username == req.body.username);
		if (u && u.passwd == req.body.passwd) {
			jwt.sign({ username: u.username, level: u.level }, 'DAW2020',
				function (e, tokenGerado) {
					if (e)
						res.status(500).jsonp({ error: e });
					else
						res.status(201).jsonp({ token: tokenGerado });
				});
		}
		else {
			res.status(401).jsonp({ error: 'Utilizador Inexistente!' });
		}
	}
});

module.exports = router;
