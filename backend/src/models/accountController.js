const Account = require('../models/accountModel');
const Transaction = require('../models/transactionModel');

exports.listAccounts = async (req, res) => {
  try {
    const userId = req.user.id; // Obtido do token JWT
    const accounts = await Account.findByUserId(userId);
    res.json(accounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar contas.' });
  }
};

exports.getBalance = async (req, res) => {
  try {
    const { accountId } = req.params;
    const account = await Account.findById(accountId);
    
    if (!account) return res.status(404).json({ message: 'Conta não encontrada.' });
    if (account.user_id !== req.user.id) return res.status(403).json({ message: 'Acesso negado.' });

    res.json({ saldo: account.saldo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar saldo.' });
  }
};

exports.getStatement = async (req, res) => {
  try {
    const { accountId } = req.params;
    const account = await Account.findById(accountId);

    if (!account) return res.status(404).json({ message: 'Conta não encontrada.' });
    if (account.user_id !== req.user.id) return res.status(403).json({ message: 'Acesso negado.' });

    const statement = await Transaction.getStatement(accountId);
    res.json(statement);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar extrato.' });
  }
};