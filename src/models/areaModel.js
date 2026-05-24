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

function buscarAlertas(idUsuario, idFazenda) {
    var instrucao = `
    SELECT h.idHectare, l.ValorLeitura, ap.nome, faz.nome as nome_fazenda, alerta.descricao,
CASE 
	WHEN l.ValorLeitura < 800 THEN 'BAIXA LUMINOSIDADE'
    WHEN l.ValorLeitura > 1500 THEN 'ALTA LUMINOSIDADE'
    ELSE 'LUMINOSIDADE IDEAL'
    END AS 'Alerta'
FROM funcionario func
JOIN empresa e ON func.fkEmpresa = e.idEmpresa
JOIN fazenda faz ON faz.fkEmpresa = e.idEmpresa
JOIN areaplantio ap ON ap.fkFazenda = faz.idFazenda
JOIN hectare h ON h.fkAreaPlantio = ap.idAreaPlantio
JOIN sensor s ON s.fkHectare = h.idHectare
JOIN leitura l ON l.fkSensor = s.idSensor
JOIN alerta ON alerta.fkHectare = h.idHectare
WHERE func.idUsuario = ${idUsuario} AND faz.fkEmpresa = ${idFazenda};`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}



module.exports = {
    listar,
    buscarAlertas
};