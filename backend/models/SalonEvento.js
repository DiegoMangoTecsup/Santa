const mongoose = require('mongoose');

const salonEventoSchema = new mongoose.Schema({
    nombreEvento: String,
    fecha: Date,
    hora: String,
    duracion: Number,
    capacidad: Number,
  });

module.exports = mongoose.model('SalonEvento', salonEventoSchema);
