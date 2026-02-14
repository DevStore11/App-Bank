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

// ================= LISTAR TODOS OS USUÁRIOS =================
export async function listarUsuarios(req, res) {
  try {
    const usuarios = await usuarioRepositorio.listarTodos(); // ✅ novo método no repositório
    res.json(usuarios);
  } catch (erro) {
    console.error("Erro ao listar usuários:", erro.message);
    res.status(500).json({ erro: "Erro ao listar usuários" });
  }
}

// ================= APAGAR USUÁRIO =================
export async function apagarUsuario(req, res) {
  const { id } = req.params;
  try {
    const sucesso = await usuarioRepositorio.apagar(id); // ✅ novo método no repositório
    if (sucesso) {
      res.json({ mensagem: "Usuário apagado com sucesso" });
    } else {
      res.status(404).json({ erro: "Usuário não encontrado" });
    }
  } catch (erro) {
    console.error("Erro ao apagar usuário:", erro.message);
    res.status(500).json({ erro: "Erro ao apagar usuário" });
  }
}

// ================= EDITAR USUÁRIO =================
export async function editarUsuario(req, res) {
  const { id } = req.params;
  const dadosAtualizados = req.body;

  try {
    const sucesso = await usuarioRepositorio.editar(id, dadosAtualizados); // ✅ novo método no repositório
    if (sucesso) {
      res.json({ mensagem: "Usuário atualizado com sucesso" });
    } else {
      res.status(404).json({ erro: "Usuário não encontrado" });
    }
  } catch (erro) {
    console.error("Erro ao atualizar usuário:", erro.message);
    res.status(500).json({ erro: "Erro ao atualizar usuário" });
  }
}
