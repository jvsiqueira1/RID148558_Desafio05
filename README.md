# Desafio05-Back (API Biblioteca)

API RESTful para gerenciamento de livros de uma biblioteca, desenvolvida em Node.js com Express e SQLite.

> **Nota:** O banco de dados e a tabela `books` (em inglês) são criados automaticamente ao rodar o projeto. Não é necessário rodar comandos extras ou versionar o arquivo `.sqlite`.

## Sumário
- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Como rodar](#como-rodar)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Rotas da API](#rotas-da-api)
- [Exemplos de Requisição](#exemplos-de-requisição)

---

## Requisitos
- Node.js

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/jvsiqueira1/RID148558_Desafio05.git
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```

## Como rodar

```bash
npm start
```

O servidor irá rodar por padrão na porta **3000**.

---

## Estrutura do Projeto

```
RID148558_Desafio05/
├── biblioteca_db.sqlite        # Banco de dados SQLite
├── package.json                # Dependências e scripts
└── src/
    ├── server.js               # Ponto de entrada da aplicação
    ├── config/
    │   └── database.js         # Configuração do banco
    ├── controller/
    │   └── book.controller.js  # Controllers das rotas
    ├── repository/
    │   └── book.repository.js  # Acesso ao banco
    ├── routes/
    │   ├── book.routes.js      # Rotas de livros
    │   └── index.js            # Rotas principais
    └── service/
        └── book.service.js     # Regras de negócio
```

---

## Rotas da API

### Listar todos os livros
- **GET** `/livros`

### Buscar livro por ID
- **GET** `/livros/:id`

### Cadastrar novo livro
- **POST** `/livros`
  - Body (JSON):
    ```json
    {
      "titulo": "Nome do Livro",
      "num_paginas": 123,
      "isbn": "1234567890",
      "editora": "Nome da Editora"
    }
    ```

### Atualizar livro
- **PUT** `/livros/:id`
  - Body (JSON):
    ```json
    {
      "titulo": "Novo Título",
      "num_paginas": 321,
      "isbn": "0987654321",
      "editora": "Nova Editora"
    }
    ```
  - Resposta:
    ```json
    {
      "mensagem": "Livro atualizado com sucesso",
      "id": 1,
      "titulo": "Novo Título",
      "num_paginas": 321,
      "isbn": "0987654321",
      "editora": "Nova Editora"
    }
    ```

### Deletar livro
- **DELETE** `/livros/:id`
  - Resposta:
    ```json
    {
      "mensagem": "Livro deletado com sucesso",
      "id": 1
    }
    ```

---

## Observações
- O campo `id` é gerado automaticamente pelo banco e não deve ser enviado no cadastro.
- Todos os campos devem ser enviados em português, conforme exemplos acima.
- O backend já faz a tradução automática para o formato interno.
- O CORS está habilitado para qualquer origem.
- **O banco de dados e a tabela `books` (em inglês) são criados automaticamente ao rodar o projeto. Não é necessário rodar comandos manuais para isso.**

---

## Autor
- Projeto desenvolvido para desafio DNC. 

---

## Ajuste no Frontend

> **Importante:**
> Foi necessário corrigir o formulário de atualização de livros no frontend para evitar o comportamento padrão de recarregar a página ao clicar em "Atualizar Livro". O formulário agora utiliza o evento `onSubmit` com `e.preventDefault()` para garantir que a requisição de update seja enviada corretamente via JavaScript, sem refresh. Sem esse ajuste, o update não funcionava corretamente.

--- 

## Deploy do Frontend

O frontend React integrado a esta API está disponível em:

➡️ [Acesse o sistema online na Netlify](https://glowing-kashata-bbde2b.netlify.app/)

---

## Alterações realizadas no Frontend para integração

- **Formulário de Cadastro e Edição:**
  - Ajustado para usar `onSubmit` no `<form>` com `e.preventDefault()` para evitar o comportamento padrão de recarregar a página e garantir que as requisições sejam feitas via JavaScript (AJAX).
  - O botão de submit foi mantido como `type="submit"` para seguir o padrão HTML, mas toda a lógica de envio é controlada pelo React.
  - Após o cadastro, o formulário é resetado corretamente usando `document.getElementById('formulario').reset()`.
- **Mensagens de Sucesso:**
  - O backend foi ajustado para retornar apenas a string de sucesso no cadastro, garantindo que o alert do frontend mostre a mensagem corretamente sem necessidade de alterar a lógica do front.

Essas alterações garantem que a integração entre o frontend fornecido e a API desenvolvida funcione perfeitamente, sem necessidade de grandes mudanças no código original do front. 