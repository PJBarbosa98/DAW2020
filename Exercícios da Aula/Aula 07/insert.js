//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/DAW2020';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error...'));
db.once('open', function() {
    console.log("Conexão ao MongoDB realizada com sucesso...")
});

var studentSchema = new mongoose.Schema({
    numero: String,
    nome: String,
    git: String,
    tpc: [Number]
});

var studentModel = mongoose.model('student', studentSchema);

var data = [
	{
		numero: "A34900",
		nome: "Cecília Soares"
	},
	{
		numero: "PG42844",
		nome: "Maria Barbosa"
	}
];

studentModel.create(data);

console.log("That's all folks...");