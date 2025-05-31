var express = require("express");
var router = express.Router();

var perguntasController = require("../controllers/perguntasController");

router.get("/buscarPerguntas", function(req, res){
   perguntasController.buscarPerguntas(req, res)
})

module.exports = router;