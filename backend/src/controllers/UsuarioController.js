import UsuarioCadastroServico from "../services/UsuarioCadastroServico.js";

const cadastroServico = new UsuarioCadastroServico();

export async function cadastrarUsuario(req, res) {
  try {
    const resultado = await cadastroServico.executar(req.body);
    res.status(201).json(resultado);
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
}
