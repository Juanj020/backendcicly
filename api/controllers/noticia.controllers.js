import Noticias from "../models/Noticia.js";
import { buscarNoticiasCiclismoSantander } from "./../utils/scrapper.js";

const getNoticias = async (req, res) =>{
    try {
        const noticia = await Noticias.find().populate('autor', 'nombre');
        res.json(noticia); 
    } catch (error) {
        console.log(error);
    }
}

const getNoticiasUsuario = async (req, res) =>{
    try {
        const noticia = await Noticias.find({estado:"Visible"}).populate('autor', 'nombre');
        res.json(noticia); 
    } catch (error) {
        console.log(error);
    }
}

const getNoticiasId = async (req, res)=>{
    try {
        const noticia = await Noticias.findOne({_id: req.params.id});
        res.json(noticia);
    } catch (error) {
        console.log(error);
    }
}

const postNoticias = async (req, res) => {
    try {
        const { titulo, descripcion, imagen, resumen, fecha, estado, autor } = req.body;
        const noticia = new Noticias({titulo, descripcion, imagen, resumen, fecha, estado, autor});

        const existeTitulo = await Noticias.findOne({titulo});
        if(existeTitulo){
            return res.status(400).json({msg:"El titulo ya esta registado"})
        }

        await noticia.save();
        res.json(noticia)

    } catch (error) {
        console.log(error);
    }
}

const putNoticias = async (req, res)=>{
    try {
        const {titulo, descripcion, imagen, resumen, autor} = req.body;
        const nombreNoticia = await Noticias.findOne({titulo});
        if(nombreNoticia)
        if((nombreNoticia._id).toString() != req.params.id)
        return res.status(400).json({msg: "El titulo ya esta registrado"});

        const noticia = await Noticias.findOneAndUpdate({_id: req.params.id}, req.body,{new:true});
        res.json(noticia);
    } catch (error) {
        console.log(error);
    }
}

const deleteNoticias = async (req,res)=>{
    try {
        const noticia = await Noticias.deleteOne({_id:req.params.id})
        
        if(noticia && noticia.deletedCount === 1){
            res.status(200).json({mesage : "Noticia eliminado correctamente"})
        }else{
            res.status(404).json({ message : "Noticia no encontrada" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al eliminar la noticia' });
    }
} 

const importarNoticiasExterna = async (req, res) => {
  try {
    const nuevasNoticias = await buscarNoticiasCiclismoSantander();
    const guardadas = [];

    for (const noticia of nuevasNoticias) {
      const existe = await Noticias.findOne({ titulo: noticia.titulo });
      if (!existe) {
        const nueva = new Noticias({ ...noticia, autor: req.usuario._id || 'DEFAULT_ID', estado: 'Visible' });
        await nueva.save();
        guardadas.push(nueva);
      }
    }

    res.json({ msg: 'Importación completada', guardadas });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Error al importar noticias externas' });
  }
};

export {getNoticias, postNoticias, deleteNoticias, getNoticiasId, putNoticias, getNoticiasUsuario, importarNoticiasExterna};