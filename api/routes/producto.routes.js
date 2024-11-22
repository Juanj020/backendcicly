import express from 'express';
const router = express.Router();
import validateDocuments from "../middlewares/validate.documents.js";

import { getProductos, postProductos, deleteProductos, getProductosId, putProductos, getProductosRuta, getProductosAccesorio, getProductosTotal } from "../controllers/producto.controllers.js";
import { check } from 'express-validator';

router.get('/', getProductos);
router.get('/total', getProductosTotal);
router.get('/ruta', getProductosRuta);
router.get('/accesorio', getProductosAccesorio);
router.post('/', [
    check('nombrePro', "Falta completar el nombre").not().isEmpty(),
    check('precio', "El precio debe ser mayor a 1000").isLength({min:4}),
    check('marca', "Falta la marca").not().isEmpty(),
    check('descripcion', "La descripcion es obligatoria").not().isEmpty(),
    check('stock', 'El stock debe llevar un valor').not().isEmpty(),
    validateDocuments
], postProductos);

router.get('/:id', getProductosId);
router.delete('/:id', deleteProductos);
router.put('/:id', putProductos);

export default router;