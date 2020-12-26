const mongoose 		= require('mongoose');

const ArticleSchema = new mongoose.Schema({
	title: {
		type: 		String,
		required: 	true
	},
	category: {
		type: 		String,
		required: 	true
	},
	author: {
		type: 		String,
		required: 	true
	},
	private: {
		type: 		String,
		required: 	true
	},
	tags: {
		type: 		[String],
		required: 	false
	},
	date: {
		type: 		Date,
		default: 	Date.now
	},
	deliverables: {
		type: 		[String] ,
		required: 	false
	}
});

const Article 		= mongoose.model('Article', ArticleSchema);

module.exports 		= Article;

const UserSchema 	= new mongoose.Schema({
	name: {
		type: 		String,
		required: 	true
	},
	email: {
		type: 		String,
		required: 	true
	},
	filiation: {
		type: 		String,
		required: 	false	
	},
	password: {
		type: 		String,
		required: 	true
	},
	date: {
		type: 		Date,
		default: 	Date.now
	}
});
