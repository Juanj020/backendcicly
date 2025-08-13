import mongoose from "mongoose";

const tiendaSchema = new mongoose.Schema({
  descripcion: String,
  imagen: String,
  contacto: String,
  web: String,
  fecha: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Tienda", tiendaSchema);
