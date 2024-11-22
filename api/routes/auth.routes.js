import Router from "express";
import { check } from "express-validator";
import { login } from "../controllers/auth.controller.js";
import validarDocumentos from "../middlewares/validate.documents.js";
import auth from '../middlewares/auth.js'; // Middleware de autenticación

const router = Router();

// Ruta para el inicio de sesión
router.post("/", [
    check('correo', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarDocumentos
], login);

// Ruta para obtener el perfil del usuario (requiere autenticación)
router.get('/profile', auth, (req, res) => {
    res.json({
        nombre: req.user.nombre,
        correo: req.user.correo,
        rol: req.user.rol
    });
});

export default router;