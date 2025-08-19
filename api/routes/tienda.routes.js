// src/routes/tienda.routes.js
import { Router } from "express";
import {
    getTiendas,
    getTiendasVisibles,
    postTienda,
    putTienda,
    deleteTienda,
    toggleTiendaVisibilidad
} from "../controllers/tienda.controller.js";

const router = Router();

router.get("/admin", getTiendas); // Para el panel de administración
router.get("/", getTiendasVisibles); // Para la vista pública de tiendas
router.post("/", postTienda);
router.put("/:id", putTienda);
router.put("/visibilidad/:id", toggleTiendaVisibilidad);
router.delete("/:id", deleteTienda);

export default router;