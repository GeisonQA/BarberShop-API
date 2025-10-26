const express = require('express');
const { Servico } = require('../models');
const { autenticarJWT } = require('../middleware/auth');

const router = express.Router();

// Listar serviços (público)
router.get('/', async (req, res) => {
  const lista = await Servico.findAll();
  res.status(200).json(lista);
});

// Criar serviço (protegido)
router.post('/', autenticarJWT, async (req, res) => {
  const { nome, duracaoMinutos, preco } = req.body;
  if (!nome) return res.status(400).json({ mensagem: 'Nome é obrigatório' });
  const s = await Servico.create({ nome, duracaoMinutos: duracaoMinutos || 30, preco: preco || 0 });
  res.status(201).json(s);
});

module.exports = router;
