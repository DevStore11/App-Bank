import express from "express";
import { verificarToken } from "../auth/authMiddleware.js";

const router = express.Router();

// Rota privada: retorna dados do usuário logado
router.get("/", verificarToken, (req, res) => {
    res.status(200).json({
        mensagem: `Bem-vindo ${req.usuario.username}`,
        usuario: req.usuario
    });
});

export default router;
