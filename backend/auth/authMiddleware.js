const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_secreta_aqui';

module.exports = (req, res, next) => {
  // Ler o token do header Authorization (Formato: "Bearer <token>")
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Adiciona os dados do usuário (id) à requisição
    next();
  } catch (error) {
    res.status(400).json({ message: 'Token inválido.' });
  }
};