import response from "express"
import {Types} from 'mongoose'

const ObjectId = Types.ObjectId

import Ruta from "../models/Ruta.js";
import Producto from "../models/Producto.js";
import Noticia from "../models/Noticia.js";

const allowedCollections = ['rutas','store','noticias']

const searchRutas = async( criterio = '', res = response ) => {

    const isMongoID = ObjectId.isValid( criterio ); // TRUE 

    if ( isMongoID ) {
        const ruta = await Ruta.findById(criterio);
        return res.json({
            results: ( ruta ) ? [ ruta ] : []
        });
    }

    const regex = new RegExp( criterio, 'i' );
    const rutas = await Ruta.find({ nombreRut: regex});

    res.json({
        results: rutas
    });
}

const search = ( req, res = response ) => {
    
    const { coleccion, criterio  } = req.params;

    if (!allowedCollections.includes(coleccion)){
        return res.status(400).json({
            msg: `Solo estan Permitidas estas Colecciones: ${allowedCollections}`
        })
    }

    switch (coleccion) {
        case 'categorias':
            searchRutas(criterio, res);
        break;

        default:
            res.status(500).json({
                msg: 'This search doesnt exists'
            })
    }

  

}

export default search