# Controle de Processos Judiciais

Este é um projeto completo de gerenciamento de processos judiciais com backend em .NET/C# e frontend em Angular.

## 📋 Estrutura do Projeto

```
TesteIntegrativa/
├── controle-processos-server/     # Backend .NET/C#
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

### Opção 1: Com Docker Compose (Recomendado)

```bash
# Na raiz do projeto
docker compose up
```

Isso iniciará:
- Backend em `http://localhost:5000`
- Frontend em `http://localhost:4200`
- Banco de dados PostgreSQL

### Opção 2: Manualmente

#### Backend

```bash
cd controle-processos-server
dotnet restore
dotnet run
```

Backend rodará em `http://localhost:5000`

#### Frontend

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

**Endpoints:**
- `POST /processos` - Criar processo
- `GET /processos` - Listar processos
- `PUT /processos/{id}` - Atualizar processo
- `DELETE /processos/{id}` - Deletar processo

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

## 📝 Configuração

### Backend

Variáveis de ambiente em `controle-processos-server/src/Api/appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=postgres;Port=5432;Database=controle_processos;User Id=postgres;Password=postgres;"
  }
}
```

### Frontend

URL da API em `controle-processos-client/src/app/services/processo.service.ts`:

```typescript
private apiUrl = 'http://localhost:5000/processos';
```

## 🔄 Fluxo de Dados

```
Frontend (Angular)
    ↓
HTTP Client
    ↓
Backend API (.NET)
    ↓
Entity Framework Core
    ↓
PostgreSQL Database
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

## 🧪 Testes

### Backend

```bash
cd controle-processos-server
dotnet test
```

### Frontend

```bash
cd controle-processos-client
npm test
```

## 📖 Documentação Detalhada

- [Backend README](./controle-processos-server/README.md)
- [Frontend README](./controle-processos-client/README.md)

## 🐛 Troubleshooting

### Erro de conexão com banco de dados
- Verifique se PostgreSQL está rodando
- Confirme as credenciais em `appsettings.json`

### Frontend não conecta ao backend
- Verifique se backend está rodando em `http://localhost:5000`
- Confirme CORS habilitado no backend

### Porta já em uso
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :5000
kill -9 <PID>
```

## 📞 Suporte

Para dúvidas ou problemas, verifique:
1. Os READMEs específicos de cada projeto
2. Os logs do Docker: `docker compose logs`
3. O console do navegador (frontend)
4. O output do terminal (backend)

## 📄 Licença

Projeto educacional - 2025

## 👨‍💻 Autor

Desenvolvido como solução do desafio de Controle de Processos Judiciais.

---

**Última atualização**: 30 de Novembro de 2025
