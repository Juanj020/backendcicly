import express from 'express';
import cors from 'cors';
import conectaDB from '../database/config.js'
import usuarioRouter from "../routes/usuario.routes.js"
import productoRouter from "../routes/producto.routes.js"
import noticiaRouter from "../routes/noticia.routes.js"
import rutaRouter from "../routes/ruta.routes.js"
import facturaRouter from "../routes/factura.routes.js"
import envioRouter from "../routes/envio.routes.js"
import authRouter from "../routes/auth.routes.js"
import calificacionRoutes from '../routes/calificacion.routes.js';
import auth from '../middlewares/auth.js'; 
import authRole from '../middlewares/authRole.js'; 
import incidenciaRouter from '../routes/incidencia.routes.js'; 

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.usuarioPath = "/api/usuarios";
        this.facturaPath = "/api/facturas";
        this.envioPath = "/api/envios";
        this.productoPath = "/api/productos";
        this.noticiaPath = "/api/noticias";
        this.rutaPath = "/api/rutas";
        this.calificacionPath = "/api/calificacion";
        this.incidenciaPath = "/api/incidencia";
        this.authPath = "/api/auth"

        this.dbConexion();

        this.middlewares(express.static);

        this.routes();

    }

    async dbConexion(){
        await conectaDB();
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json({limit : '50mb'}));
        this.app.use(express.urlencoded({limit:'50mb', extended: true}))
        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use("/api", console.log("hola")
        );
        this.app.use('/api/usuariosss', usuarioRouter);
        this.app.use(this.usuarioPath, usuarioRouter);
        this.app.use(this.productoPath, productoRouter);
        this.app.use(this.noticiaPath, noticiaRouter);
        this.app.use(this.rutaPath, rutaRouter);
        this.app.use(this.facturaPath, facturaRouter);
        this.app.use(this.envioPath, envioRouter);
        this.app.use(this.calificacionPath, calificacionRoutes);
        this.app.use(this.incidenciaPath, incidenciaRouter);
        this.app.use(this.authPath, authRouter);

        // Ejemplo de ruta protegida solo para administradores
        this.app.get('/api/admin', auth, authRole('ADMIN'), (req, res) => {
            res.send('Esta es una ruta protegida solo para administradores');
        });

        // Ejemplo de ruta protegida solo para usuarios
        this.app.get('/api/user', auth, authRole('USER'), (req, res) => {
            res.send('Esta es una ruta protegida solo para usuarios');
        });
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`El server esta corriendo el el puerto: ${this.port}`);
        })
    }

}

export {Server};