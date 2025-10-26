module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Servico', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    duracaoMinutos: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 30 },
    preco: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 }
  }, { tableName: 'servicos', timestamps: false });
};
