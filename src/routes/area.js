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

router.put("/visualizarAlerta/:idAlerta", function (req, res) {
    areaController.visualizarAlerta(req, res);
});

router.get("/listarFazendas/:idUsuario", function (req, res) {
    areaController.listarFazendas(req, res);
});

router.get("/listarAreaPorFazenda/:idFazenda", function (req, res) {
    areaController.listarAreaPorFazenda(req, res);
});

module.exports = router;