import { conexaoMySQL } from "../database/conexao.js";
import bcrypt from "bcryptjs";

export default class UsuarioRepositorio {

  // Criar usuário com hash da senha
  async criar(usuario) {
    const conexao = await conexaoMySQL;

    try {
      await conexao.beginTransaction();

      // Hash da senha
      const saltRounds = 10;
      const senhaHash = await bcrypt.hash(usuario.senha, saltRounds);

      const sqlUsuarios = `
        INSERT INTO usuarios
        (username, nome_completo, email, telefone, senha_hash, status)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      const [resultadoUsuarios] = await conexao.execute(sqlUsuarios, [
        usuario.username ?? null,
        usuario.nome_completo ?? null,
        usuario.email ?? null,
        usuario.telefone ?? null,
        senhaHash,
        usuario.status ?? "pendente"
      ]);

      const usuarioId = resultadoUsuarios.insertId;

      const sqlPerfil = `
        INSERT INTO usuario_perfil
        (usuario_id, nome, idade, sexo, endereco, pais, cidade)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      await conexao.execute(sqlPerfil, [
        usuarioId,
        usuario.nome ?? null,
        usuario.idade ?? null,
        usuario.sexo ?? null,
        usuario.endereco ?? null,
        usuario.pais ?? null,
        usuario.cidade ?? null
      ]);

      await conexao.commit();

      // Retorna info básica
      return { username: usuario.username, id: usuarioId };

    } catch (erro) {
      await conexao.rollback();
      throw erro;
    }
  }

  // Buscar usuário por email
  async buscarPorEmail(email) {
    const conexao = await conexaoMySQL;
    const [linhas] = await conexao.execute(
      "SELECT * FROM usuarios WHERE email = ? LIMIT 1",
      [email]
    );
    return linhas.length ? linhas[0] : null;
  }

  // Buscar usuário por username
  async buscarPorUsername(username) {
    const conexao = await conexaoMySQL;
    const [linhas] = await conexao.execute(
      "SELECT * FROM usuarios WHERE username = ? LIMIT 1",
      [username]
    );
    return linhas.length ? linhas[0] : null;
  }

  // Validar senha do usuário
  async validarSenha(usuario, senhaInformada) {
    return bcrypt.compare(senhaInformada, usuario.senha_hash);
  }
}
