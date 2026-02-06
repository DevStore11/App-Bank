import { Router } from "express";
import { cadastrarUsuario } from "../controllers/UsuarioController.js";

const router = Router();

router.post("/cadastro", cadastrarUsuario);

export default router;
