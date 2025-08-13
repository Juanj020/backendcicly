import express from "express";
import Tienda from "./../models/Tienda.js";

const router = express.Router();

router.post("/tiendas", async (req, res) => {
  try {
    const nuevaTienda = new Tienda(req.body);
    await nuevaTienda.save();
    res.status(201).json(nuevaTienda);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al guardar tienda", error });
  }
});

router.get("/tiendas", async (req, res) => {
  try {
    const tiendas = await Tienda.find().sort({ fecha: -1 });
    res.json(tiendas);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener tiendas", error });
  }
});

export default router;
