var respostasModel = require("../models/respostasModel");

function guardarRespostas(req, res) {
    const { resposta, indiceAtual } = req.body;
    respostasModel.guardarRespostas(resposta, indiceAtual).then(
        function (resultado) {
            res.json(resultado)
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao salvawr o quiz! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        }
    )
}

module.exports = {
    guardarRespostas
}