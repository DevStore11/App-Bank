window.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Você precisa estar logado.");
        window.location.href = "/login";
        return;
    }

    try {
        const resposta = await fetch("http://localhost:3000/api/dashboard", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const dados = await resposta.json();

        if (resposta.ok) {
            document.getElementById("mensagem-usuario").textContent = dados.mensagem;
        } else {
            alert(dados.mensagem);
            window.location.href = "/login";
        }
    } catch (erro) {
        console.error("Erro ao carregar dashboard:", erro);
        window.location.href = "/login";
    }
});
