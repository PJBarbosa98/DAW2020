var express = require('express');
var bodyParser = require('body-parser');
var templates = require('./html_templates');
var jsonfile = require('jsonfile');
var logger = require('morgan');
var fs = require('fs');

var multer = require('multer');
var upload = multer({ dest: "uploads/" });

//var upload = multer({ dest: "uploads/" });

 
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

app.post('/files', upload.array('myFile'), function (req, res) {
	for (let idx = 0; idx < req.files.length; ++idx) {
        let oldPath = __dirname + '/' + req.files[idx].path;
        let newPath = __dirname + '/public/fileStore/' + req.files[idx].originalname;

        fs.rename(oldPath, newPath, function(err) {
        	if (err) throw err;
        });

        var files = jsonfile.readFileSync('./dbFiles.json');
        var d = new Date().toISOString().substr(0, 16);

        if (req.files.length > 1) {
        	var desc = req.body.desc[idx];
        } else {
        	var desc = req.body.desc;
        }

        files.push(
	        {
	        	date: d,
	        	name: req.files[idx].originalname,
	        	size: req.files[idx].size,
	        	mimetype: req.files[idx].mimetype,
	        	desc: desc
	        }
        );

        jsonfile.writeFileSync('./dbFiles.json', files);
	}

	res.redirect('/');
})

app.listen(7701, () => console.log('Server running @ port 7701...'));