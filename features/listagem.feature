# language: pt
Funcionalidade: Listagem de Barbeiros, Serviços e Agendamentos
  Para escolher opções e acompanhar meus agendamentos
  Como usuário
  Eu quero visualizar barbeiros, serviços e meus agendamentos

  Cenário: Listar barbeiros
    Quando eu envio uma requisição GET para "/api/barbeiros"
    Então a resposta deve ter status 200
    E o corpo deve conter uma lista de barbeiros

  Cenário: Listar serviços
    Quando eu envio uma requisição GET para "/api/servicos"
    Então a resposta deve ter status 200
    E o corpo deve conter uma lista de serviços

  Cenário: Listar meus agendamentos
    Dado que estou autenticado com token JWT
    Quando eu envio uma requisição GET para "/api/agendamentos"
    Então a resposta deve ter status 200
    E o corpo deve conter uma lista de agendamentos do meu usuário
