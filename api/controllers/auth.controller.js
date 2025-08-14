import response from 'express';
import Usuario from '../models/Usuario.js';
import bcryptjs from "bcryptjs";
import generateJWT from '../helpers/generateJWT.js'; // Importa el helper para generar JWT
import nodemailer from "nodemailer";
import 'dotenv/config';

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
        const token = await generateJWT(
            usuario._id,
            usuario.nombre,
            usuario.rol,
            usuario.correo,
            usuario.telefono
        );

        // Responder con el token y la información del usuario
        res.json({
            success: true,
            token,
            userId: usuario._id,
            nombre: usuario.nombre,
            correo: usuario.correo,    // 👈 agregado
            telefono: usuario.telefono,
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

// Configura tu correo
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// 1️⃣ Solicitar código
const sendOtp = async (req, res) => {
  try {
    const { correo } = req.body;

    // Si Usuario es un modelo de Mongoose, aquí debería ser findOne, no find
    const user = await Usuario.findOne({ correo });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000); // Código de 6 dígitos
    user.otp = otp;
    user.otpExpires = Date.now() + 15 * 60 * 1000; // Expira en 15 min

    await user.save(); // Guarda el OTP en la base de datos

    await transporter.sendMail({
      from: `"Soporte" <${process.env.EMAIL_USER}>`,
      to: correo,
      subject: "Código de recuperación",
      text: `Tu código de recuperación es: ${otp}`
    });

    res.json({ message: "Código enviado al correo" });
  } catch (error) {
    console.error("Error enviando OTP:", error);
    res.status(500).json({ message: "Error enviando código de recuperación" });
  }
};


// 2️⃣ Verificar código y cambiar contraseña
const resetPassword = async (req, res) => {
  try {
    const { correo, otp, password } = req.body;

    // Buscar usuario por correo
    const user = await Usuario.findOne({ correo });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Validar código OTP y fecha de expiración
    if (user.otp !== parseInt(otp) || Date.now() > user.otpExpires) {
      return res.status(400).json({ message: "Código inválido o expirado" });
    }

    // Actualizar contraseña y limpiar OTP
    user.password = await bcryptjs.hash(password, 10);
    user.otp = null;
    user.otpExpires = null;

    await user.save(); // Guardar cambios en la DB

    res.json({ message: "Contraseña actualizada correctamente" });
  } catch (error) {
    console.error("Error al restablecer contraseña:", error);
    res.status(500).json({ message: "Error interno al restablecer contraseña" });
  }
};

export { login, sendOtp, resetPassword };