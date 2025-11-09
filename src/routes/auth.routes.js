import { Router } from 'express';
import { register, login } from '../controllers/auth.controller.js';

const router = Router();

// Ruta para registrar un nuevo usuario
// Cuando llegue una petición POST a /api/auth/register, se ejecutará la función 'register'
router.post('/register', register);

// Ruta para iniciar sesión
// Cuando llegue una petición POST a /api/auth/login, se ejecutará la función 'login'
router.post('/login', login);

export default router;