var perguntasModel = require("../models/perguntasModel");

function buscarPerguntas(req, res) {
    perguntasModel.buscarPerguntas()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send('Perguntas Não Encontradas!!')
            }
        })
        .catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao Encontrar Perguntas! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    buscarPerguntas
};