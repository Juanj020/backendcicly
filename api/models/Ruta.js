import mongoose from 'mongoose';

const rutaSchema = mongoose.Schema({
    nombreRut: {
        type: String,
        required: [true, 'El nombre de la ruta es obligatorio'],
        trim: true,
        unique: true
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es requerida'],
        trim: true
    },
    dificultad: {
        type: String,
        required: [true, 'La dificultad es requerida'],
    },
    kilometros: {
        type: Number,
        min: [0, 'El valor de los kilómetros no puede ser negativo']
    },
    punto_partida: {
        type: String,
        required: [true, 'El punto de partida es requerido'],
    },
    punto_llegada: {
        type: String,
        required: [true, 'El punto de llegada es requerido'],
    },
    tiempo_aprox: {
        type: String,
        trim: true
    },
    altitud_min: {
        type: Number,
        trim: true
    },
    altitud_max: {
        type: Number,
        trim: true
    },
    recomendaciones: {
        type: String,
        trim: true
    },
    imagen: {
        type: String
    },
    link: {
        type: String,
    },
    estado: {
        type: String,
        enum: ['Visible', 'Invisible'],
        default: 'Invisible'
    },
    creado_por: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        /* required: true */
    }
}, { timestamps: true });

const Rutas = mongoose.model('ruta', rutaSchema);

export default Rutas;
