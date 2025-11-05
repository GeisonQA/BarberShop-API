# language: pt
Funcionalidade: Agendamento de Serviço
  Para reservar um horário na barbearia
  Como usuário autenticado
  Eu quero agendar, editar e cancelar serviços

  Cenário: Criar agendamento válido
    Dado que estou autenticado com token JWT
    E existe barbeiro com id 1
    E existe serviço com id 2
    Quando eu envio uma requisição POST para "/api/agendamentos" com barbeiroId 1, servicoId 2, data "2025-11-01T10:00:00.000Z" e observacoes "Corte curto"
    Então a resposta deve ter status 201
    E o corpo deve conter barbeiroId 1 e servicoId 2

  Cenário: Editar agendamento próprio
    Dado que estou autenticado com token JWT
    E existe agendamento com id 10 do meu usuário
    Quando eu envio uma requisição PUT para "/api/agendamentos/10" alterando a data para "2025-11-01T11:00:00.000Z"
    Então a resposta deve ter status 200
    E o corpo deve conter a nova data "2025-11-01T11:00:00.000Z"

  Cenário: Cancelar agendamento próprio
    Dado que estou autenticado com token JWT
    E existe agendamento com id 10 do meu usuário
    Quando eu envio uma requisição DELETE para "/api/agendamentos/10"
    Então a resposta deve ter status 204

  Cenário: Editar agendamento de outro usuário
    Dado que estou autenticado com token JWT
    E existe agendamento com id 20 de outro usuário
    Quando eu envio uma requisição PUT para "/api/agendamentos/20" alterando a data
    Então a resposta deve ter status 403
    E o corpo deve conter a mensagem "Proibido"
