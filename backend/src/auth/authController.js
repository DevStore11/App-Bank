import jwt from "jsonwebtoken";
import UsuarioRepositorio from "../repositories/UsuarioRepositorio.js";

export async function login(req, res) {
    try {
        const { username, senha } = req.body;

        // Validação simples
        if (!username || !senha) {
            return res.status(400).json({ mensagem: "Username e senha são obrigatórios" });
        }

        // Buscar usuário pelo username
        const usuario = await UsuarioRepositorio.buscarPorUsername(username);

        if (!usuario) {
            return res.status(401).json({ mensagem: "Credenciais inválidas" });
        }

        // Validar senha usando método do repositório
        const senhaValida = await UsuarioRepositorio.validarSenha(usuario, senha);
        if (!senhaValida) {
            return res.status(401).json({ mensagem: "Credenciais inválidas" });
        }

        // Criar JWT
        const token = jwt.sign(
            { id: usuario.id, username: usuario.username, role: usuario.role ?? "cliente" },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Retorna token e mensagem
        return res.status(200).json({
            mensagem: "Login realizado com sucesso",
            token
        });

    } catch (erro) {
        console.error("Erro no login:", erro);
        return res.status(500).json({ mensagem: "Erro interno no servidor" });
    }
}
