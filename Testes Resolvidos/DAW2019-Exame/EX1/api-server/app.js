var createError = require('http-errors');
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

// ligação à base de dados
const db = 'mongodb://127.0.0.1/ExameDAW';
mongoose.connect(db, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => console.log('Conexão ao MongoDb establecida...'))
	.catch(e => console.log(e));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).jsonp({ error: err });
});

module.exports = app;