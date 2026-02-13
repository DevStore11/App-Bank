// backend/src/controllers/database/conexao.js
import dotenv from "dotenv";
import mysql from "mysql2/promise"; // usa promise para async/await
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Resolver __dirname em ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carrega variáveis de ambiente
dotenv.config({
  path: path.resolve(__dirname, "../../.env") // sobe duas pastas até backend/.env
});


// Caminho para o certificado SSL
const caminhoCertificado = path.join(__dirname, "certs", "ca.pem");

// Configuração SSL confiando no CA da Aiven
const sslConfig = {
  ca: fs.readFileSync(caminhoCertificado),
  minVersion: "TLSv1.2",
  rejectUnauthorized: true
};

// Criação da conexão com async/await
export const conexaoMySQL = mysql.createConnection({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: sslConfig
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
