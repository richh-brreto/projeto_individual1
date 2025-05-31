CREATE DATABASE individual;

USE individual;

CREATE TABLE usuario (
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(50),
email VARCHAR(50),
senha VARCHAR(50)
);

CREATE TABLE perguntas (
id INT PRIMARY KEY AUTO_INCREMENT, 
pergunta VARCHAR(100)
);

INSERT INTO pergunta (pergunta) VALUES
('Qual sua faixa favorita do álbum To Pimp a Butterfly?'),
('Você costuma ouvir o álbum inteiro ou faixas específicas?'),
('Qual tema do álbum mais te impacta?'),
('Você já recomendou esse álbum para alguém?'),
('Com que frequência você ouve Kendrick Lamar?');


CREATE TABLE respostas (
id INT PRIMARY KEY AUTO_INCREMENT, 
resposta VARCHAR(100)
);

