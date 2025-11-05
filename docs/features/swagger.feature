# language: pt
Funcionalidade: Documentação Interativa
  Para facilitar testes e integração
  Como desenvolvedor
  Eu quero acessar a documentação Swagger da API

  Cenário: Acessar Swagger
    Quando eu acesso a URL "/api-docs" no navegador
    Então devo visualizar a interface Swagger com todos os endpoints documentados
