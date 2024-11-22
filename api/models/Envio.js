import mongoose from 'mongoose';

const envioSchema = mongoose.Schema({
    correo: {
        type: String,
        required: [true, 'El correo es requerido en la factura'],
        trim: true
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido'],
        trim: true
    },
    cedula: {
        type: Number,
        required: [true, 'La cédula es requerida'],
    },
    direccion: {
        type: String,
        required: [true, 'La dirección es requerida'],
    },
    departamento: {
        type: String,
        required: [true, 'El departamento es requerido'],
    },
    ciudad: {
        type: String,
        required: [true, 'La ciudad es requerida'],
    },
    telefono: {
        type: Number,
        required: [true, 'El teléfono es requerido'],
    },
    fecha_entrega: { 
        type: Date, 
        /* required: [true, 'La fecha es requerida'] */ 
    },
    fk_factura: {
        type: Number,
        ref: 'facturas',
        required: true
    },
    estado_envio: {
        type: String,
        enum: ['pendiente', 'enviado', 'entregado'],
        default: 'pendiente'
    }
});

const Envio = mongoose.model('envio', envioSchema);

export default Envio;
