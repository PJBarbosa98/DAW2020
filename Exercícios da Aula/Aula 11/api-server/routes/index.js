var express = require('express');
var router = express.Router();

function verificaAutorizacao (req, res, next) {
	if (req.user.level == 'admin')
		next();
	else
		res.status(401).jsonp(
			{ error: "Não tem nível de autorização para aceder a esta àrea!" }
		);
}

router.get('/infoSecreta', verificaAutorizacao, function(req, res, next) {
	res.status(200).jsonp({ dados: ["Cenoura", "Alface", "Tomate"] });
});

router.get('*', function(req, res, next) {
	res.status(200).jsonp({ dados: "Lista de qualquer coisa..." });
});


module.exports = router;

// Token exemplo:
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpjciIs
// ImxldmVsIjoiYWRtaW4iLCJleHBpcmVzSW4iOiIxZCIsImlhdCI6MTYwOTk0M
// zE0MX0.VXCkNkOegr1FRjzLZIZMLiFxboKAilVxwi7165thew0
