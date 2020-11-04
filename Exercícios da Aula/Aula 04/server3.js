var http	= require('http')
var url 	= require('url')
var aux 	= require('./mymod.js')

http.createServer(function (req, res) {
	console.log(req.method + ' ' + req.url + ' ' + aux.myDateTime())
	
	var parsed = url.parse(req.url, true)

	res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
	res.write('<p>Today: ' + aux.myDateTime() + '</p>')
	res.write('<pre>True:' + JSON.stringify(parsed.query) + '</pre>')

	var parsed2 = url.parse(req.url, false)
	res.write('<pre>False:' + JSON.stringify(parsed2.query) + '</pre>')

	var r = parseInt(parsed.query.a) + parseInt(parsed.query.b)
	res.write('Result: ' + parsed.query.a + ' + ' + parsed.query.b + ' = ' + r)

}).listen(7777);

console.log('Server started @ port 7777')

/**
 * run as, for e.g.,
 *
 * http://localhost:7777/somar?a=9&b=11
 */