import Rutas from "../models/Ruta.js";
import Calificacion from '../models/Calificacion.js';

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
        // 1️⃣ Obtener rutas visibles
        const rutas = await Rutas.find({ estado: "Visible" }).lean();

        // 2️⃣ Obtener promedios de calificaciones
        const calificaciones = await Calificacion.aggregate([
            { $group: {
                _id: "$rutaId",
                promedio: { $avg: "$rating" },
                totalVotos: { $sum: 1 }
            }}
        ]);

        // 3️⃣ Crear un mapa para acceso rápido
        const calMap = {};
        calificaciones.forEach(c => {
            calMap[c._id.toString()] = {
                promedio: parseFloat(c.promedio.toFixed(1)),
                totalVotos: c.totalVotos
            };
        });

        // 4️⃣ Añadir los datos a cada ruta
        const rutasConRating = rutas.map(r => ({
            ...r,
            promedio: calMap[r._id.toString()]?.promedio || 0,
            totalVotos: calMap[r._id.toString()]?.totalVotos || 0
        }));

        res.json(rutasConRating);
    } catch (error) {
        console.error('Error al obtener rutas visibles:', error);
        res.status(500).json({ error: 'Error al obtener rutas visibles' });
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
        const {
            nombreRut,
            descripcion,
            dificultad,
            kilometros,
            punto_partida,
            punto_llegada,
            tiempo_aprox,
            altitud_min,
            altitud_max,
            recomendaciones,
            imagen, // 👈 Ahora recibirá la cadena Base64
            link,
            estado,
            creado_por,
        } = req.body;

        // Si quieres ver la cadena Base64 que llega, puedes descomentar la siguiente línea:
        // console.log('Imagen recibida (Base64):', imagen.substring(0, 50) + '...');

        const ruta = new Rutas({
            nombreRut,
            descripcion,
            dificultad,
            kilometros,
            punto_partida,
            punto_llegada,
            tiempo_aprox,
            altitud_min,
            altitud_max,
            recomendaciones,
            imagen,
            link,
            estado,
            creado_por,
        });

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

const putRutasEstado = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        
        // Verifica que el estado sea válido
        if (estado !== 'Visible' && estado !== 'Invisible') {
            return res.status(400).json({ msg: 'Estado de ruta no válido' });
        }

        const rutaActualizada = await Rutas.findByIdAndUpdate(
            id, 
            { estado: estado }, 
            { new: true }
        );

        if (!rutaActualizada) {
            return res.status(404).json({ msg: 'Ruta no encontrada' });
        }

        res.json(rutaActualizada);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al actualizar el estado de la ruta' });
    }
};

export { getRutas, postRutas, deleteRutas, getRutasId, putRutas, getRutasVisibles, putRutasEstado };
