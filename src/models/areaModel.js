var database = require("../database/config");

function listarArea(idUsuario) {
    var instrucao = `
    SELECT a.idAreaPlantio FROM fazenda fa
    JOIN areaPlantio a
        ON a.fkFazenda = fa.idFazenda
    JOIN funcionario fu
        ON fu.fkFazenda = fa.idFazenda
    WHERE fu.idUsuario = ${idUsuario};
    `;
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
    SELECT alerta.idAlerta, h.idHectare, ap.nome, faz.nome as nome_fazenda, alerta.situacao, alerta.idAlerta, alerta.visto
    FROM funcionario func
    JOIN fazenda faz ON func.fkFazenda = faz.idFazenda
    JOIN empresa e ON faz.fkEmpresa = e.idEmpresa
    JOIN areaplantio ap ON ap.fkFazenda = faz.idFazenda
    JOIN hectare h ON h.fkAreaPlantio = ap.idAreaPlantio
    JOIN sensor s ON s.fkHectare = h.idHectare
    JOIN alerta ON alerta.fkHectare = h.idHectare
    WHERE func.idUsuario = ${idUsuario} AND faz.idFazenda = ${idFazenda} AND alerta.visto = 0;`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function criarAlerta(motivo, idHectare) {
    var instrucao = `INSERT INTO alerta (situacao, dtAlerta, visto, fkHectare)
    VALUES (${motivo}, DEFAULT, 0, ${idHectare});`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function visualizarAlerta(idAlerta) {
    var instrucao = `UPDATE alerta SET visto = 1 WHERE idAlerta = ${idAlerta};`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarFazendas(idUsuario) {
    var instrucao = `
SELECT 
    f.idFazenda,
    f.nome,
    f.cib,
    f.area,
    e.cidade,
    e.uf,
    e.estrada,
    e.km
FROM fazenda f
JOIN funcionario func
    ON func.fkFazenda = f.idFazenda
JOIN endereco e
    ON f.fkEndereco = e.idEndereco
WHERE func.idUsuario = ${idUsuario};`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarAreaPorFazenda(idFazenda) {
    var instrucao = `
    SELECT idAreaPlantio, nome FROM areaplantio
    WHERE fkFazenda" = ${idFazenda};`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function filtrarData(idAreaPlantio,DataFormatada) {
    var instrucao = `
SELECT 
    ap.idAreaPlantio,
    h.idHectare,
    ROUND(AVG(t.Valor_Maximo)) AS Media_Maxima,
    ROUND(AVG(t.Valor_Minimo)) AS Media_Minima
FROM areaplantio ap
JOIN hectare h
    ON h.fkAreaPlantio = ap.idAreaPlantio
JOIN sensor s
    ON s.fkHectare = h.idHectare
JOIN leitura l
    ON l.fkSensor = s.idSensor
JOIN (
  
    SELECT 
        s.fkHectare,
        DATE(l.dataHora) AS Dia,
        MAX(l.valorLeitura) AS Valor_Maximo,
        MIN(l.valorLeitura) AS Valor_Minimo
    FROM leitura l
    JOIN sensor s
        ON s.idSensor = l.fkSensor
    WHERE l.dataHora BETWEEN '${DataFormatada}' AND '${DataFormatada}' + INTERVAL 7 DAY
    GROUP BY s.fkHectare, DATE(l.dataHora)
) t
    ON t.fkHectare = h.idHectare AND t.Dia = DATE(l.dataHora) 
WHERE l.dataHora BETWEEN '${DataFormatada}' AND '${DataFormatada}' + INTERVAL 7 DAY AND  ap.idAreaPlantio = '${idAreaPlantio}'
GROUP BY
    ap.idAreaPlantio,
    h.idHectare;
    
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listarArea,
    listarLuz,
    buscarAlertas,
    criarAlerta,
    visualizarAlerta,
    listarFazendas,
    listarAreaPorFazenda,
    filtrarData
};
