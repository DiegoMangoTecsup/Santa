const mongoose = require('mongoose');

const entradaSchema = new mongoose.Schema({
  nombre: String,
  precio: Number,
  disponibilidad: Number,
  evento: String,
  fecha: Date,
});

module.exports = mongoose.model('Entrada', entradaSchema);
