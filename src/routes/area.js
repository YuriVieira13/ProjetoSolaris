var express = require("express");
var router = express.Router();

var areaController = require("../controllers/areaController");


router.get("/listar/:areaPlantil/:hectare", function (req, res) {
    areaController.listar(req, res);
});

router.get("/buscarAlertas/:idUsuario/:idFazenda", function (req, res) {
    areaController.buscarAlertas(req, res);
});

module.exports = router;