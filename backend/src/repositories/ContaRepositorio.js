import { conexaoMySQL } from "../database/conexao.js";

export default class ContaRepositorio {
  async criar(dadosConta) {
    const conexao = await conexaoMySQL;

    // Garantir que nenhum valor seja undefined estou aqui
    const usuario_id = dadosConta.usuario_id ?? null;
    const numero_conta = dadosConta.numero_conta ?? null;
    const numero_cliente = dadosConta.numero_cliente ?? null;
    const iban = dadosConta.iban ?? null;
    const saldo = dadosConta.saldo ?? 0.0;

    const sql = `
      INSERT INTO contas_AppBank
      (usuario_id, numero_conta, numero_cliente, iban, saldo, moeda, status)
      VALUES (?, ?, ?, ?, ?, 'MZN', 'ativa')
    `;

    await conexao.execute(sql, [
      usuario_id,
      numero_conta,
      numero_cliente,
      iban,
      saldo
    ]);
  }
}
