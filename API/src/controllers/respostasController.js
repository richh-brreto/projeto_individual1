var respostasModel = require("../models/respostasModel");

function guardarRespostas(req, res) {
    const { resposta, indiceAtual, idUsuario } = req.body;
    console.log('Dados recebidos:', resposta, indiceAtual, idUsuario);
    respostasModel.guardarRespostas(resposta, indiceAtual, idUsuario).then(
        function (resultado) {
            res.json(resultado)
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao salvar o quiz! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        }
    )
}

module.exports = {
    guardarRespostas
}