const express = require('express');
const router = express.Router();
const authRoutes = require('./backend/auth/authRoutes');

// Rotas de Autenticação
router.use('/auth', authRoutes);

module.exports = router;