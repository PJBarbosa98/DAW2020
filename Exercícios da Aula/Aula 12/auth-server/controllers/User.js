// Controlador para o modelo User

var User = require('../models/user');

// Devolve a lista de Users
module.exports.listar = () => {
	return User
		.find()
		.sort('username')
		.exec();
}

// Consulta um User, dado o seu username
module.exports.consultar = uname => {
	return User
		.findOne({ username: uname })
		.exec();
}

// Insere um User na BD
module.exports.inserir = u => {
	var novo = new User(u);
	return novo.save();
}

// Remove um utilizador da BD
module.exports.remover = uname => {
	return User.deleteOne({ username: uname });
}

// Altera um utilizador da BD
module.exports.alterar = u => {
	return User.findByIdAndUpdate({ username: u.username }, u, { new: true });
}