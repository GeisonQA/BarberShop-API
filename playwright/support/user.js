import { faker } from '@faker-js/faker';

export const generateUser = () => {

    const primeiroNome = faker.person.firstName();
    const segundoNome = faker.person.lastName();
    return {
        nome: `${primeiroNome} ${segundoNome}`,
        email: faker.internet.email({ firstName: primeiroNome, lastName: segundoNome }),
        senha: "1234567"
    }


}
