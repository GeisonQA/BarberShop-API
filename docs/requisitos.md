# Requisitos da API REST Barbearia

## Funcionais
- [ ] Permitir cadastro de novo usuário com nome, email e senha.
- [ ] Validar email único no cadastro (não permitir duplicidade).
- [ ] Permitir autenticação de usuário via login (email e senha).
- [ ] Gerar e retornar token JWT após login bem-sucedido.
- [ ] Proteger rotas sensíveis usando autenticação JWT.
- [ ] Permitir listar barbeiros disponíveis.
- [ ] Permitir cadastrar novos barbeiros (rota protegida).
- [ ] Permitir listar serviços disponíveis.
- [ ] Permitir cadastrar novos serviços (rota protegida).
- [ ] Permitir ao usuário agendar um serviço, escolhendo barbeiro, serviço, data, horário e observações.
- [ ] Permitir ao usuário listar seus próprios agendamentos.
- [ ] Permitir ao usuário editar seus próprios agendamentos.
- [ ] Permitir ao usuário cancelar (deletar) seus próprios agendamentos.
- [ ] Garantir que apenas o dono do agendamento possa editar ou cancelar.
- [ ] Retornar mensagens e status code claros e em português para cada operação.
- [ ] Disponibilizar documentação interativa via Swagger.

## Técnicos
- [ ] Utilizar Node.js e Express como base do servidor.
- [ ] Utilizar Sequelize ORM com banco SQLite.
- [ ] Utilizar bcrypt para hash de senha.
- [ ] Utilizar jsonwebtoken para autenticação JWT.
- [ ] Utilizar express-validator para validação de dados.
- [ ] Utilizar swagger-ui-express e yamljs para documentação.
- [ ] Gerar arquivo de banco `database.sqlite` automaticamente.
- [ ] Permitir configuração de porta e segredo JWT via variáveis de ambiente.

## Não Funcionais
- [ ] Mensagens e documentação em português.
- [ ] Estrutura de pastas organizada por boas práticas (models, routes, middleware, docs).
- [ ] README.md completo com instruções, exemplos, troubleshooting e melhorias futuras.
- [ ] Status code HTTP bem definidos (200, 201, 204, 400, 401, 403, 404, 409).
- [ ] Facilitar testes locais via Swagger, Postman, Insomnia ou curl.

## Melhorias Futuras (Sugestões)
- [ ] Prevenção de agendamento duplicado para o mesmo barbeiro/horário.
- [ ] Testes automatizados (Jest/Supertest).
- [ ] Integração com outros bancos (PostgreSQL, MySQL).
- [ ] Paginação e filtros avançados.
- [ ] Permissões de administrador.
