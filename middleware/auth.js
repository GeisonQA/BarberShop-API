const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

const SEGREDO = process.env.JWT_SECRET || 'segredo-super-seguro';

async function autenticarJWT(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ mensagem: 'Token ausente' });
  }
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, SEGREDO);
    const usuario = await Usuario.findByPk(payload.id);
    if (!usuario) return res.status(401).json({ mensagem: 'Token inválido: usuário não encontrado' });
    req.usuario = usuario;
    next();
  } catch (err) {
    return res.status(401).json({ mensagem: 'Token inválido' });
  }
}

module.exports = { autenticarJWT, SEGREDO };
