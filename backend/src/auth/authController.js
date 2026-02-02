const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_secreta_aqui';

exports.register = async (req, res) => {
  try {
    const { email, password, nome, telefone, endereco } = req.body;

    // Validação básica
    if (!email || !password || !nome) {
      return res.status(400).json({ message: 'Por favor, preencha todos os campos obrigatórios.' });
    }

    // Verificar se usuário já existe
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email já cadastrado.' });
    }

    // Hash da senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Criar Usuário
    const userId = await User.create(email, hashedPassword);

    // Criar Perfil e Conta Inicial
    await User.createProfile(userId, nome, telefone, endereco);
    const numeroConta = await User.createAccount(userId);

    res.status(201).json({ message: 'Usuário registrado com sucesso!', conta: numeroConta });
  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuário
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'Credenciais inválidas.' });
    }

    // Verificar senha
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciais inválidas.' });
    }

    // Gerar Token
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
    await User.createSession(user.id, token);

    res.json({ token, user: { id: user.id, email: user.email } });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};