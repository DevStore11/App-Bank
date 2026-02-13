import bcrypt from "bcryptjs";
import Usuario from "../core/Usuario.js";
import UsuarioValidator from "../core/UsuarioValidacao.js";
import UsuarioRepositorio from "../repositories/UsuarioRepositorio.js";
import { gerarUsername } from "../utils/gerarUsername.js";
import EmailServico from "./EmailServico.js";

export default class UsuarioCadastroServico {

  constructor() {
    this.repositorio = new UsuarioRepositorio();
    this.emailServico = new EmailServico();
  }

  async executar(dados) {
    try {
      // ================= 1️⃣ Validação =================
      UsuarioValidator.validarCadastro(dados);

      const nomeParaUsername = dados.nome_completo?.trim();
      if (!nomeParaUsername) {
        throw new Error("Nome completo é obrigatório para gerar username");
      }

      // ================= 2️⃣ Hash da senha =================
      const senhaHash = await bcrypt.hash(dados.senha, 12);

      // ================= 3️⃣ Gerar username seguro =================
      const username = gerarUsername(nomeParaUsername);

      // ================= 4️⃣ Criar entidade Usuário =================
      const usuario = new Usuario({
        nome_completo: nomeParaUsername,
        email: dados.email,
        telefone: dados.telefone,
        idade: dados.idade,
        sexo: dados.sexo,
        senhaHash,
        endereco: dados.endereco,
        pais: dados.pais,
        cidade: dados.cidade,
        username
      });

      // ================= 5️⃣ Salvar no banco =================
      await this.repositorio.criar(usuario);

      // ================= 6️⃣ Enviar email com username =================
      try {
        await this.emailServico.enviarUsername(
          usuario.email,
          usuario.username,
          usuario.nome_completo
        );
      } catch (erroEmail) {
        console.error("Erro ao enviar email:", erroEmail.message);
      }

      // ================= ✅ Retornar sucesso =================
      return { 
        mensagem: "Usuário cadastrado com sucesso",
        username 
      };

    } catch (erro) {
      console.error("Erro no cadastro:", erro.message);
      throw erro;
    }
  }
}
