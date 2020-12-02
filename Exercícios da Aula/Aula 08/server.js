var express = require('express');
var bodyParser = require('body-parser');
var templates = require('./html_templates');
var jsonfile = require('jsonfile');
var logger = require('morgan');
var fs = require('fs');

var multer = require('multer');
var upload = multer({ dest: "uploads/" });

var app = express();

// set logger
app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/', function (req, res) {
	var d = new Date().toISOString().substr(0, 16);
	var files = jsonfile.readFileSync('./dbFiles.json');
	res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
	res.write(templates.fileList(files, d));
	res.end();
});

app.get('/files/upload', function (req, res) {
	var d = new Date().toISOString().substr(0, 16);
	res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
	res.write(templates.fileForm(d));
	res.end();
});

app.get('/files/download/:fname', (req, res) => {
	res.download(__dirname + '/public/fileStore/' + req.params.fname);
});

app.post('/files', upload.single('myFile'), function (req, res) {
	// req.file is the ´myFile´ file
	// req.body will hold the text fields if any

	// multiple files: upload.array(...) => files is an array

	let oldPath = __dirname + '/' + req.file.path
	let newPath = __dirname + '/public/fileStore/' + req.file.originalname

	fs.rename(oldPath, newPath, function (err) {
		if (err) throw err;
	});

	var files = jsonfile.readFileSync('./dbFiles.json');
	var d = new Date().toISOString().substr(0, 16);
	files.push(
		{
			date: d,
			name: req.file.originalname,
			size: req.file.size,
			mimetype: req.file.mimetype,
			desc: req.body.desc
		}
	);
	jsonfile.writeFileSync('./dbFiles.json', files);
	
	res.redirect('/');
});

app.listen(7701, () => console.log('Server running @ port 7701...'));