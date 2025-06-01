var database = require("../database/config");

function guardarRespostas(resposta, indiceAtual, idUsuario) {
    let comandoSQL = `INSERT INTO respostas (fk_pergunta, resposta, fk_usuario) values(${indiceAtual + 1}, '${resposta}', ${idUsuario})`;
    return database.executar(comandoSQL)
};

function puxarRespostas(idUsuario) {
    let comandoSQL = `SELECT resposta FROM respostas WHERE fk_usuario = ${idUsuario}`;
    return database.executar(comandoSQL);
}

function puxarTodasRespostasComPergunta() {
    let comandoSQL = `
        SELECT fk_pergunta, resposta FROM respostas
    `;
    return database.executar(comandoSQL);
}

module.exports = {
    guardarRespostas,
    puxarRespostas,
    puxarTodasRespostasComPergunta
}