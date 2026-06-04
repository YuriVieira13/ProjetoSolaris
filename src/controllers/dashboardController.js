var dashboardModel = require("../models/dashboardModel");

function listarHectare(req, res) {
  var areaPlantio = req.params.areaPlantio;
  dashboardModel
    .listar(areaPlantio)
    .then(function (resultado) {
      res.status(200).json(resultado);
    })
    .catch(function (erro) {
      res.status(500).json(erro.sqlMessage);
    });
}

function listarMeta(req, res) {
  var idAreaPlantio = req.params.idAreaPlantio;
  dashboardModel
    .listarMeta(idAreaPlantio)
    .then(function (resultado) {
      res.status(200).json(resultado);
    })
    .catch(function (erro) {
      res.status(500).json(erro.sqlMessage);
    });
}

function mudarMeta(req, res) {
  var idAreaPlantio = req.params.idAreaPlantio;
  var meta = req.body.meta;
  dashboardModel
    .mudarMeta(idAreaPlantio, meta)
    .then(function (resultado) {
      res.status(200).json(resultado);
    })
    .catch(function (erro) {
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  listarHectare,
  listarMeta,
  mudarMeta,
};
