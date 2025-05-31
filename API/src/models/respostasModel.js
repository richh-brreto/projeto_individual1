var database = require("../database/config");

function guardarRespostas(resposta, indiceAtual) {
        let comandoSQL = `INSERT INTO respostas (fk_pergunta, resposta) values(${indiceAtual + 1}, '${resposta}')`;
        return database.executar(comandoSQL)
};

module.exports = {
    guardarRespostas,
}   