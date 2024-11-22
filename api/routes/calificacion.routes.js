import { Router } from 'express';
import { 
    createCalificacion, 
    getCalificaciones, 
    getCalificacionesTotal, 
    putCalificacion, 
    updateCalificacion, 
    deleteCalificacion, 
    getCalificacionId, 
    getCalificacionUsuario 
} from '../controllers/calificacion.controller.js';

const router = Router();
router.post('/calificar-ruta', createCalificacion);
router.get('/calificaciones/:rutaId', getCalificaciones);
router.get('/', getCalificacionesTotal);
router.get('/:id', getCalificacionId);
router.get('/ruta/:rutaId/usuario/:userId', getCalificacionUsuario);
router.put('/calificaciones/:id', updateCalificacion);
router.delete('/:id', deleteCalificacion);
router.put('/:id', putCalificacion);

export default router;