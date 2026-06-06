var database = require("../database/config")

function listarArea(idUsuario) {
    var instrucao = `
    SELECT a.idAreaPlantio FROM fazenda fa
    JOIN areaPlantio a
        ON a.fkFazenda = fa.idFazenda
    JOIN funcionario fu
        ON fu.fkFazenda = fa.idFazenda
    WHERE fu.idUsuario = ${idUsuario};
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarLuz(idAreaPlantio, idHectare) {
    var instrucao = `
     SELECT * FROM vw_leitura_min_max_semanal
    WHERE idAreaPlantio = ${idAreaPlantio}
    AND idHectare = ${idHectare}
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

function criarAlerta(motivo, idHectare) {
    var instrucao = `INSERT INTO alerta (situacao, dtAlerta, visto, fkHectare)
    VALUES (${motivo}, DEFAULT, 0, ${idHectare});`
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
} 

function visualizarAlerta(idAlerta) {
    var instrucao = `UPDATE alerta SET visto = 1 WHERE idAlerta = ${idAlerta};`
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listarArea,
    listarLuz,
    buscarAlertas,
    criarAlerta,
    visualizarAlerta
};