// modelo para obra

var mongoose = require('mongoose');

var obraSchema = new mongoose.Schema({
	id: String,
	titulo: String,
	tipo: String,
	compositor: String,
	infrelacionada: { video: { href: String } },
	arranjo: String,
	instrumentos: [{
		designação: String,
		partitura: { path: String, type: String },
		afinacao: String,
		clave: String
	}]
});

module.exports = mongoose.model('obra', obraSchema);