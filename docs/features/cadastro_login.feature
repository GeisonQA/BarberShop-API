# language: pt
Funcionalidade: Cadastro e Login de Usuário
  Para acessar os recursos protegidos da API
  Como um novo usuário
  Eu quero me cadastrar e autenticar

  Cenário: Cadastro de novo usuário com dados válidos
    Dado que não existe usuário com o email "joao@exemplo.com"
    Quando eu envio uma requisição POST para "/api/auth/cadastro" com nome "João", email "joao@exemplo.com" e senha "senha123"
    Então a resposta deve ter status 201
    E o corpo deve conter o email "joao@exemplo.com"

  Cenário: Cadastro com email já existente
    Dado que já existe usuário com o email "joao@exemplo.com"
    Quando eu envio uma requisição POST para "/api/auth/cadastro" com nome "João", email "joao@exemplo.com" e senha "senha123"
    Então a resposta deve ter status 409
    E o corpo deve conter a mensagem "Email já cadastrado"

  Cenário: Login com credenciais válidas
    Dado que existe usuário com email "joao@exemplo.com" e senha "senha123"
    Quando eu envio uma requisição POST para "/api/auth/login" com email "joao@exemplo.com" e senha "senha123"
    Então a resposta deve ter status 200
    E o corpo deve conter um token JWT

  Cenário: Login com senha incorreta
    Dado que existe usuário com email "joao@exemplo.com" e senha "senha123"
    Quando eu envio uma requisição POST para "/api/auth/login" com email "joao@exemplo.com" e senha "errada"
    Então a resposta deve ter status 401
    E o corpo deve conter a mensagem "Credenciais inválidas"
