var database = require("../database/config");

function listar(areaPlantio) {
  var instrucao = `
     SELECT * FROM vw_mapa_calor
     WHERE idAreaPlantio = ${areaPlantio}
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function listarMeta(idAreaPlantio) {
  var instrucao = `
    SELECT meta FROM areaPlantio
    WHERE idAreaPlantio = ${idAreaPlantio};
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function mudarMeta(idAreaPlantio, meta) {
  var instrucao = `
    UPDATE areaPlantio SET meta = ${meta}
    WHERE idAreaPlantio = ${idAreaPlantio};
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  listar,
  listarMeta,
  mudarMeta,
};
