// student controller

var Student = require('../models/student');

// returns student list
module.exports.list = () => {
	return Student
		.find()
		.sort({ nome: 1 })
		.exec();
};

// fetch student given identifier
module.exports.lookUp = id => {
	return Student
		.findOne({ numero: id })
		.exec();
};

// insert a student record
module.exports.insert = student => {
	var newStudent = new Student(student);
	return newStudent.save();
};

// delete a student record
module.exports.delete = id => {
	return Student
		.deleteOne({ numero: id })
		.exec();
}

// update a student record
module.exports.update = student => {
	var upsertData = student.toObject();
	// TO DO: remove with function to remove
	delete upsertData._id;
	return Student.update({_id: student._id}, upsertData, { upsert: true })
		.exec();
};