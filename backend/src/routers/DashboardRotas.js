import express from "express";
import {listarUsuarios,apagarUsuario,editarUsuario} from "../controllers/UsuarioController.js";

const router = express.Router();

// Listar todos os usuários
router.get("/usuarios",listarUsuarios);

// Apagar usuário
router.delete("/usuarios/:id", apagarUsuario);

// Editar usuário
router.put("/usuarios/:id", editarUsuario);

export default router;
