var http 	= require('http')
var fs 		= require('fs')

var aux	 	= require('./mymod.js')

http.createServer(function (req, res) {

	console.log(req.method + ' ' + req.url + ' ' + aux.myDateTime())

	if (req.url.match(/\/[1-3]$/))
	{
		var num = req.url.split('/')[req.url.length - 1]

		fs.readFile('pag' + num + '.html', function (err, data) {
			res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
			res.write(data)
			res.end()
		})
	}
	else
	{
		res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
		res.write('<p>URL not expected</p>')
		res.end()
	}

}).listen(7777)

console.log('Server started @ port 7777')

/**
 * to open page 2:
 *
 * http://localhost:7777/2
 */