const db = require('../../../db');

const AuditLog = {
  log: async (userId, action, details, ipAddress) => {
    try {
      const detailsString = typeof details === 'object' ? JSON.stringify(details) : String(details);
      
      await db.execute(
        'INSERT INTO audi_logs (user_id, action, details, ip_address, created_at) VALUES (?, ?, ?, ?, NOW())',
        [userId, action, detailsString, ipAddress || null]
      );
    } catch (error) {
      console.error('Erro ao registrar auditoria:', error);
    }
  }
};

module.exports = AuditLog;