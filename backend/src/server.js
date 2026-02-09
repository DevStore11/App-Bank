import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import usuarioRotas from "./routers/UsuarioRotas.js";

dotenv.config();

const app = express();
const PORTA = process.env.PORT || 3000;

// Resolver __dirname em ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares globais
app.use(cors());
app.use(express.json());

// Pastas estáticas (frontend)
app.use("/assets", express.static(path.join(__dirname, "../../docs/assets")));
app.use("/pages", express.static(path.join(__dirname, "../../docs/pages")));

// ================= ROTAS FRONTEND =================

// Página inicial → index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../docs/index.html"));
});

// Página cadastro
app.get("/cadastro", (req, res) => {
    res.sendFile(path.join(__dirname, "../../docs/pages/cadastro.html"));
});

// Página login
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../../docs/pages/login.html"));
});

// ================= ROTAS API =================
app.use("/api/usuarios", usuarioRotas);

// Servidor
app.listen(PORTA, () => {
    console.log(`Servidor activo em http://localhost:${PORTA}`);
    console.log(`Frontend → http://localhost:${PORTA}`);
});
