// src/models/Tienda.js
import mongoose from "mongoose";

const tiendaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  localizacion: {
    type: String,
    required: true,
    trim: true
  },
  imagen: {
    type: String,
    trim: true
  },
  contacto: [{ // 🆕 Ahora es un array de Strings
    type: String,
    trim: true
  }],
  web: {
    type: String,
    trim: true
  },
  estado: {
    type: String,
    enum: ['Visible', 'Invisible'],
    default: 'Invisible'
  },
  fecha: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Tienda", tiendaSchema);