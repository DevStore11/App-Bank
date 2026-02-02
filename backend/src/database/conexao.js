// src/controllers/database/conexao.js
require('dotenv').config();
const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');

// Caminho para o certificado SSL
const caminhoCertificado = path.join(__dirname, 'certs', 'ca.pem');

const conexao = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    ca: fs.readFileSync(caminhoCertificado)
  }
});

// Testar conexão
conexao.connect((erro) => {
  if (erro) {
    console.error('Erro ao conectar na base de dados:', erro);
    return;
  }
  console.log('Conectado ao MySQL Aiven com sucesso!');
});

module.exports = conexao;
