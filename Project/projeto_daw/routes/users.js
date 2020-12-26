const express 	= require('express');
const router 	= express.Router();
const bcrypt 	= require('bcryptjs');
const passport 	= require('passport');
const fs 		= require('fs');

// User model
const User 			= require('../models/User');

// Article controller
var Article 		= require('../controllers/Article');
// Article model
var ArticleModel 	= require('../models/Article');

// File Upload
const multer 	= require('multer');
const upload 	= multer({ dest: "uploads/" });

// Login Page
router.get('/login', (req, res) => res.render('login'));

// Register Page
router.get('/register', (req, res) => res.render('register'));

// Register Handle
router.post('/register', (req, res) => {
	const { name, email, filiation, password, password2 } = req.body;
	let errors = [];

	// Check required fields
	if (!name || !email || !password || !password2) {
		errors.push({ msg: 'Please fill in all fields!'});
	}

	// Check passwords match
	if (password != password2) {
		errors.push({ msg: 'Passwords do not match!' });
	}

	// Check password length
	if (password.length < 6) {
		errors.push({ msg: 'Password should be at least 6 characters!' });
	}

	if (errors.length > 0) {
		res.render('register', {
			errors,
			name,
			email,
			password,
			password2
		});
	} else {
		// Validation passed
		User.findOne({ email: email })
			.then(user => {
				if (user) {
					// User exists
					errors.push({ msg: 'Email is already registered!'});
					res.render('register', {
						errors,
						name,
						email,
						filiation,
						password,
						password2
					});
				} else {
					const newUser = new User({
						name,
						email,
						filiation,
						password
					});

					// Hash Password
					bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt,
						(err, hash) => {
							if (err) throw err;
							// Set password to hashed
							newUser.password = hash;
							// Save user
							newUser.save()
								.then(user => {
									req.flash('success_msg', 'You are now registered!');
									res.redirect('/users/login');
								})
								.catch(err => console.log(err));
						}));
				}
			})
			.catch();
	}
});

// Login handle
router.post('/login', (req, res, next) => {
	passport.authenticate('local', {
		successRedirect: '/dashboard',
		failureRedirect: '/users/login',
		failureFlash: true
	}) (req, res, next);
});

// Logout handle
router.get('/logout', (req, res) => {
	req.logout();
	req.flash('success_msg', 'Logged out!');
	res.redirect('/users/login');
});

// New article form
router.get('/new', (req, res) => {
	res.render('new_article_form', {
		name: req.user.name
	});
});

// Post article handle
router.post('/articles', upload.array('deliverables'), (req, res) => {

	var title 			= req.body.title;
	var category 		= req.body.category;
	var author 			= req.user.email;
	var private 		= req.body.private;
	var tags 			= req.body.tags.split(',');
	var date 			= req.body.date;
	var deliverables 	= [];

	let errors 			= [];

	// Check all fields are filled (except date)

	if (!title || !category || !private || !tags) {
		errors.push({ msg: 'Please fill in all fields!'});
	}

	// Default date to date of submission (if not filled in)
	if (!date) {
		date = String(new Date().toISOString().substr(0, 10));
	}

	// In case there are any errors...
	if (errors.length > 0) {
		res.render('new_article_form', {
			name: req.user.name,
			errors
		});
	}

	// Otherwise...
	else {

		for (let idx = 0; idx < req.files.length; ++idx) {

			// One folder per author

			let oldPath = __dirname + '/../' + req.files[idx].path;
			let newPath = __dirname + '/../fileStore/' + author + '/' + req.files[idx].originalname;

			let fileDir = __dirname + '/../fileStore/' + author + '/';

			if (!fs.existsSync(fileDir)) {

				fs.mkdir(fileDir, { recursive: true }, (err) => {
					if (err)
						throw err;
				});
			}

			// to do : check if file already exists
			// if it does, do not upload

			fs.rename(oldPath, newPath, function(err) {
				if (err)
					throw err;
			});

			// Add deliverable to deliverables
			deliverables.push(req.files[idx].originalname);
		}

		let newArticle = new ArticleModel({
			title,
			category,
			author,
			private,
			tags,
			date,
			deliverables
		});

		// Insert article information into database
		Article.insert(newArticle)
			.then( ()  => res.redirect('/dashboard'))
			.catch(err => res.render(err));
	}

});

module.exports 	= router;