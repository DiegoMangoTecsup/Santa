// entradas.js
const express = require('express');
const router = express.Router();
const Entrada = require('../models/Entrada');

// Obtener todas las entradas
router.get('/', async (req, res) => {
  try {
    const entradas = await Entrada.find();
    res.json(entradas);
  } catch (error) {
    console.error('Error al obtener entradas:', error);
    res.status(500).json({ message: 'Error al obtener entradas' });
  }
});

// Crear una nueva entrada
router.post('/', async (req, res) => {
  const { tipoEntrada, precio, fechaEvento } = req.body;

  try {
    const nuevaEntrada = new Entrada({ tipoEntrada, precio, fechaEvento });
    await nuevaEntrada.save();
    res.status(200).json(nuevaEntrada);
  } catch (error) {
    console.error('Error al crear entrada:', error);
    res.status(500).json({ message: 'Error al crear entrada' });
  }
});

module.exports = router;
