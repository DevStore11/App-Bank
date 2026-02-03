const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, accountController.listAccounts);
router.get('/:accountId/balance', authMiddleware, accountController.getBalance);
router.get('/:accountId/statement', authMiddleware, accountController.getStatement);

module.exports = router;