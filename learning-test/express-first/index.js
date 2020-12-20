const express = require("express");
const app = express();

//forma mais simples de criar rota
// url (/) rota inicial

app.get("/", function (req, res) {
  res.send("<h1>Bem vindo</h1>"); //so pode enviar uma resposta unica vez
});

app.get("/blog/:artigo?", function (req, res) {
  var artigo = req.params.artigo;
  if (artigo) {
    res.send("<h2>" + artigo + "<h2>");
  } else {
    res.send("Bem vindo ao blog"); //so pode enviar uma resposta unica vez
  }
});

app.get("/canal/youtube", function (req, res) {
  var canal = req.query["canal"];
  if (canal) {
    res.send(canal);
  } else {
    res.send("Canal Errado!");
  }
  //so pode enviar uma resposta unica vez
});

app.get("/ola/:nome/:empresa", function (req, res) {
  //req - dados enviados pelo usuario
  //res - resposta que vai ser enviada para o usuario
  var nome = req.params.nome;
  var empresa = req.params.empresa;
  res.send("<h1>Oi, " + nome + " da " + empresa + " <h1>");
});

app.listen(2424, function (erro) {
  if (erro) {
    console.log("Erro");
  } else {
    console.log("Servidor Iniciado com Sucesso");
  }
});
