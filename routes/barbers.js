const express = require('express');
const { Barbeiro } = require('../models');
const { autenticarJWT } = require('../middleware/auth');

const router = express.Router();

// Listar barbeiros (público)
router.get('/', async (req, res) => {
  const lista = await Barbeiro.findAll();
  res.status(200).json(lista);
});

// Criar barbeiro (protegido)
router.post('/', autenticarJWT, async (req, res) => {
  const { nome } = req.body;
  if (!nome) return res.status(400).json({ mensagem: 'Nome é obrigatório' });
  const b = await Barbeiro.create({ nome });
  res.status(201).json(b);
});

module.exports = router;
