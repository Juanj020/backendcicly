import Usuarios from "../models/Usuario.js";
import bcryptjs from 'bcryptjs'

const getUsuarios = async (req, res) =>{
    try {
        const usuario = await Usuarios.find();
        res.json(usuario); 
    } catch (error) {
        console.log(error);
    }
}

const getUsuariosId = async (req, res)=>{
    try {
        const usuario = await Usuarios.findOne({_id: req.params.id});
        res.json(usuario);
    } catch (error) {
        console.log(error);
    }
}

const postUsuarios = async (req, res) => {
    try {
        const { nombre, correo, password, telefono, rol } = req.body;
        const usuario = new Usuarios({nombre, correo, password, telefono, rol});

        const existeEmail = await Usuarios.findOne({correo});
        if(existeEmail){
            return res.status(400).json({msg:"El correo ya esta registrado"})
        }

        const encrip = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, encrip);

        await usuario.save();
        res.json(usuario)

    } catch (error) {
        console.log(error);
    }
}

const putUsuarios = async (req, res) => {
    try {
        const { nombre, correo, password, telefono, rol } = req.body;

        const usuarioExistente = await Usuarios.findById(req.params.id);
        if (!usuarioExistente) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }

        // Verificar si se está intentando actualizar la contraseña
        if (password) {
            const encrip = bcryptjs.genSaltSync();
            usuarioExistente.password = bcryptjs.hashSync(password, encrip);
        }

        // Actualizar los demás campos
        usuarioExistente.nombre = nombre;
        usuarioExistente.correo = correo;
        usuarioExistente.telefono = telefono;
        usuarioExistente.rol = rol;

        await usuarioExistente.save();
        res.json(usuarioExistente);

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al actualizar el usuario" });
    }
};

const deleteUsuarios = async (req,res)=>{
    try {
        const usuario = await Usuarios.deleteOne({_id:req.params.id})
        res.status(200).send();
    } catch (error) {
        console.log(error);
    }
} 

export {getUsuarios, postUsuarios, deleteUsuarios, getUsuariosId, putUsuarios};