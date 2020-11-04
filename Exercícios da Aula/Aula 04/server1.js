var http 	= require('http')
var aux		= require('./mymod.js')

http.createServer(function (req, res) {
	res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
	res.write("<p>Hoje: " + aux.myDateTime() + "</p>")
	res.end('Olá ' + aux.turma + ' !')
}).listen(7777);

console.log('Servidor à escuta na porta 7777...')