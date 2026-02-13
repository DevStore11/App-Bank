import { verificarToken, verificarAdmin } from "../middlewares/autenticacao.js";

import { Router } from "express";
import { 
  cadastrarUsuario, 
  loginUsuario
  
} from "../controllers/UsuarioController.js";


const router = Router();

// Cadastro
router.post("/cadastro", cadastrarUsuario);

// Login
router.post("/login", loginUsuario);

// Dashboard usuário normal
router.get("/dashboard", verificarToken, (req, res) => {
  res.json({ username: req.usuario.username, role: req.usuario.role });
});

// Dashboard admin
router.get("/dashboard-admin", verificarToken, verificarAdmin, (req, res) => {
  res.json({ username: req.usuario.username, role: req.usuario.role });
});


export default router;
