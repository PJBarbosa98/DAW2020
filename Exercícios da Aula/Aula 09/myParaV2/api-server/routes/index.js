var express = require('express');
var router = express.Router();

var Paragraph = require('../controllers/para');

/* List all paragraphs */
router.get('/paras', function(req, res) {
	Paragraph.list()
	.then(data => {
		res.status(200).jsonp(data);
	})
	.catch(err => {
		res.status(500).jsonp(err);
	})
});

/* Insert new paragraph */
router.post('/paras', function(req, res) {
	Paragraph.insert(req.body)
	.then(data => {
		res.status(201).jsonp(data);
	})
	.catch(err => {
		res.status(500).jsonp(err);
	})
});

/* Delete a paragraph */
router.delete('/paras/:id', function(req, res) {
	Paragraph.remove(req.params.id)
	.then(data => {
		res.status(200).jsonp(data);
	})
	.catch(err => {
		res.status(500).jsonp(err);
	})
});

/* Edit a paragraph */
router.put('/paras/:id', function(req, res) {
	Paragraph.edit(req.params.id, req.body)
	.then(data => {
		res.status(200).jsonp(data);
	})
	.catch(err => {
		res.status(500).jsonp(err);
	})
});

module.exports = router;
