const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/deposit', authMiddleware, transactionController.deposit);
router.post('/withdraw', authMiddleware, transactionController.withdraw);
router.post('/transfer', authMiddleware, transactionController.transfer);

module.exports = router;