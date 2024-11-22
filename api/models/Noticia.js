import mongoose from 'mongoose';

const noticiaShema = mongoose.Schema({
    titulo:{
        type: String,
        required: [true, 'El titulo es obligatorio'],
        trim: true,
        unique:true
    },
    descripcion:{
        type: String,
        required:[true, 'La descripcion es requerida'],
        trim: true
    },
    imagen:{
        type: String
    },
    resumen:{
        type: String,
        required:[true, 'El resumen es obligatorio'],
        trim: true
    },
    fecha:{
        type: Date,
        required:[true, 'La fecha es obligatoria'],
        trim: true
    },
    estado: {
        type: String,
        enum: ['Visible', 'Invisible'],
        default: 'Invisible'
    },
    autor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuario',
        /* required: true */
    }
}, { timestamps: true });

const Noticias = mongoose.model('noticia', noticiaShema);

export default Noticias;