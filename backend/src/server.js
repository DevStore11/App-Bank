import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Rotas
import usuarioRotas from "./routers/UsuarioRotas.js";
import authRotas from "./auth/authRoutes.js";       // rota de login
import dashboardRotas from "./routers/DashboardRotas.js"; // rota privada dashboard

dotenv.config();

const app = express();
const PORTA = process.env.PORT || 3000;

// Resolver __dirname em ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ================= MIDDLEWARES GLOBAIS =================
app.use(cors());
app.use(express.json());

// Pastas estáticas (frontend)
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

// ================= ROTAS API =================
app.use("/api/usuarios", usuarioRotas);   // CRUD de usuários
app.use("/api/auth", authRotas);          // login
app.use("/api/dashboard", dashboardRotas);// rota privada da dashboard

// ================= SERVIDOR =================
app.listen(PORTA, () => {
    console.log(`Servidor activo em http://localhost:${PORTA}`);
    console.log(`Frontend → http://localhost:${PORTA}`);
});
