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
          f.idUsuario,
          f.nome,
          f.email,
          f.cargo
      FROM funcionario AS f
      JOIN funcionarioFazenda AS FunFazenda ON f.idUsuario = FunFazenda.fkFuncionario
      JOIN fazenda AS Fazen ON Fazen.idFazenda = FunFazenda.fkFazenda
      WHERE fkFazenda = ${fkFazenda};
  `;

    return database.executar(instrucao);
}

function deletarFuncionario(idUsuario) {
    const instrucao = `
   DELETE FROM funcionario WHERE idUsuario = ${idUsuario};
  `;

    return database.executar(instrucao);
}

function deletarFuncionarioFk(idUsuario) {
  const instrucao = `
  DELETE FROM funcionarioFazenda WHERE fkFuncionario = ${idUsuario};
`;

  return database.executar(instrucao);
}

function periodo() {
    const instrucao = `
      SELECT 
        DATE_FORMAT(NOW() - INTERVAL 6 DAY, '%d/%m') as comeco,
        DATE_FORMAT(NOW(), '%d/%m') as fim;`;

    return database.executar(instrucao);
}

function ultimaMedicao(idHectare) {
    var instrucao = `
    SELECT 
        ValorLeitura as valor,
        DATE_FORMAT(dataHora, '%d/%m/%Y %H:%i') as data
    FROM leitura l
    JOIN sensor s
        ON l.fkSensor = s.idSensor
    WHERE fkHectare = ${idHectare}
    ORDER BY dataHora DESC
    LIMIT 1;`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listar,
    listarMeta,
    mudarMeta,
    listarFuncionarios,
    deletarFuncionario,
    periodo,
    ultimaMedicao,
    deletarFuncionarioFk,
};
