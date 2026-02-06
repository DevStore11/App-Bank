export default class UsuarioValidacao {

  static validarCadastro(dados) {
    if (!dados.nome || dados.nome.length < 5) {
      throw new Error("Nome completo inválido");
    }

    if (!dados.email || !dados.email.includes("@")) {
      throw new Error("Email inválido");
    }

    if (!dados.telefone || dados.telefone.length < 8) {
      throw new Error("Telefone inválido");
    }

    if (dados.idade < 18) {
      throw new Error("Idade mínima é 18 anos");
    }

    if (!dados.senha || dados.senha.length < 8) {
      throw new Error("Senha deve ter no mínimo 8 caracteres");
    }
  }
}
