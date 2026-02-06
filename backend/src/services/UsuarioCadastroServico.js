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
    UsuarioValidator.validarCadastro(dados);

    const senhaHash = await bcrypt.hash(dados.senha, 12);
    const username = gerarUsername(dados.nome);

    const usuario = new Usuario({
      nomeCompleto: dados.nome,
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

    await this.repositorio.criar(usuario);

    await this.emailServico.enviarUsername(
      usuario.email,
      usuario.username,
      usuario.nomeCompleto
    );

    return { username };
  }
}
