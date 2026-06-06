var areaModel = require("../models/areaModel");

function listarArea(req, res) {
      var idUsuario = req.params.idUsuario
    areaModel.listarArea(idUsuario).then(function(resultado){
        res.status(200).json(resultado);
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    })
}

function listarLuz(req, res) {
      var idAreaPlantio = req.params.idAreaPlantio;
      var idHectare = req.params.idHectare;
    areaModel.listarLuz(idAreaPlantio, idHectare).then(function(resultado){
        // precisamos informar que o resultado voltará para o front-end como uma resposta em json
        res.status(200).json(resultado);
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    })
}

function buscarAlertas(req, res) {
    var idUsuario = req.params.idUsuario;
    var idFazenda = req.params.idFazenda;
    areaModel.buscarAlertas(idUsuario, idFazenda).then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    })
}

function criarAlerta(req, res) {
    var motivo  = req.params.motivo;
    var idHectare  = req.params.idHectare;

    areaModel.criarAlerta(motivo, idHectare).then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    })
}

function visualizarAlerta(req, res) {
    var idAlerta = req.params.idAlerta;

    areaModel.visualizarAlerta(idAlerta).then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    })
}


module.exports = {
    listarArea,
    listarLuz,
    buscarAlertas, 
    criarAlerta,
    visualizarAlerta
}
