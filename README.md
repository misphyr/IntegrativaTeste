# Controle de Processos Judiciais

Este é um projeto completo de gerenciamento de processos judiciais com backend em .NET 9/C# e frontend em Angular, containerizado com Docker.

## 📋 Estrutura do Projeto

```
TesteIntegrativa/
├── controle-processos-server/     # Backend .NET 9
│   ├── src/
│   │   └── Api/
│   │       ├── Controllers/
│   │       ├── Models/
│   │       ├── Persistence/
│   │       ├── Requests/
│   │       ├── Services/
│   │       └── Program.cs
│   ├── controle-processos-server.sln
│   └── Dockerfile
├── controle-processos-client/     # Frontend Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   ├── models/
│   │   │   └── app.component.ts
│   │   ├── main.ts
│   │   ├── index.html
│   │   └── styles.css
│   ├── angular.json
│   ├── package.json
│   └── README.md
├── compose.yaml                    # Docker Compose
└── README.md                        # Este arquivo
```

## 🚀 Início Rápido

### ⚙️ Pré-requisitos

Você precisa ter instalado:
- **Docker** (versão 20.10+) - [Download](https://www.docker.com/products/docker-desktop)
- **Docker Compose** (versão 2.0+)

### Opção 1: Com Docker Compose (Recomendado) ✨

Na raiz do projeto, execute:

```bash
docker-compose up -d
```

Este comando irá:
- ✅ Criar e iniciar o banco de dados PostgreSQL
- ✅ Compilar e iniciar a API .NET 9
- ✅ Compilar e iniciar o cliente Angular
- ✅ Criar volumes para persistência de dados

**Acessar a aplicação:**
- 🌐 Frontend (Angular): http://localhost:4200
- 📡 API (.NET): http://localhost:5000
- 🗄️ Banco de Dados (PostgreSQL): localhost:5432

**Credenciais do Banco:**
```
Usuário: postgres
Senha: postgres
Banco: controleProcessos
```

### Opção 2: Execução Manual (Desenvolvimento)

#### Backend .NET

```bash
cd controle-processos-server
dotnet restore
dotnet run
```

Backend rodará em `http://localhost:5000`

#### Frontend Angular

```bash
cd controle-processos-client
npm install
npm start
```

Frontend rodará em `http://localhost:4200`

## 📋 Funcionalidades

### Backend (API .NET)

- ✅ CRUD completo de Processos
- ✅ Endpoints REST bem estruturados
- ✅ Entity Framework Core com PostgreSQL
- ✅ Migrações automáticas
- ✅ Validação de dados
- ✅ Resposta JSON padronizada

### Frontend (Angular)

- ✅ Interface responsiva com Tailwind CSS
- ✅ Listagem de processos com filtros e busca
- ✅ Formulário modal para CRUD
- ✅ Atualização de status inline
- ✅ Validação de campos
- ✅ Tratamento de erros
- ✅ Loading states

## 🛠️ Tecnologias

### Backend
- .NET 9
- Entity Framework Core
- PostgreSQL
- C#

### Frontend
- Angular 18
- TypeScript 5.4
- Tailwind CSS 3.4
- RxJS 7.8

## 📦 Requisitos

- Docker & Docker Compose (recomendado) OU
- .NET 9 SDK
- Node.js 18+
- PostgreSQL 15+ (se não usar Docker)

## 🐳 Docker Compose

O arquivo `compose.yaml` inclui:

```yaml
services:
  api:
    build: ./controle-processos-server
    ports:
      - "5000:8080"
  
  client:
    build: ./controle-processos-client
    ports:
      - "4200:4200"
  
  postgres:
    image: postgres:15
    ports:
      - "5432:5432"
```

## 📚 Estrutura de Dados

### Tabela: Processos

| Campo | Tipo | Descrição |
|-------|------|-----------|
| Id | long | ID único |
| NumeroProcesso | string | Número do processo |
| Autor | string | Nome do autor |
| Reu | string | Nome do réu |
| Status | enum | Estado do processo |
| Descricao | string | Descrição |
| DataAjuizamento | datetime | Data de ajuizamento |
| DataInclusao | datetime | Data de criação |

### Tabela: Historicos

| Campo | Tipo | Descrição |
|-------|------|-----------|
| Id | long | ID único |
| ProcessoId | long | FK para Processo |
| Descricao | string | Descrição |
| DataInclusao | datetime | Data de criação |
| DataAlteracao | datetime | Data de alteração |
