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
  fkEmpresa INT,
  FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
);

CREATE TABLE areaplantio (
  idAreaPlantio INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(45),
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  area DECIMAL(6,1),
  fkFazenda INT,
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
  descricao VARCHAR(150),
  visto BOOLEAN,
  fkHectare INT NOT NULL,
  FOREIGN KEY (fkHectare) REFERENCES hectare(idHectare)
);

-- ====================================================================
-- 1. INSERTS PARA A TABELA: empresa
-- ====================================================================
INSERT INTO empresa (nome, cnpj, cpf, dtCadastro) VALUES
('Agropecuária Vale Verde Ltda', '12345678000101', NULL, '2026-01-10 08:00:00'),
('Fazendas Reunidas Nova Era', '23456789000102', NULL, '2026-01-12 09:15:00'),
('Cultivos do Sul S.A.', '34567890000103', NULL, '2026-01-15 14:30:00'),
('Grãos do Cerrado EIRELI', '45678901000104', NULL, '2026-01-20 10:22:00'),
('Produtor João Silva', NULL, '12345678901', '2026-02-01 07:45:00'),
('Produtora Maria Santos', NULL, '98765432100', '2026-02-03 11:11:00');

-- ====================================================================
-- 2. INSERTS PARA A TABELA: endereco
-- ====================================================================
INSERT INTO endereco (erd, estrada, km, bairro, cidade, uf, cep, ptReferencia) VALUES
('ERD00000001', 'Rodovia BR-163', 'KM 142', 'Zona Rural', 'Sorriso', 'MT', '78890000', 'Próximo ao Posto de Combustível Idaza'),
('ERD00000002', 'Estrada Vicinal Altair', 'KM 12', 'Distrito Industrial', 'Altair', 'SP', '15430000', 'Entrada após a ponte do Rio Turvo'),
('ERD00000003', 'Rodovia GO-020', 'KM 85', 'Rural', 'Cristalina', 'GO', '73850000', 'Ao lado da subestação de energia'),
('ERD00000004', 'Rodovia BR-050', 'KM 210', 'Planalto', 'Uberlândia', 'MG', '38400000', 'De frente para o armazém da Cargill'),
('ERD00000005', 'Estrada da Guariroba', 'KM 05', 'Assentamento', 'Campo Grande', 'MS', '79002000', 'Perto da igrejinha de pedra'),
('ERD00000006', 'Rodovia RS-324', 'KM 45', 'Interior', 'Passo Fundo', 'RS', '99001000', 'Esquina com a cooperativa Cotrijal');

-- ====================================================================
-- 3. INSERTS PARA A TABELA: fazenda
-- ====================================================================
INSERT INTO fazenda (nome, cib, area, fkEmpresa, fkEndereco) VALUES
('Fazenda Boa Vista', '12345678', 1500.50, 1, 1),
('Estância Santa Maria', '23456789', 850.00, 2, 2),
('Gleba Progresso', '34567890', 3200.75, 3, 3),
('Sítio Recanto Feliz', '45678901', 120.45, 5, 4),
('Fazenda Mato Grosso', '56789012', 5000.00, 4, 5),
('Fazenda Rio Pardo', '67890123', 2150.30, 6, 6);

-- ====================================================================
-- 4. INSERTS PARA A TABELA: funcionario
-- ====================================================================
INSERT INTO funcionario (nome, email, senha, cargo, fkEmpresa) VALUES
('Carlos Eduardo Lima', 'carlos.lima@valeverde.com', 'hash_senha_123', 'Gerente', 1),
('Ana Beatriz Rocha', 'ana.rocha@valeverde.com', 'hash_senha_456', 'Agrônomo', 1),
('Marcos Antônio Souza', 'marcos.souza@novaera.com', 'hash_senha_789', 'Supervisor', 2),
('Juliana Mendes Cruz', 'juliana.cruz@cultivos.com', 'hash_senha_abc', 'Diretor', 3),
('Roberto Alves Filho', 'roberto.alves@graos.com', 'hash_senha_def', 'Operador', 4),
('Fernando Henrique Rezende', 'fernando@jsilva.com', 'hash_senha_ghi', 'Administrador', 5);

-- ====================================================================
-- 5. INSERTS PARA A TABELA: areaplantio
-- ====================================================================
INSERT INTO areaplantio (nome, latitude, longitude, area, fkFazenda) VALUES
-- Fazenda 1
('Talhão Soja A1', -12.54321000, -55.72109000, 250.5, 1),
('Talhão Milho A2', -12.54450000, -55.72300000, 300.0, 1),
-- Fazenda 2
('Pivô Central Algodão', -20.45321100, -49.05432200, 150.0, 2),
-- Fazenda 3
('Talhão Soja B1', -16.76543000, -47.65432000, 500.0, 3),
('Talhão Trigo B2', -16.76800000, -47.65900000, 450.2, 3),
-- Fazenda 5
('Talhão Cana C1', -20.44300000, -54.56700000, 800.0, 5);

-- ====================================================================
-- 6. INSERTS PARA A TABELA: hectare
-- ====================================================================
INSERT INTO hectare (setorHectare, numeroSetorHectare, fkAreaPlantio) VALUES
-- Talhão Soja A1 (fkAreaPlantio = 1)
('A', '01', 1), ('A', '02', 1), ('A', '03', 1), ('A', '04', 1),
-- Talhão Milho A2 (fkAreaPlantio = 2)
('B', '01', 2), ('B', '02', 2), ('B', '03', 2),
-- Pivô Central Algodão (fkAreaPlantio = 3)
('C', '01', 3), ('C', '02', 3),
-- Talhão Soja B1 (fkAreaPlantio = 4)
('D', '01', 4), ('D', '02', 4), ('D', '03', 4), ('D', '04', 4),
-- Talhão Trigo B2 (fkAreaPlantio = 5)
('E', '01', 5), ('E', '02', 5),
-- Talhão Cana C1 (fkAreaPlantio = 6)
('F', '01', 6), ('F', '02', 6);

-- ====================================================================
-- 7. INSERTS PARA A TABELA: sensor
-- ====================================================================
INSERT INTO sensor (situacao, latitude, longitude, dtInstalacao, fkHectare) VALUES
-- Sensores no Setor A (Hectares 1, 2, 3, 4)
('Ativo', -12.54322000, -55.72110000, '2026-02-10', 1),
('Ativo', -12.54325000, -55.72120000, '2026-02-10', 2),
('Inativo', -12.54329000, -55.72130000, '2026-02-11', 3),
('Manutenção', -12.54331000, -55.72140000, '2026-02-11', 4),
-- Sensores no Setor B (Hectares 5, 6)
('Ativo', -12.54455000, -55.72310000, '2026-02-15', 5),
('Ativo', -12.54460000, -55.72320000, '2026-02-15', 6),
-- Sensores no Setor C (Hectares 8, 9)
('Ativo', -20.45322000, -49.05433000, '2026-02-20', 8),
('Ativo', -20.45326000, -49.05434000, '2026-02-20', 9),
-- Sensores no Setor D (Hectares 10, 11, 12)
('Ativo', -16.76544000, -47.65433000, '2026-02-25', 10),
('Inativo', -16.76548000, -47.65435000, '2026-02-25', 11),
('Ativo', -16.76550000, -47.65439000, '2026-02-26', 12);

-- ====================================================================
-- 8. INSERTS PARA A TABELA: leitura (Simulando variação de dados históricos)
-- ====================================================================
INSERT INTO leitura (dataHora, ValorLeitura, fkSensor) VALUES
-- Histórico Sensor 1 (Umidade / Temperatura simulada)
('2026-03-01 06:00:00', 22, 1), ('2026-03-01 12:00:00', 31, 1), ('2026-03-01 18:00:00', 26, 1),
('2026-03-02 06:00:00', 21, 1), ('2026-03-02 12:00:00', 33, 1), ('2026-03-02 18:00:00', 25, 1),
('2026-03-03 06:00:00', 23, 1), ('2026-03-03 12:00:00', 35, 1), ('2026-03-03 18:00:00', 28, 1),
-- Histórico Sensor 2
('2026-03-01 06:00:00', 24, 2), ('2026-03-01 12:00:00', 30, 2), ('2026-03-01 18:00:00', 27, 2),
('2026-03-02 06:00:00', 22, 2), ('2026-03-02 12:00:00', 32, 2), ('2026-03-02 18:00:00', 26, 2),
-- Histórico Sensor 5 (Leituras críticas altas)
('2026-03-01 08:00:00', 40, 5), ('2026-03-01 14:00:00', 45, 5), ('2026-03-01 20:00:00', 42, 5),
('2026-03-02 08:00:00', 46, 5), ('2026-03-02 14:00:00', 49, 5), ('2026-03-02 20:00:00', 41, 5),
-- Histórico Sensor 7
('2026-03-01 00:00:00', 15, 7), ('2026-03-01 12:00:00', 19, 7), ('2026-03-02 00:00:00', 14, 7),
-- Histórico Sensor 9
('2026-03-05 09:00:00', 28, 9), ('2026-03-05 15:00:00', 34, 9), ('2026-03-06 09:00:00', 27, 9);

-- ====================================================================
-- 9. INSERTS PARA A TABELA: alerta
-- ====================================================================
INSERT INTO alerta (situacao, dtAlerta, descricao, fkHectare) VALUES
('Crítico', '2026-03-01', 'Temperatura acima do limite permitido de 42°C no Setor B.', 5),
('Aviso', '2026-03-02', 'Queda brusca de umidade detectada no início da tarde.', 5),
('Aviso', '2026-03-02', 'Falha de comunicação temporária com sensores do Setor A.', 3),
('Crítico', '2026-03-03', 'Falta extrema de água detectada no solo do Pivô Central.', 8),
('Resolvido', '2026-03-04', 'Sensor reiniciado e leitura normalizada após manutenção.', 4);

-- ====================================================================
-- INSERTS ADICIONAIS PARA A TABELA: leitura
-- ====================================================================
INSERT INTO leitura (dataHora, ValorLeitura, fkSensor) VALUES
-- --- SENSOR 1 (Monitoramento contínuo de 48h) ---
('2026-03-04 00:00:00', 19, 1), ('2026-03-04 04:00:00', 18, 1),
('2026-03-04 08:00:00', 22, 1), ('2026-03-04 12:00:00', 32, 1),
('2026-03-04 16:00:00', 34, 1), ('2026-03-04 20:00:00', 26, 1),
('2026-03-05 00:00:00', 21, 1), ('2026-03-05 04:00:00', 19, 1),
('2026-03-05 08:00:00', 24, 1), ('2026-03-05 12:00:00', 35, 1),
('2026-03-05 16:00:00', 33, 1), ('2026-03-05 20:00:00', 25, 1),

-- --- SENSOR 2 (Monitoramento contínuo de 48h) ---
('2026-03-03 00:00:00', 20, 2), ('2026-03-03 04:00:00', 19, 2),
('2026-03-03 08:00:00', 23, 2), ('2026-03-03 12:00:00', 31, 2),
('2026-03-03 16:00:00', 29, 2), ('2026-03-03 20:00:00', 25, 2),
('2026-03-04 00:00:00', 18, 2), ('2026-03-04 04:00:00', 17, 2),
('2026-03-04 08:00:00', 21, 2), ('2026-03-04 12:00:00', 33, 2),
('2026-03-04 16:00:00', 30, 2), ('2026-03-04 20:00:00', 24, 2),

-- --- SENSOR 5 (Pivô central - Simulação de estresse térmico/pico de calor) ---
('2026-03-03 00:00:00', 35, 5), ('2026-03-03 04:00:00', 32, 5),
('2026-03-03 08:00:00', 39, 5), ('2026-03-03 12:00:00', 48, 5),
('2026-03-03 16:00:00', 51, 5), ('2026-03-03 20:00:00', 44, 5),
('2026-03-04 00:00:00', 38, 5), ('2026-03-04 04:00:00', 36, 5),
('2026-03-04 08:00:00', 41, 5), ('2026-03-04 12:00:00', 49, 5),
('2026-03-04 16:00:00', 53, 5), ('2026-03-04 20:00:00', 46, 5),

-- --- SENSOR 6 (Talhão adjacente ao Sensor 5) ---
('2026-03-01 00:00:00', 22, 6), ('2026-03-01 04:00:00', 21, 6),
('2026-03-01 08:00:00', 26, 6), ('2026-03-01 12:00:00', 34, 6),
('2026-03-01 16:00:00', 36, 6), ('2026-03-01 20:00:00', 29, 6),
('2026-03-02 00:00:00', 23, 6), ('2026-03-02 04:00:00', 22, 6),
('2026-03-02 08:00:00', 25, 6), ('2026-03-02 12:00:00', 35, 6),
('2026-03-02 16:00:00', 37, 6), ('2026-03-02 20:00:00', 30, 6),

-- --- SENSOR 7 (Ambiente controlado/Estufa - Variação sutil) ---
('2026-03-02 04:00:00', 16, 7), ('2026-03-02 08:00:00', 18, 7),
('2026-03-02 16:00:00', 21, 7), ('2026-03-02 20:00:00', 17, 7),
('2026-03-03 00:00:00', 15, 7), ('2026-03-03 04:00:00', 14, 7),
('2026-03-03 08:00:00', 18, 7), ('2026-03-03 12:00:00', 22, 7),
('2026-03-03 16:00:00', 20, 7), ('2026-03-03 20:00:00', 16, 7),

-- --- SENSOR 8 (Novo Talhão Monitorado) ---
('2026-03-01 00:00:00', 25, 8), ('2026-03-01 04:00:00', 24, 8),
('2026-03-01 08:00:00', 28, 8), ('2026-03-01 12:00:00', 36, 8),
('2026-03-01 16:00:00', 38, 8), ('2026-03-01 20:00:00', 31, 8),
('2026-03-02 00:00:00', 26, 8), ('2026-03-02 04:00:00', 23, 8),
('2026-03-02 08:00:00', 29, 8), ('2026-03-02 12:00:00', 37, 8),
('2026-03-02 16:00:00', 39, 8), ('2026-03-02 20:00:00', 32, 8),
('2026-03-03 00:00:00', 24, 8), ('2026-03-03 04:00:00', 22, 8),
('2026-03-03 08:00:00', 27, 8), ('2026-03-03 12:00:00', 35, 8),
('2026-03-03 16:00:00', 36, 8), ('2026-03-03 20:00:00', 30, 8),

-- --- SENSOR 9 (Histórico estendido de Março) ---
('2026-03-06 15:00:00', 33, 9), ('2026-03-06 21:00:00', 26, 9),
('2026-03-07 03:00:00', 21, 9), ('2026-03-07 09:00:00', 28, 9),
('2026-03-07 15:00:00', 35, 9), ('2026-03-07 21:00:00', 27, 9),
('2026-03-08 03:00:00', 20, 9), ('2026-03-08 09:00:00', 29, 9),
('2026-03-08 15:00:00', 36, 9), ('2026-03-08 21:00:00', 28, 9),

-- --- SENSOR 11 (Simulação de Retorno pós-Inatividade) ---
('2026-03-05 06:00:00', 22, 11), ('2026-03-05 10:00:00', 27, 11),
('2026-03-05 14:00:00', 32, 11), ('2026-03-05 18:00:00', 29, 11),
('2026-03-05 22:00:00', 24, 11), ('2026-03-06 02:00:00', 21, 11),
('2026-03-06 06:00:00', 23, 11), ('2026-03-06 10:00:00', 28, 11),
('2026-03-06 14:00:00', 34, 11), ('2026-03-06 18:00:00', 31, 11),
('2026-03-06 22:00:00', 25, 11), ('2026-03-07 02:00:00', 22, 11);

CREATE VIEW vw_leitura_min_max_semanal AS
SELECT 
	ap.idAreaPlantio,
	ap.nome as 'Area de Plantio',
	h.idHectare,
	CONCAT(h.setorHectare, h.numeroSetorHectare) as 'Hectare',
	s.idSensor as 'Id do sensor',
	MAX(l.valorLeitura) as 'Valor máximo',
	MIN(l.valorLeitura) as 'Valor mínimo',
	DATE(l.dataHora) as 'Dia',
    s.situacao as 'Status'
FROM areaplantio ap
JOIN hectare h
	ON fkAreaPlantio = idAreaPlantio	
JOIN sensor s
	ON s.fkHectare = h.idHectare
JOIN leitura l
	ON l.fkSensor = s.idSensor
WHERE DATE(dataHora) <= NOW() - INTERVAL 7 DAY
GROUP BY ap.nome, 'Hectare', s.idSensor, DATE(dataHora)
ORDER BY DATE(l.dataHora) DESC;

SELECT * FROM vw_leitura_min_max_semanal
WHERE idAreaPlantio = 1
AND idHectare = 2
LIMIT 7;