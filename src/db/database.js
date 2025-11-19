import pg from 'pg';
const { Pool } = pg;
import dotenv from 'dotenv';
dotenv.config();

// Esta es la configuración que funciona tanto en tu PC local como en Render
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Pequeña prueba para ver si la conexión funciona al arrancar
(async () => {
  try {
    const client = await pool.connect();
    console.log('✅ ¡CONEXIÓN EXITOSA A LA BASE DE DATOS EN LA NUBE!');
    client.release();
  } catch (err) {
    console.error('❌ ERROR AL CONECTAR CON LA BASE DE DATOS:', err.stack);
  }
})();

export default pool;