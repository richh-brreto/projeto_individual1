var database = require("../database/config");

function guardarRespostas(resposta, perguntaId) {
    let comandoSQL = `INSERT INTO respostas (fk_pergunta, resposta) values(${perguntaId}, '${resposta}')`;
    return database.executar(comandoSQL)
}

module.exports = {
     guardarRespostas,
}   