import { Router } from 'express';
import { getReportes, getReporte, createReporte, updateReporte, deleteReporte } from '../controllers/reportes.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = Router();

// Rutas Públicas (cualquiera puede ver los reportes)
router.get('/', getReportes);
router.get('/:id', getReporte);

// Rutas Protegidas (solo usuarios autenticados)
// El middleware 'verifyToken' se ejecuta primero. Si pasa, se ejecuta el controlador.
router.post('/', verifyToken, createReporte);
router.put('/:id', verifyToken, updateReporte);
router.delete('/:id', verifyToken, deleteReporte);

export default router;