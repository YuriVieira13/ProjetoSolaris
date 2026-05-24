var dashboardModel = require("../models/dashboardModel");

function listarHectare(req, res) {
      var areaPlantio = req.params.areaPlantio;
    dashboardModel.listar(areaPlantio).then(function(resultado){
        res.status(200).json(resultado);
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    })
}

module.exports = {
    listarHectare,
}
