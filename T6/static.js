/*
 * `static.js`
 *
 * Server module to handle static resources.
 *
 */

var fs  = require('fs');

// recursoEstatico: returns bool value indicating
// whether request is a static resource or not

function recursoEstatico (request)
{
    return  /\/w3.css$/.test(request.url)       ||
            /\/favicon.ico$/.test(request.url)  ||
            /\/student.png$/.test(request.url);
}

exports.recursoEstatico = recursoEstatico;

// sirvoRecursoEstatico: returns static request.

function sirvoRecursoEstatico (req, res)
{
    var partes  = req.url.split('/');
    var file    = partes[partes.length - 1];

    fs.readFile('public/' + file, (erro, dados) => {

        if (erro) {
            console.log('Erro: Ficheiro não encontrado (' + erro + ')');
            res.statusCode = 404;
            res.end();
        }
        else
        {
            res.end(dados);
        }

    });
}

exports.sirvoRecursoEstatico = sirvoRecursoEstatico;