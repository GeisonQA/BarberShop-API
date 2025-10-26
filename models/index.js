const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', 'database.sqlite'),
  logging: false,
});

const Usuario = require('./usuario')(sequelize, DataTypes);
const Barbeiro = require('./barbeiro')(sequelize, DataTypes);
const Servico = require('./servico')(sequelize, DataTypes);
const Agendamento = require('./agendamento')(sequelize, DataTypes);

Usuario.hasMany(Agendamento, { foreignKey: 'usuarioId' });
Agendamento.belongsTo(Usuario, { foreignKey: 'usuarioId' });
Barbeiro.hasMany(Agendamento, { foreignKey: 'barbeiroId' });
Agendamento.belongsTo(Barbeiro, { foreignKey: 'barbeiroId' });
Servico.hasMany(Agendamento, { foreignKey: 'servicoId' });
Agendamento.belongsTo(Servico, { foreignKey: 'servicoId' });

async function seedInitial() {
  const barbeiros = await Barbeiro.count();
  if (barbeiros === 0) {
    await Barbeiro.bulkCreate([
      { nome: 'Carlos' },
      { nome: 'Marcos' },
      { nome: 'João' }
    ]);
  }
  const servicos = await Servico.count();
  if (servicos === 0) {
    await Servico.bulkCreate([
      { nome: 'Barba', duracaoMinutos: 20, preco: 20.00 },
      { nome: 'Barba + Limpeza de pele', duracaoMinutos: 40, preco: 35.00 },
      { nome: 'Barba + Pigmentação', duracaoMinutos: 35, preco: 32.00 },
      { nome: 'Barba + Sobrancelha', duracaoMinutos: 30, preco: 28.00 },
      { nome: 'Corte', duracaoMinutos: 30, preco: 30.00 },
      { nome: 'Corte + Barba', duracaoMinutos: 60, preco: 50.00 },
      { nome: 'Corte + Barba + Limpeza de Pele', duracaoMinutos: 70, preco: null },
      { nome: 'Corte + Barba + Pigmentação', duracaoMinutos: 75, preco: 62.00 }
    ]);
  }
}

module.exports = { sequelize, Usuario, Barbeiro, Servico, Agendamento, seedInitial };
