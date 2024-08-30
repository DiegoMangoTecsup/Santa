const mongoose = require('mongoose');

const donacionSchema = new mongoose.Schema({
    nombreDonante: String,
    monto: Number,
    fecha: Date,
    mensaje: String,
  });

module.exports = mongoose.model('Donacion', donacionSchema);