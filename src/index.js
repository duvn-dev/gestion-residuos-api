// 1. Importar las dependencias que vamos a usar
import express from 'express';
import dotenv from 'dotenv';
import './db/database.js';
import reportesRoutes from './routes/reportes.routes.js';
import cors from 'cors';

// 2. Configurar dotenv para que lea nuestro archivo .env
dotenv.config();

// 3. Crear una instancia de nuestra aplicación Express
const app = express();
app.use(cors());
app.use(express.json()); // Middleware para parsear bodies de peticiones en formato JSON
app.use(express.static('public'));

// 4. Definir el puerto. process.env.PORT viene del archivo .env
const PORT = process.env.PORT || 4000; // Si no encuentra el puerto en .env, usa el 4000

// 5. Crear una ruta de prueba (un "endpoint")
// Cuando alguien visite la URL raíz ('/'), le responderemos con un JSON.
app.get('/', (req, res) => {
  res.json({ message: '¡API!' });
});

// Importar las rutas de autenticación
import authRoutes from './routes/auth.routes.js';

// Usar las rutas. Todas las rutas definidas en authRoutes comenzarán con /api/auth
app.use('/api/auth', authRoutes);
app.use('/api/reportes', reportesRoutes);

// 6. Poner el servidor a "escuchar" peticiones en el puerto definido
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

