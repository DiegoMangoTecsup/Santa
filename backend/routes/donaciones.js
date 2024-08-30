// donaciones.js
const express = require('express');
const router = express.Router();
const Donacion = require('../models/Donacion');

// Obtener todas las donaciones
router.get('/', async (req, res) => {
  try {
    const donaciones = await Donacion.find();
    res.json(donaciones);
  } catch (error) {
    console.error('Error al obtener donaciones:', error);
    res.status(500).json({ message: 'Error al obtener donaciones' });
  }
});

// Crear una nueva donación
router.post('/', async (req, res) => {
  const { donante, monto, fecha } = req.body;

  try {
    const nuevaDonacion = new Donacion({ donante, monto, fecha });
    await nuevaDonacion.save();
    res.status(200).json(nuevaDonacion);
  } catch (error) {
    console.error('Error al crear donación:', error);
    res.status(500).json({ message: 'Error al crear donación' });
  }
});

module.exports = router;
