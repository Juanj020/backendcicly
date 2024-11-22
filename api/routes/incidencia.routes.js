import express from 'express';
const router = express.Router();
import {createIncident, getIncidentById, getIncidents, updateIncident} from '../controllers/incidencia.controller.js';

router.post('/', createIncident);
router.get('/', getIncidents);
router.get('/:id', getIncidentById);
router.patch('/:id', updateIncident);

export default router;