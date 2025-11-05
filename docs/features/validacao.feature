# language: pt
Funcionalidade: Validação de Dados
  Para garantir integridade dos dados
  Como usuário
  Eu quero receber mensagens claras ao enviar dados inválidos

  Cenário: Cadastro com email inválido
    Quando eu envio uma requisição POST para "/api/auth/cadastro" com email "invalido"
    Então a resposta deve ter status 400
    E o corpo deve conter erro de validação

  Cenário: Agendamento com data inválida
    Dado que estou autenticado com token JWT
    Quando eu envio uma requisição POST para "/api/agendamentos" com data "errada"
    Então a resposta deve ter status 400
    E o corpo deve conter erro de validação
