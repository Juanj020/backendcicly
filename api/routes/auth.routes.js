import Router from "express";
import { check } from "express-validator";
import { login, sendOtp, resetPassword } from "../controllers/auth.controller.js";
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

router.post("/send-otp", [
    check('email', 'El email es obligatorio').isEmail(),
    validarDocumentos
], sendOtp);

router.post("/reset-password", [
    check('email', 'El email es obligatorio').isEmail(),
    check('otp', 'El código OTP es obligatorio').not().isEmpty(),
    check('password', 'La nueva contraseña es obligatoria').not().isEmpty(),
    validarDocumentos
], resetPassword);


export default router;