import Envio from '../models/Envio.js';

const getEnvios = async (req, res) => {
    try {
        const envios = await Envio.find();
        res.json(envios); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener los envíos" });
    }
};

const getEnviosId = async (req, res) => {
    try {
        const envio = await Envio.findOne({_id : req.params.id})
        if (!envio) {
            return res.status(404).json({ error: 'Envío no encontrado' });
        }
        res.json(envio);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el envío' });
    }
};

const postEnvios = async (req, res) => {
    try {
        const { correo, nombre, cedula, direccion, departamento, ciudad, telefono, fecha_entrega, fk_factura, estado_envio } = req.body;
        const envio = new Envio({ correo, nombre, cedula, direccion, departamento, ciudad, telefono, fecha_entrega, fk_factura, estado_envio });
        await envio.save();
        res.status(201).json(envio);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el envío' });
    }
};

const putEnvios = async (req, res) => {
    try {
        const envio = await Envio.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!envio) {
            return res.status(404).json({ error: 'Envío no encontrado' });
        }
        res.json(envio);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el envío' });
    }
};

const deleteEnvios = async (req, res) => {
    try {
        const envio = await Envio.findByIdAndDelete(req.params.id);
        if (!envio) {
            return res.status(404).json({ error: 'Envío no encontrado' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el envío' });
    }
};

export { getEnvios, postEnvios, deleteEnvios, getEnviosId, putEnvios };
