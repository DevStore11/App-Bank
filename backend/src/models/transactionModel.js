const db = require('../../../db');

const Transaction = {
  getStatement: async (accountId) => {
    const [rows] = await db.execute(
      'SELECT * FROM transacoes WHERE conta_id = ? ORDER BY created_at DESC',
      [accountId]
    );
    return rows;
  },

  deposit: async (accountId, amount) => {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      // Atualizar saldo
      await connection.execute('UPDATE contas SET saldo = saldo + ? WHERE id = ?', [amount, accountId]);

      // Registrar depósito
      await connection.execute('INSERT INTO depositos (conta_id, valor, created_at) VALUES (?, ?, NOW())', [accountId, amount]);

      // Registrar log de transação
      await connection.execute(
        'INSERT INTO transacoes (conta_id, tipo, valor, created_at) VALUES (?, "deposito", ?, NOW())',
        [accountId, amount]
      );

      await connection.commit();
      return true;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },

  withdraw: async (accountId, amount) => {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      // Atualizar saldo (assumindo validação prévia de saldo no controller)
      await connection.execute('UPDATE contas SET saldo = saldo - ? WHERE id = ?', [amount, accountId]);

      // Registrar saque
      await connection.execute('INSERT INTO saques (conta_id, valor, created_at) VALUES (?, ?, NOW())', [accountId, amount]);

      // Registrar log de transação
      await connection.execute(
        'INSERT INTO transacoes (conta_id, tipo, valor, created_at) VALUES (?, "saque", ?, NOW())',
        [accountId, amount]
      );

      await connection.commit();
      return true;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },

  transfer: async (fromAccountId, toAccountId, amount) => {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      // Debitar da origem
      await connection.execute('UPDATE contas SET saldo = saldo - ? WHERE id = ?', [amount, fromAccountId]);

      // Creditar no destino
      await connection.execute('UPDATE contas SET saldo = saldo + ? WHERE id = ?', [amount, toAccountId]);

      // Registrar transferência
      await connection.execute(
        'INSERT INTO transfer (conta_origem_id, conta_destino_id, valor, created_at) VALUES (?, ?, ?, NOW())',
        [fromAccountId, toAccountId, amount]
      );

      // Log para origem
      await connection.execute(
        'INSERT INTO transacoes (conta_id, tipo, valor, created_at) VALUES (?, "transferencia_envio", ?, NOW())',
        [fromAccountId, amount]
      );

      // Log para destino
      await connection.execute(
        'INSERT INTO transacoes (conta_id, tipo, valor, created_at) VALUES (?, "transferencia_recebimento", ?, NOW())',
        [toAccountId, amount]
      );

      await connection.commit();
      return true;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
};

module.exports = Transaction;