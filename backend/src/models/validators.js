const { body, validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      message: 'Dados inválidos', 
      errors: errors.array().map(err => err.msg) 
    });
  }
  next();
};

exports.registerValidation = [
  body('email').isEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres'),
  body('nome').notEmpty().withMessage('Nome é obrigatório'),
  validate
];

exports.loginValidation = [
  body('email').isEmail().withMessage('Email inválido'),
  body('password').notEmpty().withMessage('Senha é obrigatória'),
  validate
];

exports.depositValidation = [
  body('accountId').isInt().withMessage('ID da conta inválido'),
  body('amount').isFloat({ gt: 0 }).withMessage('O valor deve ser maior que zero'),
  validate
];

exports.withdrawValidation = [
  body('accountId').isInt().withMessage('ID da conta inválido'),
  body('amount').isFloat({ gt: 0 }).withMessage('O valor deve ser maior que zero'),
  validate
];

exports.transferValidation = [
  body('fromAccountId').isInt().withMessage('ID da conta de origem inválido'),
  body('toAccountNumber').notEmpty().withMessage('Número da conta de destino é obrigatório'),
  body('amount').isFloat({ gt: 0 }).withMessage('O valor deve ser maior que zero'),
  validate
];