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

module.exports = router;
