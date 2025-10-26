# language: pt
Funcionalidade: Proteção de Rotas
  Para garantir segurança dos dados
  Como usuário
  Eu quero que rotas sensíveis sejam protegidas por autenticação JWT

  Cenário: Acessar rota protegida sem token
    Quando eu envio uma requisição POST para "/api/barbeiros" sem header Authorization
    Então a resposta deve ter status 401
    E o corpo deve conter a mensagem "Token ausente"

  Cenário: Acessar rota protegida com token inválido
    Quando eu envio uma requisição POST para "/api/barbeiros" com token JWT inválido
    Então a resposta deve ter status 401
    E o corpo deve conter a mensagem "Token inválido"
