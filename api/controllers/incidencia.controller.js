import Incident from '../models/Incidencia.js';

// Crear un incidente

const generateIncidentNumber = () => {
    // Obtén la fecha actual en formato MMDD
    const now = new Date();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');

    // Genera un número aleatorio para hacer el código único
    const randomNum = Math.floor(Math.random() * 10000); // Un número aleatorio de 4 dígitos

    // Forma el número de incidencia
    return `T${randomNum} ${month}${day}`;
};

// Uso de la función
/* const incidentNumber = generateIncidentNumber(); */

export const createIncident = async (req, res) => {
  try {
    const incidentNumber = generateIncidentNumber(); // Genera el número de incidencia
    const incident = new Incident({
      ...req.body,
        number: incidentNumber, // Asigna el número de incidencia generado
    });
    await incident.save();
    res.status(201).json(incident);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener todos los incidentes
export const getIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find();
    res.status(200).json(incidents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un incidente por ID
export const getIncidentById = async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);
    if (!incident) return res.status(404).json({ message: 'Incident not found' });
    res.status(200).json(incident);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateIncident = async (req, res) => {
    try {
      const incident = await Incident.findById(req.params.id);
      if (!incident) return res.status(404).json({ message: 'Incident not found' });
  
      // Actualiza los campos que se proporcionen en el cuerpo de la solicitud
      Object.assign(incident, req.body);
  
      await incident.save(); // Guarda los cambios
      res.status(200).json(incident);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };