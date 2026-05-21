var database = require("../database/config")


function listar(areaPlantil, hectare) {
    var instrucao = `
     SELECT * FROM vw_leitura_min_max_semanal
    WHERE idAreaPlantio = ${areaPlantil}
    AND idHectare = ${hectare}
    LIMIT 7;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}



module.exports = {
    listar
};