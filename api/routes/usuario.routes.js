import express from 'express';
const router = express.Router();
import validateDocuments from "../middlewares/validate.documents.js";

import { getUsuarios, postUsuarios, deleteUsuarios, getUsuariosId, putUsuarios } from "../controllers/usuario.controllers.js";
import { check } from 'express-validator';

router.get('/', getUsuarios);
router.post('/', [
    check('nombre', "El nombre no es valido").not().isEmpty(),
    check('password', "El password debe tener minimo 6 caracteres").isLength({min:8}),
    check('correo', 'El correo no es valido').isEmail(),
    check('rol', 'No es un rol valido').isIn(['ADMIN','USER']),
    validateDocuments
], postUsuarios);

router.get('/:id', getUsuariosId);

router.delete('/:id', deleteUsuarios);

router.put('/:id', putUsuarios);

export default router;