import Calificacion from '../models/Calificacion.js';

export const getCalificacionesTotal = async (req, res) => {
    try {
        const calificaciones = await Calificacion.find()
            .populate({ path: 'userId', select: 'nombre' }) 
            .populate({ path: 'rutaId', select: 'nombreRut' }); 
        res.json(calificaciones);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener los envíos" });
    }
};

export const getPromedioPorRuta = async (req, res) => {
    try {
        const { rutaId } = req.params;
        const calificaciones = await Calificacion.find({ rutaId });

        if (!calificaciones.length) {
            return res.json({ promedio: 0, totalVotos: 0 });
        }

        const suma = calificaciones.reduce((acc, c) => acc + c.rating, 0);
        const promedio = suma / calificaciones.length;

        res.json({
            promedio: Number(promedio.toFixed(1)), // Redondeado a 1 decimal
            totalVotos: calificaciones.length
        });
    } catch (error) {
        console.error("Error al calcular promedio:", error);
        res.status(500).json({ error: 'Error al calcular promedio' });
    }
};

export const getCalificacionId = async (req, res) => {
    try {
        const calificacion = await Calificacion.findOne({_id : req.params.id})
        if (!calificacion) {
            return res.status(404).json({ error: 'Calificación no encontrada' });
        }
        res.json(calificacion);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la calificación' });
    }
};

export const createCalificacion = async (req, res) => {
    try {
        const { rutaId, userId, rating } = req.body;

        let calificacion = await Calificacion.findOne({ rutaId, userId });

        if (calificacion) {
            // Si la calificación existe, actualizamos el valor de `rating`
            calificacion.rating = rating;
        } else {
            // Si no existe, creamos una nueva calificación
            calificacion = new Calificacion({ rutaId, userId, rating });
        }

        await calificacion.save();
        res.status(200).json({ message: 'Calificación guardada con éxito', calificacion });
    } catch (error) {
        console.error('Error al crear o actualizar calificación:', error);
        res.status(500).json({ message: 'Error al crear o actualizar calificación', error });
    }
};

export const getCalificaciones = async (req, res) => {
    try {
        const { rutaId } = req.params;
        const calificaciones = await Calificacion.find({ rutaId });
        res.status(200).json(calificaciones);
    } catch (error) {
        console.error('Error al obtener calificaciones:', error);
        res.status(500).json({ message: 'Error al obtener calificaciones', error });
    }
};

export const updateCalificacion = async (req, res) => {
    const { id } = req.params; // Obtener el ID desde params
    const { rating } = req.body; // Solo rating desde el body

    try {
        const calificacionActualizada = await Calificacion.findByIdAndUpdate(id, { rating }, { new: true });
        if (!calificacionActualizada) {
            return res.status(404).send("Calificación no encontrada");
        }
        res.send(calificacionActualizada);
    } catch (error) {
        console.error("Error al actualizar la calificación:", error);
        res.status(500).send("Error al actualizar la calificación");
    }
};
export const putCalificacion = async (req, res) => {
    const { id } = req.params; // Asegúrate de que id sea un string válido
    try {
        const calificacionActualizada = await Calificacion.findByIdAndUpdate(id, req.body, { new: true });
        if (!calificacionActualizada) {
            return res.status(404).send("Calificación no encontrada");
        }
        res.send(calificacionActualizada);
    } catch (error) {
        console.error("Error al actualizar la calificación:", error);
        res.status(500).send("Error al actualizar la calificación");
    }
};

export const deleteCalificacion = async (req, res) => {
    try {
        const calificacion = await Calificacion.findByIdAndDelete(req.params.id);
        if (!calificacion) {
            return res.status(404).json({ error: 'Calificación no encontrada' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la calificación' });
    }
};

export const getCalificacionUsuario = async (req, res) => {
    try {
        const { rutaId, userId } = req.params;

        const calificacion = await Calificacion.findOne({ rutaId, userId });
        if (!calificacion) {
            // Si no existe la calificación, retornamos una calificación de 0
            return res.json({ rating: 0 });
        }

        res.json(calificacion);
    } catch (error) {
        console.error("Error al obtener la calificación del usuario:", error);
        res.status(500).json({ error: 'Error al obtener la calificación del usuario' });
    }
};