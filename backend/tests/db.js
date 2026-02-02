const mysql = require('mysql2');

// Crie um pool de conexões para reutilizar conexões e melhorar a performance
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '', // Coloque sua senha aqui, se houver
  database: process.env.DB_NAME || 'primepay', // Assumindo que o nome do DB é 'primepay'
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Converte o pool para usar Promises em vez de callbacks
const promisePool = pool.promise();

console.log('Pool de conexões com o MySQL criado com sucesso.');

module.exports = promisePool;