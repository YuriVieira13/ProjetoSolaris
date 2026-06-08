CREATE DATABASE solaris;
USE solaris;

CREATE TABLE empresa (
  idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(50) NOT NULL,
  cnpj CHAR(14),
  cpf CHAR(11),
  dtCadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (cnpj),
  UNIQUE (cpf)
);

CREATE TABLE endereco (
  idEndereco INT PRIMARY KEY AUTO_INCREMENT,
  erd CHAR(11),
  estrada VARCHAR(40),
  km VARCHAR(8),
  bairro VARCHAR(30),
  cidade VARCHAR(40),
  uf CHAR(2),
  cep CHAR(8) NOT NULL,
  ptReferencia VARCHAR(60)
);

CREATE TABLE fazenda (
  idFazenda INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(40),
  cib CHAR(8),
  area DECIMAL(7,2),
  fkEmpresa INT,
  fkEndereco INT,
  imagem VARCHAR(255),
  UNIQUE (fkEndereco),
  FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
  FOREIGN KEY (fkEndereco) REFERENCES endereco(idEndereco)
);

CREATE TABLE funcionario (
  idUsuario INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(150),
  email VARCHAR(100),
  senha VARCHAR(45),
	cargo VARCHAR(13),
  CONSTRAINT chCargo
  CHECK(cargo IN ('funcionario', 'administrador', 'suporte'))
);


CREATE TABLE funcionarioFazenda (
idFuncionarioFazenda INT PRIMARY KEY AUTO_INCREMENT,
fkFuncionario INT,
FOREIGN KEY (fkFuncionario) REFERENCES funcionario (idUsuario),
fkFazenda INT,
FOREIGN KEY (fkFazenda) REFERENCES fazenda (idFazenda)
);

CREATE TABLE areaplantio (
  idAreaPlantio INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(45),
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  area DECIMAL(6,1),
  fkFazenda INT,
  imagem VARCHAR(255),
  meta INT DEFAULT 0,
  FOREIGN KEY (fkFazenda) REFERENCES fazenda(idFazenda)
);

CREATE TABLE hectare (
  idHectare INT PRIMARY KEY AUTO_INCREMENT,
  setorHectare CHAR(1),
  numeroSetorHectare VARCHAR(2),
  fkAreaPlantio INT NOT NULL,
  FOREIGN KEY (fkAreaPlantio) REFERENCES areaplantio(idAreaPlantio)
);

CREATE TABLE sensor (
  idSensor INT PRIMARY KEY AUTO_INCREMENT,
  situacao VARCHAR(1000),
  latitude DECIMAL(10,8) NOT NULL,
  longitude DECIMAL(11,8) NOT NULL,
  dtInstalacao DATE,
  fkHectare INT NOT NULL,
  FOREIGN KEY (fkHectare) REFERENCES hectare(idHectare)
);

CREATE TABLE leitura (
  idLeitura INT PRIMARY KEY AUTO_INCREMENT,
  dataHora DATETIME,
  ValorLeitura INT,
  fkSensor INT NOT NULL,
  FOREIGN KEY (fkSensor) REFERENCES sensor(idSensor)
);

CREATE TABLE alerta (
  idAlerta INT PRIMARY KEY AUTO_INCREMENT,
situacao VARCHAR(255) NOT NULL,
  dtAlerta DATE,
  visto BOOLEAN,
  fkHectare INT NOT NULL,
	UNIQUE(dtAlerta,situacao,fkHectare),
  FOREIGN KEY (fkHectare) REFERENCES hectare(idHectare)
);

CREATE VIEW vw_leitura_min_max_semanal AS
SELECT 
	ap.idAreaPlantio,
	ap.nome as Area_de_Plantio,
	h.idHectare,
	CONCAT(h.setorHectare, h.numeroSetorHectare) as Hectare,
	s.idSensor as Id_sensor,
	MAX(l.valorLeitura) as Valor_maximo,
	MIN(l.valorLeitura) as Valor_minimo,
	DATE(l.dataHora) as Dia,
    s.situacao as Status
FROM areaplantio ap
JOIN hectare h
	ON fkAreaPlantio = idAreaPlantio	
JOIN sensor s
	ON s.fkHectare = h.idHectare
JOIN leitura l
	ON l.fkSensor = s.idSensor
WHERE DATE(dataHora) >= NOW() - INTERVAL 7 DAY
GROUP BY ap.nome, Hectare, s.idSensor, DATE(dataHora)
ORDER BY DATE(l.dataHora) DESC;

CREATE VIEW vw_mapa_calor AS
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
    WHERE l.dataHora >= NOW() - INTERVAL 7 DAY
    GROUP BY s.fkHectare, DATE(l.dataHora)
) t
    ON t.fkHectare = h.idHectare
AND l.dataHora >= NOW() - INTERVAL 7 DAY
GROUP BY
    ap.idAreaPlantio,
    h.idHectare;
    
    

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
    WHERE l.dataHora BETWEEN '2026-06-01' AND '2026-06-01' + INTERVAL 7 DAY
    GROUP BY s.fkHectare, DATE(l.dataHora)
) t
    ON t.fkHectare = h.idHectare AND t.Dia = DATE(l.dataHora) 
WHERE l.dataHora BETWEEN '2026-06-01' AND '2026-06-01' + INTERVAL 7 DAY 

GROUP BY
    ap.idAreaPlantio,
    h.idHectare;
    
    

USE solaris;


INSERT INTO empresa (nome, cnpj, dtCadastro) 
VALUES ('SPAGRO TECH', '12345678000199', NOW());


INSERT INTO endereco (cidade, uf, cep, bairro) VALUES ('Vale do Ribeira', 'SP', '79180000', 'Zona Rural');
INSERT INTO endereco (cidade, uf, cep, bairro) VALUES ('São José do Rio Preto', 'SP', '78890000', 'Zona Rural');


INSERT INTO fazenda (nome, area, fkEmpresa, fkEndereco) VALUES ('Fazenda Recanto dos Ipês', 12.00, 1, 1);
INSERT INTO fazenda (nome, area, fkEmpresa, fkEndereco) VALUES ('Fazenda Solja', 6.00, 1, 2);



INSERT INTO areaplantio (nome, area, fkFazenda) VALUES ('Área de Plantio 1 - Ipês', 8.0, 1);
INSERT INTO areaplantio (nome, area, fkFazenda) VALUES ('Área de Plantio 2 - Ipês', 4.0, 1);

INSERT INTO areaplantio (nome, area, fkFazenda) VALUES ('Área de Plantio 1 - Solja', 6.0, 2);







USE solaris;



-- Administrador da Fazenda Recanto dos Ipês
INSERT INTO funcionario (nome, email, senha, cargo) 
VALUES ('Guilherme Cunha', 'gui@gmail.com', 'senha123','administrador');

-- Funcionário de Campo / Operador
INSERT INTO funcionario (nome, email, senha, cargo) 
VALUES ('Vitor Machado', 'vitor@gmail.com', 'senha123', 'funcionario');

-- Suporte Técnico / Monitoramento dos Sensores nos Ipês
INSERT INTO funcionario (nome, email, senha, cargo) 
VALUES ('Brenno Ferreira', 'brenno@gmail.com', 'senha123', 'suporte');





INSERT INTO funcionario (nome, email, senha, cargo) 
VALUES  ('Jeniffer', 'jeniffer@gmail.com', 'senha123','administrador');


INSERT INTO funcionario (nome, email, senha, cargo) 
VALUES ('Giovanna Tracinkas', 'giovanna@gmail.com', 'senha123', 'funcionario');


INSERT funcionarioFazenda(fkFuncionario,fkFazenda)
 VALUES
 ('1','1'),
 ('1','2'),	
  ('1','1'),
 ('2','2'),
  ('3','1'),
 ('3','2'),
  ('4','1'),
 ('5','2');


USE solaris;

INSERT INTO hectare (setorHectare, numeroSetorHectare, fkAreaPlantio) VALUES
('A', '01', 1), ('A', '02', 1), ('A', '03', 1), ('A', '04', 1),
('A', '05', 1), ('A', '06', 1), ('A', '07', 1), ('A', '08', 1);


INSERT INTO hectare (setorHectare, numeroSetorHectare, fkAreaPlantio) VALUES
('B', '01', 2), ('B', '02', 2), ('B', '03', 2), ('B', '04', 2);


INSERT INTO hectare (setorHectare, numeroSetorHectare, fkAreaPlantio) VALUES
('C', '01', 3), ('C', '02', 3), ('C', '03', 3), ('C', '04', 3),
('C', '05', 3), ('C', '06', 3);


SELECT * FROM hectare;

ALTER TABLE sensor AUTO_INCREMENT = 1;


INSERT INTO sensor (situacao, latitude, longitude, dtInstalacao, fkHectare) VALUES
('Ativo', -20.444, -53.750, CURDATE(), 1), ('Ativo', -20.444, -53.750, CURDATE(), 2),
('Ativo', -20.444, -53.750, CURDATE(), 3), ('Ativo', -20.444, -53.750, CURDATE(), 4),
('Ativo', -20.444, -53.750, CURDATE(), 5), ('Ativo', -20.444, -53.750, CURDATE(), 6),
('Ativo', -20.444, -53.750, CURDATE(), 7), ('Ativo', -20.444, -53.750, CURDATE(), 8);


INSERT INTO sensor (situacao, latitude, longitude, dtInstalacao, fkHectare) VALUES
('Ativo', -20.445, -53.751, CURDATE(), 9),  ('Ativo', -20.445, -53.751, CURDATE(), 10),
('Ativo', -20.445, -53.751, CURDATE(), 11), ('Ativo', -20.445, -53.751, CURDATE(), 12);


INSERT INTO sensor (situacao, latitude, longitude, dtInstalacao, fkHectare) VALUES
('Ativo', -12.544, -55.720, CURDATE(), 13), ('Ativo', -12.544, -55.720, CURDATE(), 14),
('Ativo', -12.544, -55.720, CURDATE(), 15), ('Ativo', -12.544, -55.720, CURDATE(), 16),
('Ativo', -12.544, -55.720, CURDATE(), 17), ('Ativo', -12.544, -55.720, CURDATE(), 18);





CALL GerarLeiturasLivres();
DROP PROCEDURE GerarLeiturasLivres;

SELECT * FROM leitura;
     SELECT * FROM vw_mapa_calor
     WHERE idAreaPlantio = 1;
	
     SELECT * FROM alerta;

select * from funcionario;

select * from funcionarioFazenda;

UPDATE fazenda SET imagem = '1.png'
WHERE idFazenda = 1;

UPDATE fazenda SET imagem = '2.png'
WHERE idFazenda = 2;

SELECT COUNT(*) AS qtd_hectares_alerta
    FROM alerta JOIN hectare 
    ON alerta.fkHectare = hectare.idHectare
    WHERE alerta.fkHectare = 4 AND alerta.visto = 0 AND alerta.situacao LIKE 'Hectare%';
    
    SELECT * FROM Alerta;

DELETE FROM funcionarioFazenda WHERE idFuncionarioFazenda = 3;