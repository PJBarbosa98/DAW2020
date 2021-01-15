// modelo para filme

var mongoose = require('mongoose');

var filmeSchema = new mongoose.Schema({
	title: String,
	year: String,
	cast: [ String ],
	genres: [ String ],
	fid: String
});

module.exports = mongoose.model('filme', filmeSchema);