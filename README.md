
# Barbearia - API de Agendamento

API REST completa para agendamento de barbearia, com autenticação JWT, CRUD de agendamentos, listagem de barbeiros e serviços, documentação Swagger e mensagens/status em português.

## Visão Geral
Esta API permite:
- Cadastro e autenticação de usuários (JWT)
- Agendar, editar, cancelar e listar agendamentos
- Escolher barbeiro, serviço, data e horário
- Listar barbeiros e serviços disponíveis
- Testar endpoints via Swagger

## Estrutura de Pastas
```
├── index.js                # Servidor principal Express
├── package.json            # Dependências e scripts
├── database.sqlite         # Banco SQLite gerado automaticamente
├── models/                 # Modelos Sequelize
│   ├── index.js
│   ├── usuario.js
│   ├── barbeiro.js
│   ├── servico.js
│   └── agendamento.js
├── routes/                 # Rotas da API
│   ├── auth.js
│   ├── barbers.js
│   ├── services.js
│   └── appointments.js
├── middleware/             # Middlewares
│   └── auth.js
├── docs/                   # Documentação Swagger
│   └── swagger.yaml
└── README.md               # Documentação do projeto
```

## Tecnologias Utilizadas
- Node.js + Express
- Sequelize ORM + SQLite
- JWT (jsonwebtoken)
- bcrypt
- Swagger (swagger-ui-express + yamljs)
- Express Validator

## Instalação e Execução
1. Instale as dependências:
   ```powershell
   npm install
   ```
2. Inicie a API:
   ```powershell
   npm start
   ```
3. Acesse a documentação Swagger:
   [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

### Variáveis de Ambiente
- `JWT_SECRET`: segredo para assinar tokens JWT (opcional, padrão definido no código)
- `PORT`: porta do servidor (padrão 3000)

## Modelos (Sequelize)
- **Usuario**: id, nome, email, senhaHash
- **Barbeiro**: id, nome
- **Servico**: id, nome, duracaoMinutos, preco
- **Agendamento**: id, usuarioId, barbeiroId, servicoId, data, observacoes, status

## Endpoints Principais
- POST `/api/auth/cadastro` — cadastrar novo usuário
- POST `/api/auth/login` — autenticar e obter token JWT
- GET `/api/barbeiros` — listar barbeiros
- POST `/api/barbeiros` — criar barbeiro (autenticado)
- GET `/api/servicos` — listar serviços
- POST `/api/servicos` — criar serviço (autenticado)
- POST `/api/agendamentos` — criar agendamento (autenticado)
- GET `/api/agendamentos` — listar agendamentos do usuário
- GET/PUT/DELETE `/api/agendamentos/{id}` — operações no agendamento (somente dono)

## Status Code por Endpoint
- 201 Created — criação bem-sucedida
- 200 OK — consulta/atualização bem-sucedida
- 204 No Content — remoção bem-sucedida
- 400 Bad Request — dados inválidos
- 401 Unauthorized — token ausente/inválido
- 403 Forbidden — usuário não proprietário
- 404 Not Found — recurso não encontrado
- 409 Conflict — email já cadastrado

## Exemplos de Requisições
- **Cadastro:**
  ```http
  POST /api/auth/cadastro
  Content-Type: application/json
  {
    "nome": "João",
    "email": "joao@exemplo.com",
    "senha": "senha123"
  }
  ```
- **Login:**
  ```http
  POST /api/auth/login
  Content-Type: application/json
  {
    "email": "joao@exemplo.com",
    "senha": "senha123"
  }
  ```
- **Criar agendamento (com token JWT):**
  ```http
  POST /api/agendamentos
  Authorization: Bearer <seu_token_jwt>
  Content-Type: application/json
  {
    "barbeiroId": 1,
    "servicoId": 2,
    "data": "2025-11-01T10:00:00.000Z",
    "observacoes": "Corte curto"
  }
  ```

## Respostas de Exemplo
- **Cadastro bem-sucedido:**
  ```json
  {
    "id": 1,
    "nome": "João",
    "email": "joao@exemplo.com"
  }
  ```
- **Login bem-sucedido:**
  ```json
  {
    "token": "<jwt>",
    "usuario": {
      "id": 1,
      "nome": "João",
      "email": "joao@exemplo.com"
    }
  }
  ```
- **Erro de validação:**
  ```json
  {
    "erros": [ { "msg": "Email inválido", ... } ]
  }
  ```

## Troubleshooting
- **Porta ocupada (EADDRINUSE):**
  Finalize o processo que está usando a porta 3000:
  ```powershell
  netstat -ano | findstr :3000
  taskkill /PID <PID> /F
  ```
- **Banco não criado:**
  O arquivo `database.sqlite` será gerado automaticamente ao rodar a API.
- **Erro de autenticação:**
  Verifique se está enviando o token JWT no header `Authorization: Bearer <token>`.

## Testes Locais
- Use o Swagger (`/api-docs`) para testar todos os endpoints.
- Pode usar Postman, Insomnia ou curl para testar manualmente.

## Melhorias Futuras
- Prevenção de agendamento duplicado para o mesmo barbeiro/horário
- Testes automatizados (Jest/Supertest)
- Integração com outros bancos (PostgreSQL, MySQL)
- Paginação e filtros avançados
- Permissões de administrador

## Links Úteis
- [Documentação Express](https://expressjs.com/pt-br/)
- [Documentação Sequelize](https://sequelize.org/)
- [Documentação Swagger](https://swagger.io/)

---
Projeto desenvolvido para fins didáticos e práticos. Qualquer dúvida ou sugestão, abra uma issue ou entre em contato!
