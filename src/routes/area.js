var express = require("express");
var router = express.Router();

var areaController = require("../controllers/areaController");


router.get("/listar/:areaPlantil/:hectare", function (req, res) {
    areaController.listar(req, res);
});

module.exports = router;