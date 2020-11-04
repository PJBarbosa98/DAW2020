var http 	= require('http')
var aux		= require('./mymod.js')

http.createServer(function (req, res) {
	console.log(req.method + " " + req.url + " " + aux.myDateTime())

	res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
	res.write("<p>Hoje: " + aux.myDateTime() + "</p>")
	res.write("<pre>" + req.method + "</pre>")
	res.write("<pre>" + req.url + "</pre>")

}).listen(7777);

console.log('Servidor à escuta na porta 7777...')