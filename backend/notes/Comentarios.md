Primeira parte feita do App_Bank:
Que consistiu em criar estrutura que permitia fazer o sistema crescer sem quebrar.
Fluxo do backend:
-- Primeiro passa das rotas ->middlewares-->controller-->respositories
O backend foi divididos por pastas 
->routers;
->midllewares;
->controller;
->repositories;
->Service;

O objectivo da criacao desse sistema bancario e entender como funcionam os grandes sistemas bancarios respentado suas regras de negocio, mantendo transparencia com os clientes.
Para criacao fizemos das seguintes ferramentas:
->Node.js:Para backend no servidor;
->html,tailwindcss,js:para frontend;
->MySql:para base de dados,que hospedamos no Aiven;
           ||nota:Aiven permite que a base de dados esteja sempre online;
->Vamos hospedar o App Web no render que tem suporte para backend em node.js;

