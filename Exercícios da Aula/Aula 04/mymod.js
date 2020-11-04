exports.myDateTime = function()  {
	var d = new Date()
	return d.toISOString().substring(0, 16)
}

exports.turma = "DAW 2020"

exports.myName = function() {
	return "José Carlos Ramalho"
}