const express = require('express');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');
const { SEGREDO } = require('../middleware/auth');

const router = express.Router();

// Cadastro de novo usuário
router.post('/cadastro',
  body('nome').notEmpty(),
  body('email').isEmail(),
  body('senha').isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ erros: errors.array() });
    const { nome, email, senha } = req.body;
    try {
      const existe = await Usuario.findOne({ where: { email } });
      if (existe) return res.status(409).json({ mensagem: 'Email já cadastrado' });
      const usuario = await Usuario.create({ nome, email, senhaHash: senha });
      return res.status(201).json({ id: usuario.id, nome: usuario.nome, email: usuario.email });
    } catch (err) {
      return res.status(500).json({ mensagem: 'Erro no servidor', erro: err.message });
    }
  }
);

// Login
router.post('/login',
  body('email').isEmail(),
  body('senha').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ erros: errors.array() });
    const { email, senha } = req.body;
    try {
      const usuario = await Usuario.findOne({ where: { email } });
      if (!usuario) return res.status(401).json({ mensagem: 'Credenciais inválidas' });
      const ok = await usuario.verificarSenha(senha);
      if (!ok) return res.status(401).json({ mensagem: 'Credenciais inválidas' });
      const token = jwt.sign({ id: usuario.id, email: usuario.email }, SEGREDO, { expiresIn: '7d' });
      return res.status(200).json({ token, usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email } });
    } catch (err) {
      return res.status(500).json({ mensagem: 'Erro no servidor', erro: err.message });
    }
  }
);

module.exports = router;
