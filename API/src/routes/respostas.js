var express = require("express");
var router = express.Router();

var respostasController = require("../controllers/respostasController");

router.post("/guardarRespostas", function(req, res){
   respostasController.guardarRespostas(req, res)
})

module.exports = router;