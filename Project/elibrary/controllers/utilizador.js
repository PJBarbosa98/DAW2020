/* Controlador de Utilizador */

var Utilizador = require('../models/Utilizador');

// Insere um utilizador na base de dados
module.exports.insert = utilizador => {
	var novoUtilizador = new Utilizador(utilizador);
	return novoUtilizador.save();	
};
