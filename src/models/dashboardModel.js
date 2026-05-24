var database = require("../database/config")


function listar(areaPlantio) {
    var instrucao = `
     SELECT * FROM vw_mapa_calor
     WHERE idAreaPlantio = ${areaPlantio}
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listar,
};