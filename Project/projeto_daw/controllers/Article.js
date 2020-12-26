// Controller for Article

var Article 	= require('../models/Article');

// Count number of articles in the system.
module.exports.count = () => {
	return Article
		.countDocuments()
		.exec();
};

// Count number of articles by user e-mail.
module.exports.user_count = ( email ) => {
	return Article
		.find({ "author": email })
		.countDocuments()
		.exec();
};

// Fetch user articles via e-mail.
module.exports.fetch_articles = ( email ) => {
	return Article
		.find({ "author": email })
		.sort({ date: 1 })
		.exec();
}

// Insert article into database.
module.exports.insert = ( article ) => {
	var newArticle = new Article(article);
	return newArticle.save();
};