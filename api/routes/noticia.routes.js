import express from 'express';
const router = express.Router();
import validateDocuments from "../middlewares/validate.documents.js";

import { getNoticias, postNoticias, getNoticiasId, deleteNoticias, putNoticias, getNoticiasUsuario, importarNoticiasExterna } from '../controllers/noticia.controllers.js';
import { check } from 'express-validator';

router.get('/', getNoticias);
router.get('/visibles', getNoticiasUsuario);
router.post('/', [
    check('titulo', "Es obligatorio el titulo").not().isEmpty(),
    check('descripcion', "Es obligaria la descripción").not().isEmpty(),
    check('resumen', 'Es obligatorio el resumen').not().isEmpty(),
    check('fecha', 'Es obligatoria la fecha').not().isEmpty(),
    validateDocuments
], postNoticias);
router.post('/noti/importar-externas', importarNoticiasExterna);

router.get('/:id', getNoticiasId);
router.delete('/:id', deleteNoticias);
router.put('/:id', putNoticias);

export default router;