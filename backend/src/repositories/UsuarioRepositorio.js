import { conexaoMySQL } from "../database/conexao.js";
import bcrypt from "bcryptjs";

export default class UsuarioRepositorio {

  // Criar usuário com hash da senha já gerada pelo serviço
  async criar(usuario) {
    const conexao = await conexaoMySQL;

    try {
      await conexao.beginTransaction();

      // Converter idade para número ou null
      const idade = usuario.idade ? Number(usuario.idade) : null;

      // Inserir tudo em uma única tabela
      const sqlUsuarios = `
        INSERT INTO usuarios_AppBank
        (username, nome_completo, email, telefone, senha_hash, status, idade, sexo, endereco, pais, cidade)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const [resultado] = await conexao.execute(sqlUsuarios, [
        usuario.username ?? null,
        usuario.nome_completo ?? null,
        usuario.email ?? null,
        usuario.telefone ?? null,
        usuario.senhaHash, // usa o hash vindo do serviço
        usuario.status ?? "pendente",
        idade,
        usuario.sexo ?? null,
        usuario.endereco ?? null,
        usuario.pais ?? null,
        usuario.cidade ?? null
      ]);

      await conexao.commit();

      // Retorna info básica
      return { username: usuario.username, id: resultado.insertId };

    } catch (erro) {
      await conexao.rollback();
      throw erro;
    }
  }

  // Buscar usuário por email
  async buscarPorEmail(email) {
    const conexao = await conexaoMySQL;
    const [linhas] = await conexao.execute(
      "SELECT * FROM usuarios_AppBank WHERE email = ? LIMIT 1",
      [email]
    );
    return linhas.length ? linhas[0] : null;
  }

  // Buscar usuário por username
  async buscarPorUsername(username) {
    const conexao = await conexaoMySQL;
    const [linhas] = await conexao.execute(
      "SELECT * FROM usuarios_AppBank WHERE username = ? LIMIT 1",
      [username]
    );
    return linhas.length ? linhas[0] : null;
  }

  // Validar senha do usuário
  async validarSenha(usuario, senhaInformada) {
    return bcrypt.compare(senhaInformada, usuario.senha_hash);
  }
}
