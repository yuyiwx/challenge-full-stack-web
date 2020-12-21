const express = require(`express`);
const cors = require("cors");

const apiRouter = require("./routes");

const app = express();

app.use(cors()); // habilitando o cors da aplicação para todas as rotas

app.use(express.json());

app.use("/api/alunos", apiRouter);

app.listen(process.env.PORT || "3000", () => {
  console.log("Server is running");
});
