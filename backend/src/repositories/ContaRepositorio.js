import { conexaoMySQL } from "../database/conexao.js";

export default class ContaRepositorio {
  async criar(dadosConta) {
    const conexao = await conexaoMySQL;

  // Validação mínima
    if (!dadosConta.usuario_id) throw new Error("usuario_id é obrigatório");
    if (!dadosConta.numero_conta) throw new Error("numero_conta é obrigatório");
    if (!dadosConta.numero_cliente) throw new Error("numero_cliente é obrigatório");
    if (!dadosConta.iban) throw new Error("iban é obrigatório");
    if (!dadosConta.pinHash) throw new Error("pin_hash é obrigatório");

    const sql = `
      INSERT INTO contas_AppBank
      (usuario_id, numero_conta, numero_cliente, iban,pin_hash, saldo, moeda, status)
      VALUES (?, ?, ?, ?, ?, ?, 'MZN', 'ativa')
    `;

     await conexao.execute(sql, [
      dadosConta.usuario_id,
      dadosConta.numero_conta,
      dadosConta.numero_cliente,
      dadosConta.iban,
      dadosConta.pinHash,
      dadosConta.saldo ?? 0.0
    ]);
  }
}
