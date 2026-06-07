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

function listarFuncionarios(fkFazenda) {
  const instrucao = `
      SELECT
          idUsuario,
          nome,
          email,
          cargo
      FROM funcionario
      WHERE fkFazenda = ${fkFazenda};
  `;

  return database.executar(instrucao);
}

function deletarFuncionario(idUsuario){

  const instrucao = `
      DELETE FROM funcionario
      WHERE idUsuario = ${idUsuario};
  `;

  return database.executar(instrucao);
}

module.exports = {
  listar,
  listarMeta,
  mudarMeta,
  listarFuncionarios,
  deletarFuncionario
};
