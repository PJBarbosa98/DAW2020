// controlador para obra

var obra = require('../models/obra');

module.exports.listar = () => {
	return obra
		.find({}, { _id: 0, id: 1, titulo: 1, tipo: 1, compositor: 1 })
		.sort({ titulo: 1 })
		.exec();
};

module.exports.obra_por_id = ( oid ) => {
	return obra
		.find({ id: oid })
		.exec();
};

module.exports.listar_tipos = () => {
	return obra
		.aggregate([
				{ $group: { _id: "$tipo" } }
			])
		.sort({ _id: 1 })
		.exec();
};

module.exports.obras_por_compositor = ( compositor ) => {
	return obra
		.find(	{ compositor: compositor },
				{ _id: 0, id: 1, titulo: 1, tipo: 1, compositor: 1 })
		.sort({ titulo: 1 })
		.exec();
};

module.exports.obras_por_instrumento = ( instrumento ) => {
	return obra
		.aggregate([
				{ $unwind: "$instrumentos" },
				{ $group: {
					_id: "$instrumentos"
				} },
				{ $project: {
					designacao: { $eq: [ "$designacao", instrumento ] }
				} }
			])
		.exec();
};

module.exports.conta_partituras = () => {
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
