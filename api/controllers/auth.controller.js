import response from 'express';
import Usuario from '../models/Usuario.js';
import bcryptjs from 'bcryptjs';
import generateJWT from '../helpers/generateJWT.js'; // Importa el helper para generar JWT

const login = async (req, res = response) => {
    const { correo, password } = req.body;

    try {
        // Verificar si el usuario existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: "El email no está registrado",
                success: false
            });
        }

        // Verificar si la contraseña es válida
        const passwordValido = bcryptjs.compareSync(password, usuario.password);
        if (!passwordValido) {
            return res.status(400).json({
                msg: "La contraseña no es correcta",
                success: false
            });
        }

        // Generar el token JWT usando el helper
        const token = await generateJWT(usuario._id);

        // Responder con el token y la información del usuario
        res.json({
            success: true,
            token,
            userId: usuario._id,
            nombre: usuario.nombre,
            rol: usuario.rol
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error en el servidor",
            success: false
        });
    }
};

export { login };