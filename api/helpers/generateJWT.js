import jwt from 'jsonwebtoken';

const generateJWT = (uid, nombre, rol) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, nombre, rol };

    jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '4h'
    }, (err, token) => {
      if (err) {
        console.log(err);
        reject("No se pudo generar el token");
      } else {
        resolve(token);
      }
    });
  });
};

export default generateJWT;