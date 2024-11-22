import jwt from 'jsonwebtoken';

const generateJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, process.env.JWT_SECRET || 'secreto', // Asegúrate de que esto esté usando la variable de entorno
            { expiresIn: '4h' }, // Duración del token
            (err, token) => {
                if (err) {
                    console.log(err);
                    reject('No se pudo generar el JSON Web Token :(');
                } else {
                    resolve(token);
                }
            }
        );
    });
};

export default generateJWT;