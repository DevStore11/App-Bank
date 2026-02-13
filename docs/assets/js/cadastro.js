document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("formulario-cadastro");
  const mensagem = document.getElementById("mensagem");

  const URL_API = "http://localhost:3000/api/usuarios/cadastro";

  formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const dados = {
      nome_completo: document.getElementById("nome_completo")?.value || "",
      email: document.getElementById("email")?.value || "",
      idade: document.getElementById("idade")?.value || "",
      sexo: document.getElementById("sexo")?.value || "",
      telefone: document.getElementById("telefone")?.value || "",
      senha: document.getElementById("senha")?.value || "",
      endereco: document.getElementById("endereco")?.value || "",
      pais: document.getElementById("pais")?.value || "",
      cidade: document.getElementById("cidade")?.value || "",
      status: "pendente"
    };

    try {
      const resposta = await fetch(URL_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
      });

      const resultado = await resposta.json();

      if (!resposta.ok) {
        mensagem.style.color = "red";
        mensagem.textContent = resultado.erro || "Erro no cadastro";
        return;
      }

      mensagem.style.color = "green";
      mensagem.textContent = "Cadastro feito com sucesso.";
      formulario.reset();

    } catch (erro) {
      mensagem.style.color = "red";
      mensagem.textContent = "Erro ao ligar ao servidor";
    }
  });
});
