import Rutas from "../models/Ruta.js";

const getRutas = async (req, res) => {
    try {
        const ruta = await Rutas.find();
        res.json(ruta);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al obtener rutas' });
    }
};

const getRutasVisibles = async (req, res) => {
    try {
        const ruta = await Rutas.find({"estado": "Visible"});
        res.json(ruta);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al obtener rutas' });
    }
};

const getRutasId = async (req, res) => {
    try {
        const ruta = await Rutas.findById(req.params.id);
        if (!ruta) {
            return res.status(404).json({ msg: 'Ruta no encontrada' });
        }
        res.json(ruta);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al obtener la ruta' });
    }
};

const postRutas = async (req, res) => {
    try {
        const { nombreRut, descripcion, dificultad, kilometros, punto_partida, punto_llegada, tiempo_aprox, altitud_min, altitud_max,
            recomendaciones,
            imagen,
            link,
            estado,
            creado_por } = req.body;

        const ruta = new Rutas({ nombreRut, descripcion, dificultad, kilometros, punto_partida, punto_llegada, tiempo_aprox, altitud_min, altitud_max,
            recomendaciones,
            imagen,
            link,
            estado,
            creado_por })

        const existeRuta = await Rutas.findOne({ nombreRut });
        if (existeRuta) {
            return res.status(400).json({ msg: 'La ruta ya está registrada' });
        }

        await ruta.save();
        res.json(ruta);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al crear la ruta' });
    }
};

const putRutas = async (req, res) => {
    try {
        const { nombreRut } = req.body;
        const ruta = await Rutas.findById(req.params.id);

        if (!ruta) {
            return res.status(404).json({ msg: 'Ruta no encontrada' });
        }

        // Verificar si el nombre ya está registrado en otra ruta
        const existeRutaConMismoNombre = await Rutas.findOne({ nombreRut });
        if (existeRutaConMismoNombre && existeRutaConMismoNombre._id.toString() !== req.params.id) {
            return res.status(400).json({ msg: 'El nombre de la ruta ya está registrado' });
        }

        const rutaActualizada = await Rutas.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(rutaActualizada);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al actualizar la ruta' });
    }
};


const deleteRutas = async (req, res) => {
    try {
        const ruta = await Rutas.deleteOne({_id:req.params.id});

        if (ruta  && ruta.deletedCount === 1) {
            res.status(200).json({ message: 'Usuario eliminado correctamente' });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al eliminar la ruta' });
    }
};

export { getRutas, postRutas, deleteRutas, getRutasId, putRutas, getRutasVisibles };
