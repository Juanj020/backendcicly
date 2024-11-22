import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js'; // Ajusta la ruta según tu estructura

const auth = async (req, res, next) => {
    // Obtener el token del encabezado Authorization
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ msg: 'Acceso denegado, no se encontró token' });
    }

    try {
        // Verificar y decodificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secreto');
        console.log('Token decodificado:', decoded);
        
        // Encontrar el usuario asociado al token usando el campo uid
        const usuario = await Usuario.findById(decoded.uid);
        console.log('Usuario encontrado:', usuario);

        if (!usuario) {
            return res.status(401).json({ msg: 'Usuario no encontrado' });
        }

        // Añadir el usuario a la solicitud
        req.user = usuario;
        next();
    } catch (error) {
        console.error('Error en el middleware de autenticación:', error);
        res.status(401).json({ msg: 'Token no válido' });
    }
};

export default auth;