import express from 'express';
const router = express.Router();
import validateDocuments from "../middlewares/validate.documents.js";

import { getEnvios, postEnvios, deleteEnvios, getEnviosId, putEnvios } from "../controllers/envio.controllers.js";
import { check } from 'express-validator';

router.get('/', getEnvios);
router.post('/', [
    check('correo', "No es un valor valido (correo)").isEmail(),
    check('nombre', "Es necesaria el nombre a quien va dirigido").not().isEmpty(),
    check('cedula', "La cédula debe tener minimo 10 caracteres").isLength({min:10}),
    check('direccion', 'La dirección hacia donde va dirigida').not().isEmpty(),
    check('departamento', 'El departamento es requerido').not().isEmpty(),
    check('ciudad', 'La ciudad donde va dirigido es requerido').not().isEmpty(),
    check('telefono', 'El telefono debe tener minimo 10 caracteres').isLength({min:10}),
    validateDocuments
], postEnvios);

router.get('/:id', getEnviosId);
router.delete('/:id', deleteEnvios);
router.put('/:id', putEnvios);

export default router;