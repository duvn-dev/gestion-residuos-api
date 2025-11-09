// 1. Importar el paquete 'pg' y específicamente la clase 'Pool'
import pg from 'pg';
const { Pool } = pg;

// 2. Importar dotenv para poder usar las variables de entorno
import dotenv from 'dotenv';
dotenv.config();

// 3. Crear una nueva instancia de Pool con la configuración de la base de datos.
// El Pool gestiona eficientemente múltiples conexiones a la base de datos.
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// 4. Probar la conexión (opcional pero muy recomendado)
// Usamos una función autoejecutable async para poder usar 'await'
(async () => {
  try {
    const client = await pool.connect();
    console.log('Conexión a la base de datos establecida correctamente.');
    client.release(); // Liberamos el cliente para que vuelva al pool
  } catch (err) {
    console.error('Error al conectar con la base de datos:', err.stack);
  }
})();

// 5. Exportar el pool para que podamos usarlo en otras partes de la aplicación
export default pool;