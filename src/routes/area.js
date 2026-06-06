var express = require("express");
var router = express.Router();

var areaController = require("../controllers/areaController");


router.get("/listarArea/:idUsuario", function (req, res) {
    areaController.listarArea(req, res);
});

router.get("/listarLuz/:idAreaPlantio/:idHectare", function (req, res) {
    areaController.listarLuz(req, res);
});

router.get("/buscarAlertas/:idUsuario/:idFazenda", function (req, res) {
    areaController.buscarAlertas(req, res);
});

router.post("/criarAlerta/:motivo/:idHectare", function (req, res) {
    areaController.criarAlerta(req, res);
})

module.exports = router;