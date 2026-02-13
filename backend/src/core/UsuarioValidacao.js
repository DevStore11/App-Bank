export default class UsuarioValidacao {

  static validarCadastro(dados) {
    // Nome completo
    const nome = dados.nome_completo || "";
    if (nome.trim().length < 5) {
      throw new Error("Nome completo inválido");
    }

    // Email
    const email = dados.email || "";
    if (!email.includes("@")) {
      throw new Error("Email inválido");
    }

    // Telefone
    const telefone = dados.telefone || "";
    if (telefone.length < 8) {
      throw new Error("Telefone inválido");
    }

    // Idade
    const idade = Number(dados.idade) || 0;
    if (idade < 18) {
      throw new Error("Idade mínima é 18 anos");
    }

    // Senha
    const senha = dados.senha || "";
    if (senha.length < 8) {
      throw new Error("Senha deve ter no mínimo 8 caracteres");
    }

    // Sexo (opcional)
    if (dados.sexo && !["masculino","feminino","outro"].includes(dados.sexo)) {
      throw new Error("Sexo inválido");
    }
  }
}
