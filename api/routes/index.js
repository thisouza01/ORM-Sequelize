// Ponto de entrada de todas as rotas

const bodyParser = require('body-parser');
const pessoas = require('./pessoasRoute.js');
const turmas = require('./turmasRoute.js');
const niveis = require('./niveisRoute.js');


module.exports = app => {
    app.use(bodyParser.json())
    app.use(
        pessoas,
        turmas,
        niveis
        )

}