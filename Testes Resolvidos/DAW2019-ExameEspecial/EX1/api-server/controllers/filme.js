// controlador para filme

var filme = require('../models/filme');

module.exports.listar = () => {
	return filme
		.find({}, { _id: 0, title: 1, year: 1 })
		.sort({ title: 1 })
		.exec();
};

module.exports.filme_por_id = ( id ) => {
	return filme
		.find({ fid: id })
		.exec();
};

module.exports.atores = () => {
	return filme
		.aggregate([
				{ $unwind: "$cast" },
				{ $group: {
					_id: "$cast",
				}}
			])
		.sort({ _id: 1 })
		.exec();
};

module.exports.filme_por_ator = () => {
	return filme
		.aggregate([
				{ $unwind: "$cast" },
				{ $group: {
					_id: "$cast",
					titulos: { $push: { titulo: "$title" } }
				} }
			])
		.sort({ _id: 1 })
		.exec();
};

module.exports.filme_por_categoria = () => {
	return filme
		.aggregate([
				{ $unwind: "$genres" },
				{ $group: {
					_id: "$genres",
					titulos: { $push: { titulo: "$title" } }
				} }
			])
		.sort({ _id: 1 })
		.exec();
};

module.exports.quantos_atores = () => {
	return filme
		.aggregate([
				{ $unwind: "$cast" },
				{
					$project: {
						_id: 0,
						title: 1,
						number_of_actors:
						{
							$cond: { if: { $isArray: "$cast" },
							then: { $size: "$cast" }, else: "None" }
						}
					}
				}
			])
		.sort({ title: 1 })
		.exec();
};