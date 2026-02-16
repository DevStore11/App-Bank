import bcrypt from "bcryptjs";
import Usuario from "../core/Usuario.js";
import UsuarioValidator from "../core/UsuarioValidacao.js";
import UsuarioRepositorio from "../repositories/UsuarioRepositorio.js";
import ContaRepositorio from "../repositories/ContaRepositorio.js";
import { gerarUsername } from "../utils/gerarUsername.js";
import { gerarDadosBancarios } from "../utils/gerarDadosBancarios.js";
import EmailServico from "./EmailServico.js";

export default class UsuarioCadastroServico {

  constructor() {
    this.repositorio = new UsuarioRepositorio();
    this.contaRepositorio = new ContaRepositorio();
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

      // ================= 3️⃣ Gerar username =================
      const username = gerarUsername(nomeParaUsername);

      // ================= 4️⃣ Criar usuário =================
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

      // ================= 5️⃣ Salvar usuário no banco =================
      const resultadoUsuario = await this.repositorio.criar(usuario);
      const usuario_id = resultadoUsuario.id; // ✅ pega o ID correto

      // ================= 6️⃣ Gerar e salvar dados bancários =================
      const dadosConta = gerarDadosBancarios();
      await this.contaRepositorio.criar({
        usuario_id,
        ...dadosConta
      });

      // ================= 7️⃣ Enviar email com username e dados da conta =================
      await this.emailServico.enviarUsernameEDadosConta(
        usuario.email,
        usuario.username,
        usuario.nome_completo,
        dadosConta
      );

      // ================= 8️⃣ Retornar resultado =================
      return {
        mensagem: "Usuário cadastrado com sucesso",
        username,
        dados_bancarios: {
          numero_cliente: dadosConta.numero_cliente,
          numero_conta: dadosConta.numero_conta,
          iban: dadosConta.iban,
          pinHash: dadosConta.pinHash, // ✅ inclui o PIN no retorno
          saldo: "0.00 MZN"
        }
      };

    } catch (erro) {
      console.error("Erro no cadastro:", erro.message);
      throw erro;
    }
  }
}
