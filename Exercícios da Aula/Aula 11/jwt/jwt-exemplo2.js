// Exemplo: Criar e descodificar um token com chaves RSA

// Gerar as chaves:
// openssl genrsa -out mykey.pem 4096
// openssl rsa -in mykey.pem -pubout -out pubkey.pem

var fs 			= require('fs');
var jwt 		= require('jsonwebtoken');
var privateKey 	= fs.readFileSync('mykey.pem');

var token 		= jwt.sign({
					username: 'jcr' }, 
					privateKey, { algorithm: 'RS256' }
				);

console.log('\nToken: ' + token + '\n\n');

fs.readFile('pubkey.pem', function (e, publicKey) {
	jwt.verify(token, publicKey, { algorithms: ['RS256'] }, function (e, decoded) {
		if (e) console.log('Erro: ' + e);
		else console.log('Dados: ' + JSON.stringify(decoded) + '\n');
	});
});