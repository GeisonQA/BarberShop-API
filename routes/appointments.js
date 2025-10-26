const express = require('express');
const { body, validationResult } = require('express-validator');
const { Agendamento, Barbeiro, Servico } = require('../models');
const { autenticarJWT } = require('../middleware/auth');

const router = express.Router();

// Criar agendamento
router.post('/', autenticarJWT,
  body('barbeiroId').isInt(),
  body('servicoId').isInt(),
  body('data').isISO8601(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ erros: errors.array() });
    const { barbeiroId, servicoId, data, observacoes } = req.body;
    try {
      const barbeiro = await Barbeiro.findByPk(barbeiroId);
      const servico = await Servico.findByPk(servicoId);
      if (!barbeiro) return res.status(404).json({ mensagem: 'Barbeiro não encontrado' });
      if (!servico) return res.status(404).json({ mensagem: 'Serviço não encontrado' });
      const agendamento = await Agendamento.create({ usuarioId: req.usuario.id, barbeiroId, servicoId, data, observacoes });
      return res.status(201).json(agendamento);
    } catch (err) {
      return res.status(500).json({ mensagem: 'Erro no servidor', erro: err.message });
    }
  }
);

// Listar agendamentos do usuário
router.get('/', autenticarJWT, async (req, res) => {
  const lista = await Agendamento.findAll({ where: { usuarioId: req.usuario.id }, include: [Barbeiro, Servico] });
  res.status(200).json(lista);
});

// Detalhar agendamento
router.get('/:id', autenticarJWT, async (req, res) => {
  const agendamento = await Agendamento.findByPk(req.params.id, { include: [Barbeiro, Servico] });
  if (!agendamento) return res.status(404).json({ mensagem: 'Agendamento não encontrado' });
  if (agendamento.usuarioId !== req.usuario.id) return res.status(403).json({ mensagem: 'Proibido' });
  res.status(200).json(agendamento);
});

// Editar agendamento
router.put('/:id', autenticarJWT, async (req, res) => {
  const agendamento = await Agendamento.findByPk(req.params.id);
  if (!agendamento) return res.status(404).json({ mensagem: 'Agendamento não encontrado' });
  if (agendamento.usuarioId !== req.usuario.id) return res.status(403).json({ mensagem: 'Proibido' });
  const { barbeiroId, servicoId, data, observacoes, status } = req.body;
  try {
    if (barbeiroId) agendamento.barbeiroId = barbeiroId;
    if (servicoId) agendamento.servicoId = servicoId;
    if (data) agendamento.data = data;
    if (observacoes !== undefined) agendamento.observacoes = observacoes;
    if (status && ['agendado','concluido','cancelado'].includes(status)) agendamento.status = status;
    await agendamento.save();
    res.status(200).json(agendamento);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro no servidor', erro: err.message });
  }
});

// Cancelar agendamento
router.delete('/:id', autenticarJWT, async (req, res) => {
  const agendamento = await Agendamento.findByPk(req.params.id);
  if (!agendamento) return res.status(404).json({ mensagem: 'Agendamento não encontrado' });
  if (agendamento.usuarioId !== req.usuario.id) return res.status(403).json({ mensagem: 'Proibido' });
  await agendamento.destroy();
  res.status(204).send();
});

module.exports = router;
