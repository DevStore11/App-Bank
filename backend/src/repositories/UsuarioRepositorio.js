import { conexaoMySQL } from "../database/conexao.js";

export default class UsuarioRepositorio {

  async criar(usuario) {
    const conexao = await conexaoMySQL.getConnection();

    try {
      await conexao.beginTransaction();

      const sql = `
        INSERT INTO usuarios
        (username, nome_completo, email, telefone, idade, sexo,
         senha_hash, endereco, pais, cidade, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      await conexao.execute(sql, [
        usuario.username,
        usuario.nomeCompleto,
        usuario.email,
        usuario.telefone,
        usuario.idade,
        usuario.sexo,
        usuario.senhaHash,
        usuario.endereco,
        usuario.pais,
        usuario.cidade,
        usuario.status
      ]);

      await conexao.commit();

    } catch (erro) {
      await conexao.rollback();
      throw erro;
    } finally {
      conexao.release();
    }
  }
}
