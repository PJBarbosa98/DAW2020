/* Modelo de Utilizador */

var mongoose = require('mongoose');

var utilizadorSchema = new mongoose.Schema({
	nome: String,
	email: String,
	filiacao: String,
	nivel: String,
	password: String,
	dataRegisto: String,
	dataUltimoAcesso: String
});

module.exports = mongoose.model('user', utilizadorSchema);