import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import usuarioRotas from "./routers/UsuarioRotas.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Resolver __dirname no ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Permitir frontend externo (docs/pages)
app.use(cors());
app.use(express.json());

// Servir pasta estática docs/pages para assets (HTML, CSS, JS)
app.use("/pages", express.static(path.join(__dirname, "../../docs/pages")));
app.use("/assets", express.static(path.join(__dirname, "../../docs/assets"))); // se tiver CSS/JS separados

// Rota explícita para cadastro.html
app.get("/cadastro", (req, res) => {
  res.sendFile(path.join(__dirname, "../../docs/pages/cadastro.html"));
});

// Rotas da API
app.use("/api/usuarios", usuarioRotas);

// Servidor activo
app.listen(PORT, () => {
  console.log(`Servidor bancário activo em http://localhost:${PORT}`);
  console.log(`Frontend disponível em http://localhost:${PORT}/cadastro`);
});
