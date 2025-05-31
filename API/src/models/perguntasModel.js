var database = require("../database/config");

function buscarPerguntas(req, res) {
    let comandoSQL = `SELECT id, pergunta FROM perguntas`;
    return database.executar(comandoSQL)
}

module.exports = {
     buscarPerguntas,
}   