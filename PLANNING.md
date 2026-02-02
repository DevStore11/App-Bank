# 📋 Plano de Desenvolvimento - PrimePay

Este documento descreve os próximos passos para o desenvolvimento da aplicação PrimePay.

## 💎 Diretrizes de Implementação
Todas as novas funcionalidades devem respeitar os seguintes pilares:
1.  **Performance:** O código deve ser otimizado para ser leve e rápido.
2.  **Clareza:** Mensagens de erro e textos de interface devem ser claros e em português.
3.  **Confiabilidade:** Garantir a integridade do histórico de transações.
4.  **Tempo Real:** Preparar arquitetura para notificações instantâneas.
5.  **Suporte:** Facilitar o acesso a ajuda (WhatsApp/Chat).

## Backend (Node.js)

A prioridade no backend é construir a camada de API que irá interagir com o banco de dados já criado.

### Fase 1: Configuração e Autenticação

1.  **Conexão com o Banco de Dados:**
    *   [ ] Criar um arquivo de configuração (`backend/config/db.js`) para gerenciar a conexão com o MySQL. Isso centraliza as credenciais e facilita a manutenção.

2.  **Estrutura da API (Rotas e Controladores):**
    *   [x] Criar uma estrutura de pastas para organizar a lógica da API:
        *   `backend/src/routes/`: Para definir os endpoints da API (ex: `authRoutes.js`, `accountRoutes.js`).
        *   `backend/src/controllers/`: Para conter a lógica de negócio de cada rota (ex: `authController.js`).
        *   `backend/src/models/`: Para conter as queries e interações com o banco de dados (ex: `userModel.js`).
        *   `backend/src/middleware/`: Para funções intermediárias, como a verificação de autenticação.

3.  **Implementação da Autenticação de Usuário:**
    *   [ ] **Endpoint de Registo (`POST /api/auth/register`):**
    *   [x] **Endpoint de Registo (`POST /api/auth/register`):**
        *   Receber dados do usuário.
        *   Validar os dados.
        *   Criar um novo registo na tabela `usuarios` e `usuario_perfil`.
        *   Criar uma conta inicial na tabela `contas` associada ao novo usuário.
    *   [ ] **Endpoint de Login (`POST /api/auth/login`):**
    *   [x] **Endpoint de Login (`POST /api/auth/login`):**
        *   Verificar as credenciais do usuário contra a tabela `usuarios`.
        *   Em caso de sucesso, gerar um token (JWT) e registar a sessão na tabela `user_sessions`.
        *   Implementar lógica para a tabela `login_atts` em caso de falha.
    *   [ ] **Middleware de Autenticação:**
    *   [x] **Middleware de Autenticação:**
        *   Criar um middleware que verifica a validade do token JWT em rotas protegidas.

### Fase 2: Funcionalidades Principais da Conta

1.  **Endpoints de Contas (`/api/accounts/...`):**
    *   [ ] `GET /:userId/accounts`: Listar as contas de um usuário.
    *   [ ] `GET /:accountId/balance`: Consultar o saldo de uma conta específica.
    *   [ ] `GET /:accountId/statement`: Obter o extrato (histórico de `transacoes`).

2.  **Endpoints de Transações (`/api/transactions/...`):**
    *   [ ] **Depósito (`POST /deposit`):**
        *   Criar um registo na tabela `depositos`.
        *   Atualizar o saldo na tabela `contas`.
        *   Criar um registo na tabela `transacoes`.
    *   [ ] **Saque (`POST /withdraw`):**
        *   Verificar se há saldo suficiente.
        *   Criar um registo na tabela `saques`.
        *   Atualizar o saldo na tabela `contas`.
        *   Criar um registo na tabela `transacoes`.
    *   [ ] **Transferência (`POST /transfer`):**
        *   Verificar saldo da conta de origem.
        *   Atualizar saldos das contas de origem e destino.
        *   Criar registos nas tabelas `transfer` e `transacoes` para ambas as contas.

### Fase 3: Segurança e Auditoria

1.  **Auditoria (`audi_logs`):**
    *   [ ] Criar um serviço de logging que insere registos na tabela `audi_logs` para operações críticas (login, transferências, alterações de dados).
2.  **Validação de Dados:**
    *   [ ] Adicionar validação robusta em todos os endpoints para prevenir injeção de SQL e dados malformados (sugestão: usar bibliotecas como `Joi` ou `express-validator`).

### Fase 4: Notificações e Suporte
1.  **Infraestrutura de Real-time:**
    *   [ ] Configurar Socket.io ou similar para notificações de transações em tempo real.

---

## Frontend (HTML, CSS, JS)

O frontend irá consumir a API criada no backend. A estrutura de pastas em `/docs` parece ser o local para o frontend.

1.  **Páginas de Autenticação:**
    *   [ ] Finalizar o formulário de registo (`cadastro.html`) para enviar dados ao endpoint `POST /api/auth/register`.
    *   [ ] Criar a lógica no `index.html` para o formulário de login, que irá chamar o `POST /api/auth/login`.
    *   [ ] No `script.js`, criar funções para gerir o token JWT (guardar no `localStorage` após o login e enviá-lo nos cabeçalhos das requisições futuras).

2.  **Dashboard do Usuário:**
    *   [ ] Criar uma nova página `dashboard.html` (acessível apenas após o login).
    *   [ ] Nesta página, fazer uma chamada à API (`GET /:userId/accounts`) para exibir as contas e saldos do usuário.

3.  **Páginas de Funcionalidades:**
    *   [ ] Criar uma página para transferências com um formulário para inserir a conta de destino e o valor.
    *   [ ] Criar uma página/secção para visualizar o extrato da conta.
    *   [ ] Criar formulários para operações de depósito e saque.
    *   [ ] **Suporte:** Adicionar botão flutuante ou link direto para WhatsApp de suporte.
    *   [ ] **UX/UI:** Revisar textos de erro para garantir clareza em português.