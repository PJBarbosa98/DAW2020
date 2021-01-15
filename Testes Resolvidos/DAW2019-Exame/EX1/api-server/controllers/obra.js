// controlador de 'obra'

var obra = require('../models/obra');

module.exports.listar = () => {
	return obra
		.find({}, { _id: 0, id: 1, titulo: 1, tipo: 1, compositor: 1 })
		.sort({ id: 1 })
		.exec();
};

module.exports.consultarID = ( mid ) => {
	return obra
		.find({ id: mid })
		.exec();
};

module.exports.compositores = () => {
	return obra
		.aggregate([ { $group: { _id: "$compositor" } } ])
		.sort({ _id: 1 })
		.exec();
};

module.exports.obra_por_compositor = () => {
	return obra
		.aggregate([
				{ $unwind: "$compositor" },
				{ $group: {
					_id: "$compositor",
					titulos: { $push: { titulo: "$titulo" } }
				} }
			])
		.sort({ _id: 1 })
		.exec();
};

module.exports.obra_por_instrumento = () => {
	return obra
		.find({}, { instrumentos: 1 })
		.exec();
};

module.exports.contar = () => {
	return obra
		.aggregate([
				{ $unwind: "$id" },
				{
					$project: {
						_id: 0,
						titulo: 1,
						total_partituras:
						{
							$cond:{ if: { $isArray: "$instrumentos" }, 
							then: { $size: "$instrumentos" }, else: "NA" }
						}
					}
				}
			])
		.exec();
};
