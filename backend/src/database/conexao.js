// backend/src/controllers/database/conexao.js
import dotenv from "dotenv";
import mysql from "mysql2/promise"; // usa promise para async/await
import fs from "fs";
import path from "path";

dotenv.config({
  path: path.resolve("backend/.env") // << caminho correto para o teu .env
});
// Caminho para o certificado SSL
const caminhoCertificado = path.resolve("backend/src/database/certs/ca.pem");

// Criação da conexão com async/await
export const conexaoMySQL = mysql.createConnection({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    ca: fs.readFileSync(caminhoCertificado),
    rejectUnauthorized: true // seguro para produção
  }
});

// Função para testar a conexão
export const testarConexao = async () => {
  try {
    const conexao = await conexaoMySQL;
    await conexao.connect();
    console.log("✅ Conectado ao MySQL Aiven com sucesso!");
    await conexao.end(); // encerra a conexão de teste
  } catch (erro) {
    console.error("❌ Erro ao conectar na base de dados:", erro);
  }
};

// Executa teste automático se este arquivo for chamado diretamente
if (process.argv[1].includes("conexao.js")) {
  testarConexao();
}
