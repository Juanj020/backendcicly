import express from 'express';
const router = express.Router();
import validateDocuments from "../middlewares/validate.documents.js";

import { getFacturas, postFacturas, deleteFacturas, getFacturasId, putFacturas } from "../controllers/factura.controllers.js";
import { check } from 'express-validator';

router.get('/', getFacturas);
router.post('/', [
    check('fecha', "Falta la fecha de la compra").not().isEmpty().isISO8601(), // Asegúrate de que sea una fecha válida
    check('productos', "Es necesario agregar productos al carrito").isArray().notEmpty(),
    check('total', "Es necesario el total").not().isEmpty().isNumeric(),
    check('forma_pago.tipo_tarjeta', "El tipo de tarjeta es requerido").not().isEmpty().isIn(['Visa', 'MasterCard']),
    check('forma_pago.numero_tarjeta', "El número de tarjeta debe tener 16 dígitos").isLength({ min: 16, max: 16 }).isNumeric(),
    check('forma_pago.nombre_titular', "El nombre del titular es requerido").not().isEmpty(),
    check('forma_pago.fecha_expiracion', "La fecha de expiración debe tener el formato MM/YY").matches(/^(0[1-9]|1[0-2])\/([0-9]{2})$/),
    check('forma_pago.cvv', "El CVV debe tener 3 o 4 dígitos").isLength({ min: 3, max: 4 }).isNumeric(),
    validateDocuments
], postFacturas);

router.get('/:id', getFacturasId);
router.delete('/:id', deleteFacturas);
router.put('/:id', putFacturas);

export default router;