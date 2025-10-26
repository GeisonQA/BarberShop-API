module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Barbeiro', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING, allowNull: false }
  }, { tableName: 'barbeiros', timestamps: false });
};
