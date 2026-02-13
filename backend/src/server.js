import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// ================= ROTAS =================
import usuarioRotas from "./routers/UsuarioRotas.js"; // cadastro, login, dashboards

dotenv.config();

const app = express();
const PORTA = process.env.PORT || 3000;

// Resolver __dirname em ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ================= MIDDLEWARES GLOBAIS =================
app.use(cors());
app.use(express.json());

// ================= PASTAS ESTÁTICAS =================
// Frontend estático
app.use("/assets", express.static(path.join(__dirname, "../../docs/assets")));
app.use("/pages", express.static(path.join(__dirname, "../../docs/pages")));

// ================= ROTAS FRONTEND =================
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../docs/index.html"));
});

app.get("/cadastro", (req, res) => {
  res.sendFile(path.join(__dirname, "../../docs/pages/cadastro.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../../docs/pages/login.html"));
});

app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "../../docs/pages/dashboard.html"));
});

app.get("/dashboard-admin", (req, res) => {
  res.sendFile(path.join(__dirname, "../../docs/pages/dashboard-admin.html"));
});

// ================= ROTAS API =================
// Todas as rotas de usuários (cadastro, login, dashboards protegidos)
app.use("/api/usuarios", usuarioRotas);

// ================= SERVIDOR =================
app.listen(PORTA, () => {
  console.log(`Servidor activo em http://localhost:${PORTA}`);
  console.log(`Frontend → http://localhost:${PORTA}`);
});
