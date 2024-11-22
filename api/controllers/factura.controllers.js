import Factura from '../models/Factura.js';

const getFacturas = async (req, res) => {
    try {
        const facturas = await Factura.find();
        res.json(facturas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las facturas' });
    }
};

const getFacturasId = async (req, res) => {
    try {
        const factura = await Factura.findById(req.params.id).populate('fk_usuario', 'nombre correo');
        if (!factura) {
            return res.status(404).json({ error: 'Factura no encontrada' });
        }
        res.json(factura);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la factura' });
    }
};

// Dentro de tu controlador postFacturas
const postFacturas = async (req, res) => {
    try {
        const { fecha, productos, total, forma_pago, fk_usuario, numero_factura } = req.body;

        const nuevaFactura = new Factura({
            fecha,
            productos,
            total,
            forma_pago,
            fk_usuario,
            numero_factura
        });

        await nuevaFactura.save();
        res.status(201).json(nuevaFactura);
    } catch (error) {
        console.error('Error al crear la factura:', error);
        if (error.code && error.code === 11000) {
            res.status(400).json({ error: 'Número de factura ya existe' });
        } else {
            res.status(500).json({ error: 'Error al crear la factura', details: error.message });
        }
    }
};



const putFacturas = async (req, res) => {
    try {
        const factura = await Factura.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!factura) {
            return res.status(404).json({ error: 'Factura no encontrada' });
        }
        res.json(factura);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la factura' });
    }
};

const deleteFacturas = async (req, res) => {
    try {
        const factura = await Factura.findByIdAndDelete(req.params.id);
        if (!factura) {
            return res.status(404).json({ error: 'Factura no encontrada' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la factura' });
    }
};

export { getFacturas, getFacturasId, postFacturas, putFacturas, deleteFacturas };
