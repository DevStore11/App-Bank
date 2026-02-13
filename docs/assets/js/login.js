// Selecionar formulário e campos
const formLogin = document.querySelector("#form-login");
const inputUsername = document.querySelector("#username");
const inputSenha = document.querySelector("#senha");
const mensagemErro = document.querySelector("#mensagem-erro");

// Função para mostrar erro
function exibirErro(msg) {
  mensagemErro.textContent = msg;
  mensagemErro.style.display = "block";
}

// Ouvir submit do formulário
formLogin.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Limpar mensagens
  mensagemErro.style.display = "none";

  const username = inputUsername.value.trim();
  const senha = inputSenha.value.trim();

  if (!username || !senha) {
    exibirErro("Preencha username e senha.");
    return;
  }

  try {
    const resposta = await fetch("/api/usuarios/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, senha })
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      exibirErro(dados.erro || "Erro no login.");
      return;
    }

    // Salvar token no localStorage
    localStorage.setItem("tokenAppBank", dados.token);
    localStorage.setItem("roleAppBank", dados.role);

    // Redirecionar para dashboard conforme role
    if (dados.role === "admin") {
      window.location.href = "/dashboard-admin";
    } else {
      window.location.href = "/dashboard";
    }

  } catch (erro) {
    exibirErro("Erro de conexão com o servidor.");
    console.error("Erro login.js:", erro);
  }
});
