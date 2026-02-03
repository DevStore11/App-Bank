const Transaction = require('../models/transactionModel');
const Account = require('../models/accountModel');

exports.deposit = async (req, res) => {
  try {
    const { accountId, amount } = req.body;
    if (amount <= 0) return res.status(400).json({ message: 'Valor inválido.' });

    const account = await Account.findById(accountId);
    if (!account) return res.status(404).json({ message: 'Conta não encontrada.' });

    await Transaction.deposit(accountId, amount);
    res.json({ message: 'Depósito realizado com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao realizar depósito.' });
  }
};

exports.withdraw = async (req, res) => {
  try {
    const { accountId, amount } = req.body;
    if (amount <= 0) return res.status(400).json({ message: 'Valor inválido.' });

    const account = await Account.findById(accountId);
    if (!account) return res.status(404).json({ message: 'Conta não encontrada.' });
    if (account.user_id !== req.user.id) return res.status(403).json({ message: 'Acesso negado.' });
    if (parseFloat(account.saldo) < amount) return res.status(400).json({ message: 'Saldo insuficiente.' });

    await Transaction.withdraw(accountId, amount);
    res.json({ message: 'Saque realizado com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao realizar saque.' });
  }
};

exports.transfer = async (req, res) => {
  try {
    const { fromAccountId, toAccountNumber, amount } = req.body;
    if (amount <= 0) return res.status(400).json({ message: 'Valor inválido.' });

    const fromAccount = await Account.findById(fromAccountId);
    if (!fromAccount) return res.status(404).json({ message: 'Conta de origem não encontrada.' });
    if (fromAccount.user_id !== req.user.id) return res.status(403).json({ message: 'Acesso negado.' });
    if (parseFloat(fromAccount.saldo) < amount) return res.status(400).json({ message: 'Saldo insuficiente.' });

    const toAccount = await Account.findByAccountNumber(toAccountNumber);
    if (!toAccount) return res.status(404).json({ message: 'Conta de destino não encontrada.' });
    if (fromAccount.id === toAccount.id) return res.status(400).json({ message: 'Não pode transferir para a mesma conta.' });

    await Transaction.transfer(fromAccount.id, toAccount.id, amount);
    res.json({ message: 'Transferência realizada com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao realizar transferência.' });
  }
};