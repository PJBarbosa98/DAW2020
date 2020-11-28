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
}