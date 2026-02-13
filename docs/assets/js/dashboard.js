// Selecionar elementos da dashboard
const tituloDashboard = document.querySelector("#titulo-dashboard");
const usuarioInfo = document.querySelector("#usuario-info");

// Função para logout
function logout() {
  localStorage.removeItem("tokenAppBank");
  localStorage.removeItem("roleAppBank");
  window.location.href = "/login";
}

// Pegar token do localStorage
const token = localStorage.getItem("tokenAppBank");
const role = localStorage.getItem("roleAppBank");

// Se não tiver token, redireciona para login
if (!token) {
  window.location.href = "/login";
}

// Função para buscar dados do backend
async function carregarDashboard() {
  try {
    const resposta = await fetch("/api/usuarios/dashboard", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      console.error("Erro ao carregar dashboard:", dados.erro);
      logout(); // token inválido ou expirado
      return;
    }

    // Exibir informações do usuário
    tituloDashboard.textContent = `Bem-vindo à tua Dashboard`;
    usuarioInfo.innerHTML = `
      <p><strong>Username:</strong> ${dados.username || ""}</p>
      <p><strong>Role:</strong> ${role}</p>
    `;

  } catch (erro) {
    console.error("Erro de conexão:", erro);
    logout();
  }
}

// Chamar função ao carregar a página
window.addEventListener("DOMContentLoaded", carregarDashboard);
