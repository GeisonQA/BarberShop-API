// @ts-check
import { test, expect } from '@playwright/test';
import { generateUser} from '../../playwright/support/user.js'


test.describe('POST/auth/cadastro', () => {

  test('Deve cadastrar novo usuário com credenciais válidas', async ({ request }) => {

    const newUser = generateUser();

    const response = await request.post('http://localhost:3000/api/auth/cadastro', {
      data: newUser
    })

    const responseBody = await response.json();


    expect(response.status()).toBe(201)
    expect(responseBody).toHaveProperty("id")
    expect(responseBody).toHaveProperty("nome", newUser.nome)
    expect(responseBody).toHaveProperty("email", newUser.email)
    expect(responseBody).not.toHaveProperty("senha")

  });

  test('Deve retornar erro ao cadastrar usuário com email já existente', async ({ request }) => {

    const newUser = generateUser();

    const response = await request.post('http://localhost:3000/api/auth/cadastro', {
      data: newUser
    })

    const newResponse = await request.post('http://localhost:3000/api/auth/cadastro', {
      data: newUser
    })
    const newResponseBody = await newResponse.json();


    expect(response.status()).toBe(201)
    expect(newResponse.status()).toBe(409)
    expect(newResponseBody).toHaveProperty('mensagem', 'Email já cadastrado')
  })

  test('Deve retornar erro ao cadastrar usuário com dados inválidos', async ({ request }) => {

    const formatoInvalido = {
      nome: "",
      email: "12&gmail.com",
      senha: "1234567"
    }


    const response = await request.post('http://localhost:3000/api/auth/cadastro', {
      data: formatoInvalido
    })

    const responseBody = await response.json();


    expect(response.status()).toBe(400)
    expect(responseBody.erros).toContainEqual(
      expect.objectContaining({ 
        msg: "Invalid value",
        param: "nome",
        location: "body"
      }),
      
    )
    
   

  });




})