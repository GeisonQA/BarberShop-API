module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Agendamento', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    usuarioId: { type: DataTypes.INTEGER, allowNull: false },
    barbeiroId: { type: DataTypes.INTEGER, allowNull: false },
    servicoId: { type: DataTypes.INTEGER, allowNull: false },
    data: { type: DataTypes.DATE, allowNull: false },
    observacoes: { type: DataTypes.TEXT, allowNull: true },
    status: { type: DataTypes.ENUM('agendado','concluido','cancelado'), allowNull: false, defaultValue: 'agendado' }
  }, { tableName: 'agendamentos', timestamps: true });
};
