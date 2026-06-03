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
  CHECK(cargo IN ('funcionario', 'administrador', 'suporte')),
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
  meta INT,
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
  situacao VARCHAR(10),
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
  situacao VARCHAR(45) NOT NULL,
  dtAlerta DATE,
  visto BOOLEAN,
  fkHectare INT NOT NULL,
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
    