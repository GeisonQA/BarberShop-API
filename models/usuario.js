const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
    senhaHash: { type: DataTypes.STRING, allowNull: false }
  }, {
    timestamps: true,
    tableName: 'usuarios'
  });

  Usuario.prototype.verificarSenha = function (senha) {
    return bcrypt.compare(senha, this.senhaHash);
  };

  Usuario.beforeCreate(async (usuario) => {
    if (usuario.senhaHash) {
      const hash = await bcrypt.hash(usuario.senhaHash, 10);
      usuario.senhaHash = hash;
    }
  });

  return Usuario;
};
