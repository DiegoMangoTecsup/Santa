// salonEventos.js
const express = require('express');
const router = express.Router();
const SalonEvento = require('../models/SalonEvento');

// Obtener todos los eventos
router.get('/', async (req, res) => {
  try {
    const eventos = await SalonEvento.find();
    res.json(eventos);
  } catch (error) {
    console.error('Error al obtener eventos:', error);
    res.status(500).json({ message: 'Error al obtener eventos' });
  }
});

// Crear un nuevo evento
router.post('/', async (req, res) => {
  const { nombreEvento, fecha, descripcion, capacidad, costo } = req.body;

  try {
    const nuevoEvento = new SalonEvento({ nombreEvento, fecha, descripcion, capacidad, costo });
    await nuevoEvento.save();
    res.status(200).json(nuevoEvento);
  } catch (error) {
    console.error('Error al crear evento:', error);
    res.status(500).json({ message: 'Error al crear evento' });
  }
});

module.exports = router;
