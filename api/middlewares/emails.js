import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import Usuarios from '../models/Usuario.js'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ciclisansantander@gmail.com',
    pass: 'V8!kR2q@Xp9zL#1m',
  },
});

export const sendPasswordReset = async (req, res) => {
  const { email } = req.body;
  const user = await Usuarios.findOne({ email });

  if (!user) return res.status(404).json({ message: 'Correo no registrado' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
  const resetUrl = `https://tuapp.com/reset-password/${token}`;

  await transporter.sendMail({
    from: 'Soporte <tucorreo@gmail.com>',
    to: email,
    subject: 'Recuperación de contraseña',
    html: `<p>Haz clic aquí para restablecer tu contraseña:</p><a href="${resetUrl}">Restablecer contraseña</a>`,
  });

  res.status(200).json({ message: 'Correo enviado' });
};
