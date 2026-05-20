var areaModel = require("../models/areaModel");

function listar(req, res) {
      var areaPlantil = req.params.areaPlantil;
      var hectare = req.params.hectare;
    areaModel.listar(areaPlantil, hectare).then(function(resultado){
        // precisamos informar que o resultado voltará para o front-end como uma resposta em json
        res.status(200).json(resultado);
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    })
}


module.exports = {
    listar
}
