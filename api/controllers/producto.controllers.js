import Productos from '../models/Producto.js';

const getProductosTotal = async (req, res) =>{
    try {
        const producto = await Productos.find();
        res.json(producto); 
    } catch (error) {
        console.log(error);
    }
}

const getProductos = async (req, res) =>{
    try {
        const producto = await Productos.find({tipo:"montanera"});
        res.json(producto); 
    } catch (error) {
        console.log(error);
    }
}

const getProductosRuta = async (req, res) =>{
    try {
        const producto = await Productos.find({tipo:"ruta"});
        res.json(producto); 
    } catch (error) {
        console.log(error);
    }
}

const getProductosAccesorio = async (req, res) =>{
    try {
        const producto = await Productos.find({tipo:"accesorio"});
        res.json(producto); 
    } catch (error) {
        console.log(error);
    }
}

const getProductosId = async (req, res)=>{
    try {
        const producto = await Productos.findOne({_id: req.params.id});
        res.json(producto);
    } catch (error) {
        console.log(error);
    }
}

const postProductos = async (req, res) => {
    try {
        const { nombrePro, precio, marca, stock, descripcion, garantia, imagen, tipo } = req.body;
        const producto = new Productos({nombrePro, precio, marca, stock, descripcion, garantia, imagen, tipo});

        const existeNombre = await Productos.findOne({nombrePro});
        if(existeNombre){
            return res.status(400).json({msg:"El nombre del producto ya esta registado"})
        }

        await producto.save();
        res.json(producto)

    } catch (error) {
        console.log(error);
    }
}

const putProductos = async (req, res)=>{
    try {
        const {nombrePro, precio, marca, stock, descripcion, garantia, imagen} = req.body;
        const nombreProducto = await Productos.findOne({nombrePro});
        if(nombreProducto)
        if((nombreProducto._id).toString() != req.params.id)
        return res.status(400).json({msg: "El nombre del producto ya esta registrado"});

        const producto = await Productos.findOneAndUpdate({_id: req.params.id}, req.body,{new:true});
        res.json(producto);
    } catch (error) {
        console.log(error);
    }
}

const deleteProductos = async (req,res)=>{
    try {
        const producto = await Productos.deleteOne({_id:req.params.id})
        res.status(204).send();
    } catch (error) {
        console.log(error);
    }
} 

export {getProductos, postProductos, deleteProductos, getProductosId, putProductos, getProductosRuta, getProductosAccesorio, getProductosTotal};