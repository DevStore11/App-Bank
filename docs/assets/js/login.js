// Seleção do formulário
const formularioLogin = document.getElementById("formulario-login");

formularioLogin.addEventListener("submit", async (evento) => {
    evento.preventDefault(); // Evita reload da página

    // Captura dados do formulário
    const username = document.getElementById("username").value.trim();
    const senha = document.getElementById("senha").value.trim();

    // Validação simples
    if (!username || !senha) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    try {
        // Requisição para o backend
        const resposta = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, senha })
        });

        const dados = await resposta.json();

        if (resposta.ok) {
            // Login bem-sucedido
            localStorage.setItem("token", dados.token); // Salva JWT
            alert(dados.mensagem);

            // Redireciona para dashboard
            window.location.href = "dashboard.html";
        } else {
            // Login falhou
            alert(dados.mensagem || "Erro ao tentar entrar.");
        }

    } catch (erro) {
        console.error("Erro na requisição de login:", erro);
        alert("Erro de conexão com o servidor. Tente novamente.");
    }
});
