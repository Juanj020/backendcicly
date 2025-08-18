import express from 'express';
const router = express.Router();
import validateDocuments from "../middlewares/validate.documents.js";

import { getRutas, postRutas, deleteRutas, getRutasId, putRutas, getRutasVisibles, putRutasEstado } from "../controllers/ruta.controllers.js";
import { check } from 'express-validator';

router.get('/', getRutas);
router.get('/visibles', getRutasVisibles);
router.post('/', [
    check('nombreRut', "Falta completar el nombre de la ruta").not().isEmpty(),
    check('descripcion', "Es necesaria la descripción").not().isEmpty(),
    check('dificultad', "Es nesaria la dificultad").not().isEmpty(),
    check('punto_partida', 'El requerido el punto de partida').not().isEmpty(),
    check('punto_llegada', 'El requerido el punto de llegada').not().isEmpty(),
    validateDocuments
], postRutas);

router.get('/:id', getRutasId);
router.delete('/:id', deleteRutas);
router.put('/:id', putRutas);
router.put('/estado/:id', putRutasEstado);

export default router;