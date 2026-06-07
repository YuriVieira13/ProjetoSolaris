var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/listarHectare/:areaPlantio", function (req, res) {
  dashboardController.listarHectare(req, res);
});

router.get("/listarMeta/:idAreaPlantio", function (req, res) {
  dashboardController.listarMeta(req, res);
});

router.put("/mudarMeta/:idAreaPlantio", function (req, res) {
  dashboardController.mudarMeta(req, res);
});

router.get("/listarFuncionarios/:fkFazenda", function (req, res) {
  dashboardController.listarFuncionarios(req, res);
});

router.get("/periodo/", function (req, res) {
  dashboardController.periodo(req, res);
});

router.get("/ultimaMedicao/:idHectare", function (req, res) {
  dashboardController.ultimaMedicao(req, res);
});

router.delete("/deletarFuncionario/:idUsuario", function(req, res){
  dashboardController.deletarFuncionario(req, res);
});


module.exports = router;
