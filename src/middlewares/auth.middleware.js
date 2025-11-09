import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const verifyToken = (req, res, next) => {
  // 1. Obtener el token del encabezado de la petición
  // Formato esperado: "Bearer <token>"
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // 2. Si no hay token, no hay acceso
  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' });
  }

  // 3. Verificar si el token es válido
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      // Si el token expiró o es inválido
      return res.status(403).json({ message: 'Token no válido.' });
    }
    
    // 4. Si el token es válido, guardamos los datos del usuario (payload) en el objeto 'req'
    // para que las siguientes funciones (los controladores) puedan usarlo.
    req.user = user;
    
    // 5. Llamar a 'next()' para permitir que la petición continúe a su destino (el controlador).
    next();
  });
};