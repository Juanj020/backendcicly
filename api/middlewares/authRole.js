function authRole(role) {
    return (req, res, next) => {
        // Suponiendo que req.user se estableció previamente con el middleware de autenticación
        if (req.user.rol !== role) {
            return res.status(403).send('Acceso denegado'); // 403 Forbidden
        }
        next();
    };
}

export default authRole;
