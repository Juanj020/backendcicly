import mongoose from 'mongoose';

const usuarioShema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true
    },
    correo: {
        type: String,
        required: [true, 'El correo es requerido'],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es requerida']
    },
    telefono: {
        type: Number,
        required: [true, 'El teléfono es obligatorio']
    },
    rol: {
        type: String,
        enum: ['USER', 'ADMIN'],  // Validación para los roles permitidos
        required: true,
        default: 'USER'  // Default debe ser un string, no un array
    }
});

const Usuarios = mongoose.model('usuario', usuarioShema);

export default Usuarios;