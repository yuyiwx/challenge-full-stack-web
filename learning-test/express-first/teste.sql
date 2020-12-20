CREATE TABLE usuarios(
    nome VARCHAR(50),
    email VARCHAR(100),
    idade INT
);
INSERT INTO usuarios(nome, email, idade) VALUES(
"Vinicius",
"email2@teste.com",
23
);

SELECT * FROM usuarios WHERE idade = 18;
SELECT * FROM usuarios WHERE nome = "Yu Yi Wang";
SELECT * FROM usuarios WHERE idade>=18;

DELETE FROM usuarios WHERE nome = "Leng";

UPDATE usuarios SET nome = "Nome de Teste";