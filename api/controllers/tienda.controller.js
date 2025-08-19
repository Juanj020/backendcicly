// src/controllers/tienda.controllers.js
import Tienda from "../models/Tienda.js";

// Obtener todas las tiendas (admin)
export const getTiendas = async (req, res) => {
    try {
        const tiendas = await Tienda.find();
        res.json(tiendas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al obtener tiendas" });
    }
};

// Obtener solo tiendas visibles (para el usuario)
export const getTiendasVisibles = async (req, res) => {
    try {
        const tiendas = await Tienda.find({ estado: "Visible" });
        res.json(tiendas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al obtener tiendas visibles" });
    }
};

// Crear una nueva tienda (a través de la sugerencia)
export const postTienda = async (req, res) => {
    try {
        const { nombre, localizacion } = req.body;
        const nuevaTienda = new Tienda({ nombre, localizacion, ...req.body });
        await nuevaTienda.save();
        res.status(201).json(nuevaTienda);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al crear la tienda" });
    }
};

// Actualizar una tienda (desde el panel de admin)
export const putTienda = async (req, res) => {
    try {
        const { id } = req.params;
        const tiendaActualizada = await Tienda.findByIdAndUpdate(id, req.body, { new: true });

        if (!tiendaActualizada) {
            return res.status(404).json({ msg: "Tienda no encontrada" });
        }
        res.json(tiendaActualizada);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al actualizar la tienda" });
    }
};

// Eliminar una tienda (desde el panel de admin)
export const deleteTienda = async (req, res) => {
    try {
        const { id } = req.params;
        const tienda = await Tienda.findByIdAndDelete(id);

        if (!tienda) {
            return res.status(404).json({ msg: "Tienda no encontrada" });
        }
        res.status(200).json({ msg: "Tienda eliminada correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al eliminar la tienda" });
    }
};

// Alternar la visibilidad de la tienda (desde el panel de admin)
export const toggleTiendaVisibilidad = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        const tienda = await Tienda.findByIdAndUpdate(id, { estado }, { new: true });

        if (!tienda) {
            return res.status(404).json({ msg: "Tienda no encontrada" });
        }
        res.json(tienda);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al cambiar la visibilidad" });
    }
};