const tabela = document.querySelector("#tabelaUsuarios tbody");

// URL base do backend
const BASE_URL = "http://localhost:3000/api/dashboard";

// Função para carregar usuários
export async function carregarUsuarios() {
  try {
    const res = await fetch(`${BASE_URL}/usuarios`);
    if (!res.ok) throw new Error("Erro ao buscar usuários");

    const usuarios = await res.json();
    tabela.innerHTML = "";

    usuarios.forEach(usuario => {
      const linha = document.createElement("tr");
      linha.innerHTML = `
        <td>${usuario.id}</td>
        <td contenteditable="true" data-campo="nome_completo">${usuario.nome_completo}</td>
        <td contenteditable="true" data-campo="email">${usuario.email}</td>
        <td contenteditable="true" data-campo="telefone">${usuario.telefone ?? ""}</td>
        <td>
          <button data-id="${usuario.id}" class="editar">Salvar</button>
          <button data-id="${usuario.id}" class="apagar">Apagar</button>
        </td>
      `;
      tabela.appendChild(linha);
    });

    // Eventos apagar
    document.querySelectorAll(".apagar").forEach(btn => {
      btn.addEventListener("click", async (e) => {
        const id = e.target.dataset.id;
        if(confirm("Tem certeza que deseja apagar este usuário?")) {
          await fetch(`${BASE_URL}/usuarios/${id}`, { method: "DELETE" });
          carregarUsuarios();
        }
      });
    });

    // Eventos editar
    document.querySelectorAll(".editar").forEach(btn => {
      btn.addEventListener("click", async (e) => {
        const id = e.target.dataset.id;
        const linha = e.target.closest("tr");
        const dadosAtualizados = {
          nome_completo: linha.querySelector('[data-campo="nome_completo"]').innerText,
          email: linha.querySelector('[data-campo="email"]').innerText,
          telefone: linha.querySelector('[data-campo="telefone"]').innerText
        };
        await fetch(`${BASE_URL}/usuarios/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dadosAtualizados)
        });
        carregarUsuarios();
      });
    });

  } catch (erro) {
    console.error("Erro ao carregar usuários:", erro);
  }
}

// Carrega ao abrir
carregarUsuarios();
