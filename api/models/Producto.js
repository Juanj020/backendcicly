import mongoose from 'mongoose';

const productoShema = mongoose.Schema({
    nombrePro:{
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true,
        unique:true
    },
    precio:{
        type: Number,
        required:[true, 'El precio es requerido'],
    },
    marca:{
        type: String,
        required:[true, 'La marca es requerida'],
    },
    stock:{
        type: Number,
        required:[true, 'La stock es requerido']
    },
    descripcion:{
        type: String,
        required:[true, 'La descripción es requerida'],
    },
    garantia:{
        type: String,
        default: ['6 meses'],
        trim: true
    },
    imagen:{
        type: String
    },
    tipo:{
        type: String,
        enum : ["ruta", "montanera", "accesorio"]
    }
});

const Productos = mongoose.model('producto', productoShema);

export default Productos;