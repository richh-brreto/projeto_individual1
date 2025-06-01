var express = require("express");
var router = express.Router();

var respostasController = require("../controllers/respostasController");

router.post("/guardarRespostas", function (req, res) {
   respostasController.guardarRespostas(req, res)
})

router.get("/puxarRespostas/:idUsuario",
   respostasController.puxarRespostas);

router.get("/puxarTodasRespostasComPergunta",
   respostasController.puxarTodasRespostasComPergunta);

module.exports = router;