import jwt from "jsonwebtoken";

export function verificarToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ mensagem: "Token não fornecido" });
    }

    const token = authHeader.split(" ")[1]; // Bearer token

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = decoded; // adiciona dados do usuário à requisição
        next();
    } catch (erro) {
        return res.status(401).json({ mensagem: "Token inválido" });
    }
}
