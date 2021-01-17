// controlador para pub

var pub = require('../models/pub');

module.exports.listar = () => {
	return pub
		.find({}, { _id: 0, id: 1, title: 1, year: 1, type: 1 })
		.sort({ year: 1 })
		.exec();
};

module.exports.pub_por_id = ( pid ) => {
	return pub
		.find({ id: pid })
		.exec();
};

module.exports.listar_tipos = () => {
	return pub
		.aggregate([
				{ $group: { _id: "$type" } }
			])
		.sort({ _id: 1 })
		.exec();
};

module.exports.pub_por_tipo = ( tipo ) => {
	return pub
		.find({ type: tipo }, { _id: 0, id: 1, title: 1, year: 1, type: 1 })
		.sort({ year: 1 })
		.exec();
};

module.exports.pub_por_tipo_e_ano = ( tipo, ano ) => {
	return pub
		.find(
			{ type: tipo, year: { $gt: ano } },
			{ _id: 0, id: 1, title: 1, year: 1, type: 1 }
		)
		.sort({ year: 1 })
		.exec();
};

module.exports.listar_autores = () => {
	return pub
		.distinct("authors")
		.sort()
		.exec();
};

module.exports.pubs_do_autor = ( autor ) => {
	return pub
		.aggregate([
				{ $unwind: "$authors" },
				{ $match: { "authors": autor } }
			])
		.sort({ year: 1 })
		.exec();
};