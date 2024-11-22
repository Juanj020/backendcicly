/* import mongoose from 'mongoose';

const pagoSchema = mongoose.Schema({
    tipo_tarjeta: {
        type: String,
        enum: ['Visa', 'MasterCard', 'Amex'], 
        required: [true, 'El tipo de tarjeta es requerido'],
    },
    numero_tarjeta: {
        type: String,
        required: [true, 'El número de tarjeta es requerido'],
        minlength: [16, 'El número de tarjeta debe tener al menos 16 dígitos'],
        maxlength: [16, 'El número de tarjeta debe tener un máximo de 16 dígitos']
    },
    nombre_titular: {
        type: String,
        required: [true, 'El nombre del titular es requerido'],
    },
    fecha_expiracion: {
        type: String,
        required: [true, 'La fecha de expiración es requerida'],
        match: [/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/, 'Formato de fecha inválido (MM/AA)']
    },
    cvv: {
        type: String,
        required: [true, 'El CVV es requerido'],
        minlength: [3, 'El CVV debe tener al menos 3 dígitos'],
        maxlength: [4, 'El CVV debe tener un máximo de 4 dígitos']
    }
});

const facturaSchema = mongoose.Schema({
    fecha: {
        type: Date,
        required: [true, 'La fecha es obligatoria'],
        default: Date.now
    },
    productos: {
        type: Array,
        required: [true, 'El o los productos son requeridos'],
        trim: true
    },
    total: {
        type: Number,
        required: [true, 'El total es requerido'],
    },
    forma_pago: {
        type: pagoSchema, 
        required: [true, 'La forma de pago es requerida'],
    },
    fk_usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario', 
        required: false 
    },
    numero_factura: {
        type: String,
        required: [true, 'El número de factura es requerido'],
        unique: true
    }
});

const Factura = mongoose.model('Factura', facturaSchema);

export default Factura;
 */

import mongoose from 'mongoose';

const facturaSchema = new mongoose.Schema({
    fecha: { type: Date, required: true },
    numero_factura: { type: String, required: true, unique: true },
    total: { type: Number, required: true },
    forma_pago: {
        tipo_tarjeta: String,
        numero_tarjeta: String,
        fecha_expiracion: String,
        cvv: String,
        nombre_titular: String
    },
    productos: [{
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'producto', required: true },
        cantidad: { type: Number, required: true }
    }],
    fk_usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'usuario' }
});

const Factura = mongoose.model('Factura', facturaSchema);

export default Factura;
