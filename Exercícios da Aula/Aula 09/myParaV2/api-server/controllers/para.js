/* Paragraph Controller */

var mongoose = require('mongoose');
var Paragraph = require('../models/para');

// Returns para list
module.exports.list = function()
{
	return Paragraph.find().exec();
};

// Returns a paragraph record
module.exports.lookUp = function (id)
{
	return Paragraph.findOne({ _id: id }).exec();
};

// Inserts a new paragraph
module.exports.insert = function (p)
{
	console.log(JSON.stringify(p));

	var newParagraph = new Paragraph(p);
	return newParagraph.save();
};

// Removes one paragraph
module.exports.remove = function (id)
{
	return Paragraph.deleteOne({ _id: id });
};

// Edit one paragraph
module.exports.edit = function (id, p)
{
	return Paragraph.findByIdAndUpdate(id, p, { new: true });
};