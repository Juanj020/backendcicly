import mongoose from 'mongoose';

const CalificacionSchema = new mongoose.Schema({
    rutaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ruta',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuario',
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    }
}, { timestamps: true });

const Calificacion = mongoose.model('Calificacion', CalificacionSchema);

export default Calificacion;
