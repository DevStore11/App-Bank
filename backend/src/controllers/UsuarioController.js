import UsuarioCadastroServico from "../services/UsuarioCadastroServico.js";
import UsuarioRepositorio from "../repositories/UsuarioRepositorio.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const usuarioRepositorio = new UsuarioRepositorio();
const cadastroServico = new UsuarioCadastroServico();

// ================= CADASTRO DE USUÁRIO =================
export async function cadastrarUsuario(req, res) {
  try {
    const resultado = await cadastroServico.executar(req.body);
    res.status(201).json(resultado);
  } catch (erro) {
    console.error("Erro no cadastro:", erro.message);
    res.status(400).json({ erro: erro.message });
  }
}

// ================= LOGIN DE USUÁRIO =================
// LOGIN DE USUÁRIO
export async function loginUsuario(req, res) {
  const { username, senha } = req.body;

  if (!username || !senha) {
    return res.status(400).json({ erro: "Username e senha são obrigatórios" });
  }

  try {
    // Hardcoded admin
    if (username === "admin" && senha === "12345") {
      const token = jwt.sign(
        { id: 0, username: "admin", role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      return res.json({ mensagem: "Login admin bem-sucedido", token, role: "admin" });
    }

    // Usuário normal
    const usuario = await usuarioRepositorio.buscarPorUsername(username);
    if (!usuario) return res.status(401).json({ erro: "Usuário não encontrado" });

    const senhaValida = await usuarioRepositorio.validarSenha(usuario, senha);
    if (!senhaValida) return res.status(401).json({ erro: "Senha incorreta" });

    const token = jwt.sign(
      { id: usuario.id, username: usuario.username, role: usuario.role ?? "user" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ mensagem: "Login efetuado com sucesso", token, role: usuario.role ?? "user" });

  } catch (erro) {
    console.error("Erro no login:", erro.message);
    res.status(500).json({ erro: "Erro interno ao efetuar login" });
  }
}

