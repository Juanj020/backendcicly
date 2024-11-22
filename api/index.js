import dotenv from 'dotenv';
import { Server } from './models/server.js';
import { VercelRequest, VercelResponse } from '@vercel/node';

dotenv.config(); // Asegúrate de que esto esté correcto

const server = new Server();

export default (req = VercelRequest, res = VercelResponse) => {
    server.app(req, res);
};