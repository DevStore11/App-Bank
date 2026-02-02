# 🏦 PrimePay

Sistema de aplicação bancária em desenvolvimento, com foco em gestão de contas, transações e segurança.

## 📌 Descrição do Projeto
Este projeto tem como objetivo desenvolver um aplicativo bancário que permita aos usuários:
- Criar e gerir contas
- Realizar transferências
- Consultar saldo e extrato
- Efetuar depósitos e levantamentos
- Garantir segurança e auditoria das operações

O sistema está sendo desenvolvido com uma arquitetura cliente-servidor.

---

## 🛠️ Tecnologias Utilizadas
- Backend: Node.js
- Frontend: 
- Base de Dados: MySQL 8+
- API: RESTful
- Autenticação: JWT / Sessions
- Controle de Versão: Git & GitHub

---

## 🌟 Objetivos de Qualidade e UX
- ✅ **App leve e rápido**
- ✅ **Mensagens de erro claras**
- ✅ **Histórico de transações confiável**
- ✅ **Notificações em tempo real**
- ✅ **Suporte no app (chat/WhatsApp)**
- ✅ **UX simples em português claro**

---

## ✅ Avanços do Projeto

### ✔️ Banco de Dados Criado
- Estrutura completa da base de dados definida
- Tabelas principais implementadas:
  - adm
  - audi_logs
  - cards
  - contas
  - depositos
  - login_atts
  - saques
  - taxas
  - transacoes
  - transfer
  - user_sessions
  - usuario_perfil
  - usuarios

- Relacionamentos e chaves estrangeiras configurados

### ✔️ Server Criado
- Servidor backend inicializado
- Estrutura base do projeto criada
- Configuração para ambiente de desenvolvimento

---

## 📂 Estrutura Inicial do Projeto
```text
/backend
/docs
    EstruturaProject.txt
/src
  server.js

  PrimePay.sql
