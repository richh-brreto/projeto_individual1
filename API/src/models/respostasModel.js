var database = require("../database/config");

function guardarRespostas(resposta, indiceAtual, idUsuario) {
        let comandoSQL = `INSERT INTO respostas (fk_pergunta, resposta, fk_usuario) values(${indiceAtual + 1}, '${resposta}', ${idUsuario})`;
        return database.executar(comandoSQL)
};

module.exports = {
    guardarRespostas,
}   