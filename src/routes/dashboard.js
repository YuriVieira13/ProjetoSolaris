var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");


router.get("/listarHectare/:areaPlantio", function (req, res) {
    dashboardController.listarHectare(req, res);
});

module.exports = router;