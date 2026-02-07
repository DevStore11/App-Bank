export default class Usuario {

  constructor({
    nome_completo,
    email,
    telefone,
    idade,
    sexo,
    senhaHash,
    endereco,
    pais,
    cidade,
    username
  }) {
    this.nome_completo = nome_completo;
    this.email = email;
    this.telefone = telefone;
    this.idade = idade;
    this.sexo = sexo;
    this.senhaHash = senhaHash;
    this.endereco = endereco;
    this.pais = pais;
    this.cidade = cidade;
    this.username = username;
    this.status = "pendente";
  }

  activar() {
    this.status = "activo";
  }

  bloquear() {
    this.status = "bloqueado";
  }
}
