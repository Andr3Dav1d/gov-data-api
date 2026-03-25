# Gov Data API (BrasilAPI Proxy)

API REST construída em **Node.js + Express** que consome dados públicos da **BrasilAPI**, normaliza as respostas e expõe endpoints próprios com **cache, paginação, filtros, tratamento de erros e documentação automática (Swagger)**.

O objetivo deste projeto é demonstrar boas práticas de desenvolvimento backend, como **arquitetura modular, integração com APIs externas e documentação de endpoints**.

---

# ✨ Features

- Consumo de API pública (BrasilAPI)
- Normalização de dados
- Cache em memória para reduzir chamadas externas
- Paginação de resultados
- Filtros por query
- Tratamento padronizado de erros
- Logs de requisição
- Documentação automática com **Swagger / OpenAPI**
- Estrutura backend organizada

---

# 🧱 Arquitetura do Projeto

```

src
├ server.js
├ app.js
├ routes
│  ├ index.js
│  ├ feriados.routes.js
│  └ bancos.routes.js
├ controllers
│  ├ feriados.controller.js
│  └ bancos.controller.js
├ services
│  └ brasilapi.service.js
├ cache
│  └ memoryCache.js
├ middlewares
│  └ error.middleware.js
└ docs
└ swagger.js

````

### Camadas

**Routes**
- Define os endpoints da API

**Controllers**
- Contém a lógica das requisições
- Validação de parâmetros
- Normalização dos dados

**Services**
- Comunicação com APIs externas

**Cache**
- Armazenamento temporário em memória

**Middlewares**
- Tratamento padronizado de erros

**Docs**
- Configuração do Swagger/OpenAPI

---

# 🚀 Como executar

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/Andr3Dav1d/gov-data-api.git
````

### 2️⃣ Entrar na pasta

```bash
cd gov-data-api
```

### 3️⃣ Instalar dependências

```bash
npm install
```

### 4️⃣ Iniciar o servidor

```bash
npm start
```

---

# 🌐 Endpoints da API

Base URL:

```
http://localhost:3000
```

---

# 📅 Feriados por ano

```
GET /api/v1/feriados/{ano}
```

### Exemplo

```
/api/v1/feriados/2026
```

### Resposta

```json
{
  "source": "upstream",
  "year": 2026,
  "data": [
    {
      "date": "2026-01-01",
      "name": "Confraternização Universal",
      "type": "national"
    }
  ]
}
```

---

# 🏦 Listar bancos

```
GET /api/v1/bancos
```

### Query Parameters

| parâmetro | descrição                |
| --------- | ------------------------ |
| q         | filtra por nome do banco |
| page      | número da página         |
| limit     | quantidade de resultados |

### Exemplo

```
/api/v1/bancos?q=brasil&page=1&limit=10
```

---

# 🔎 Buscar banco por código

```
GET /api/v1/bancos/{codigo}
```

### Exemplo

```
/api/v1/bancos/341
```

### Resposta

```json
{
  "data": {
    "code": 341,
    "name": "Itaú",
    "fullName": "Itaú Unibanco S.A.",
    "ispb": "60701190"
  }
}
```

---

# 📚 Documentação Swagger

A documentação interativa pode ser acessada em:

```
http://localhost:3000/docs
```

Ela permite:

* visualizar endpoints
* testar requisições
* ver parâmetros e respostas

---

# ⚡ Cache

A API utiliza **cache em memória** para reduzir chamadas repetidas à BrasilAPI.

TTL padrão:

```
10 minutos
```

Fluxo:

```
Requisição 1 → BrasilAPI (upstream)
Requisição 2 → Cache local
```

Isso melhora performance e reduz dependência da API externa.

---

# 🧰 Tecnologias Utilizadas

* Node.js
* Express
* CORS
* Morgan
* Swagger UI
* Swagger JSDoc

---

# 📡 Fonte dos Dados

Os dados são obtidos através da:

**BrasilAPI**

[https://brasilapi.com.br/](https://brasilapi.com.br/)

---

# 🎯 Objetivo do Projeto

Este projeto foi desenvolvido com foco em:

* prática de arquitetura backend
* integração com APIs externas
* criação de APIs documentadas
* aplicação de boas práticas em Node.js

---

# 📄 Licença

Este projeto está sob a licença MIT.
