import dotenv from 'dotenv';
import { Server } from './models/server.js';

dotenv.config(); // Asegúrate de que esto esté correcto

const server = new Server();

server.listen();