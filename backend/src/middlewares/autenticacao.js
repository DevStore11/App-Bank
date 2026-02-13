import jwt from "jsonwebtoken";

// Verificar token e anexar usuário à requisição
export function verificarToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ erro: "Token não fornecido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const dados = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = dados;
    next();
  } catch {
    return res.status(401).json({ erro: "Token inválido" });
  }
}

// Verificar se usuário é admin
export function verificarAdmin(req, res, next) {
  if (req.usuario.role !== "admin") {
    return res.status(403).json({ erro: "Acesso negado" });
  }
  next();
}
