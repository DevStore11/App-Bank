const express = require("express");
const path = require("path");

const servidor = express();
const porta = 3000;


const caminhoDocs = path.join(__dirname, "..", "..", "docs");


servidor.use(express.static(caminhoDocs));

servidor.get("/", (requisicao, resposta) => {
    resposta.sendFile(path.join(caminhoDocs, "index.html"));
});


servidor.listen(porta, () => {
    console.log(`Servidor a rodar em http://localhost:${porta}`);
});
