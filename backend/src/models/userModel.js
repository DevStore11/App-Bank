const db = require('../../../db');

const User = {
  create: async (email, passwordHash) => {
    // Insere usuário e retorna o ID
    const [result] = await db.execute(
      'INSERT INTO usuarios (email, password, created_at) VALUES (?, ?, NOW())',
      [email, passwordHash]
    );
    return result.insertId;
  },

  findByEmail: async (email) => {
    const [rows] = await db.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
    return rows[0];
  },

  createProfile: async (userId, nome, telefone, endereco) => {
    await db.execute(
      'INSERT INTO usuario_perfil (user_id, nome, telefone, endereco) VALUES (?, ?, ?, ?)',
      [userId, nome, telefone, endereco]
    );
  },

  createAccount: async (userId) => {
    // Gera um número de conta aleatório de 6 dígitos
    const numeroConta = Math.floor(100000 + Math.random() * 900000).toString();
    await db.execute(
      'INSERT INTO contas (user_id, numero_conta, saldo, created_at) VALUES (?, ?, 0.00, NOW())',
      [userId, numeroConta]
    );
    return numeroConta;
  },

  createSession: async (userId, token) => {
    await db.execute(
      'INSERT INTO user_sessions (user_id, token, created_at, expires_at) VALUES (?, ?, NOW(), DATE_ADD(NOW(), INTERVAL 1 HOUR))',
      [userId, token]
    );
  }
};

module.exports = User;