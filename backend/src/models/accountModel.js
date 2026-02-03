const db = require('../../../db');

const Account = {
  findByUserId: async (userId) => {
    const [rows] = await db.execute('SELECT * FROM contas WHERE user_id = ?', [userId]);
    return rows;
  },
  findById: async (accountId) => {
    const [rows] = await db.execute('SELECT * FROM contas WHERE id = ?', [accountId]);
    return rows[0];
  },
  findByAccountNumber: async (accountNumber) => {
    const [rows] = await db.execute('SELECT * FROM contas WHERE numero_conta = ?', [accountNumber]);
    return rows[0];
  }
};

module.exports = Account;