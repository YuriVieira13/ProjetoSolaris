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

function periodo(req, res) {
  dashboardModel
    .periodo()
    .then(function (resultado) {
      res.status(200).json(resultado);
    })
    .catch(function (erro) {
      res.status(500).json(erro.sqlMessage);
    });
}

function listarFuncionarios(req, res) {
  const fkFazenda = req.params.fkFazenda;

  dashboardModel
    .listarFuncionarios(fkFazenda)
    .then((resultado) => {
      res.status(200).json(resultado);
    })
    .catch((erro) => {
      console.log(erro);
      res.status(500).json(erro);
    });
}

function deletarFuncionario(req, res) {
  const idUsuario = req.params.idUsuario;

  dashboardModel
    .deletarFuncionario(idUsuario)
    .then((resultado) => {
      res.status(200).json(resultado);
    })
    .catch((erro) => {
      console.log(erro);
      res.status(500).json(erro);
    });
}

function ultimaMedicao(req, res) {
  const idHectare = req.params.idHectare;

  dashboardModel
    .ultimaMedicao(idHectare)
    .then((resultado) => {
      res.status(200).json(resultado);
    })
    .catch((erro) => {
      console.log(erro);
      res.status(500).json(erro);
    });
}

module.exports = {
  listarHectare,
  listarMeta,
  mudarMeta,
  listarFuncionarios,
  deletarFuncionario,
  periodo,
  ultimaMedicao,
};
