# Projeto Next Tarefas

Este é um aplicativo de lista de tarefas desenvolvido com Next.js, utilizando o Firebase para armazenamento de dados e o NextAuth.js para autenticação com o Google.

## Funcionalidades

- Adicionar, remover e editar tarefas.
- Marcar tarefas como completas.
- Visualizar todas as tarefas

## Instalação

npm install
Crie um arquivo .env na raiz do projeto e adicione as credenciais conforme o exemplo abaixo:

NEXTAUTH_URL=http://localhost:3000
JWT_SECRET=80070148325f580e9d427bfc29262229
NEXT_PUBLIC_URL=http://localhost:3000

GOOGLE_CLIENT_ID=903980336716-hm5ft0pbn3kv9c5gd5au7ghu0staga56.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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

Inicie o servidor de desenvolvimento:

npm run dev

#Tecnologias Utilizadas

- Next.js
- React
- CSS
- Firebase (para armazenamento das tarefas)
- NextAuth.js (para autenticação com o Google)
- Desenvolvido por Amana.
