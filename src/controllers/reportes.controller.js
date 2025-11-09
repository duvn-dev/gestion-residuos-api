import pool from '../db/database.js';

// --- Controlador para obtener TODOS los reportes ---
// Es una ruta pública, no requiere permisos especiales.
export const getReportes = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM reportes ORDER BY fecha_creacion DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error en getReportes:', error);
    res.status(500).json({ message: 'Error interno del servidor al obtener reportes.' });
  }
};

// --- Controlador para obtener UN solo reporte por su ID ---
// También es una ruta pública.
export const getReporte = async (req, res) => {
  const { id } = req.params; // Obtenemos el ID de la URL (ej. /api/reportes/12)
  try {
    const result = await pool.query('SELECT * FROM reportes WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Reporte no encontrado.' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error en getReporte:', error);
    res.status(500).json({ message: 'Error interno del servidor al obtener el reporte.' });
  }
};

// --- Controlador para crear un NUEVO reporte ---
// Esta es una ruta protegida. El middleware ya verificó el token.
export const createReporte = async (req, res) => {
  // El ID del ciudadano viene del token que el middleware 'verifyToken' ya procesó y guardó en req.user
  const ciudadano_id = req.user.id; 
  const { latitud, longitud, descripcion } = req.body; // Obtenemos los datos del JSON enviado por el cliente

  if (!latitud || !longitud) {
    return res.status(400).json({ message: 'La latitud y longitud son requeridas.' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO reportes (ciudadano_id, latitud, longitud, descripcion) VALUES ($1, $2, $3, $4) RETURNING *',
      [ciudadano_id, latitud, longitud, descripcion]
    );
    // Respondemos con el reporte recién creado en la base de datos
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error en createReporte:', error);
    res.status(500).json({ message: 'Error interno del servidor al crear el reporte.' });
  }
};

// --- Controlador para actualizar un reporte existente ---
// Ruta protegida. Usaremos los datos del token para verificar permisos.
export const updateReporte = async (req, res) => {
    const { id } = req.params; // ID del reporte a actualizar
    const { estado } = req.body; // El nuevo estado (ej. "recogido")
    const usuarioQueActualiza = req.user; // Datos del usuario que hace la petición (del token)

    if (!estado) {
        return res.status(400).json({ message: 'El campo "estado" es requerido para actualizar.' });
    }

    // Lógica de permisos: solo un usuario con rol 'reciclador' puede cambiar el estado.
    if (usuarioQueActualiza.rol !== 'reciclador') {
        return res.status(403).json({ message: 'Acción no permitida. Solo los recicladores pueden actualizar el estado de un reporte.' });
    }

    try {
        const result = await pool.query(
            'UPDATE reportes SET estado = $1, reciclador_id = $2 WHERE id = $3 RETURNING *',
            [estado, usuarioQueActualiza.id, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Reporte no encontrado para actualizar.' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error en updateReporte:', error);
        res.status(500).json({ message: 'Error interno del servidor al actualizar el reporte.' });
    }
};

// --- Controlador para borrar un reporte ---
// Ruta protegida con lógica de permisos más específica.
export const deleteReporte = async (req, res) => {
  const { id } = req.params; // ID del reporte a borrar
  const usuarioQueBorra = req.user; // Datos del usuario que hace la petición (del token)

  try {
    // Primero, verificamos a quién pertenece el reporte
    const reporteResult = await pool.query('SELECT ciudadano_id FROM reportes WHERE id = $1', [id]);
    
    if (reporteResult.rows.length === 0) {
      return res.status(404).json({ message: 'Reporte no encontrado para eliminar.' });
    }

    const duenoDelReporteId = reporteResult.rows[0].ciudadano_id;

    // Lógica de permisos: solo el usuario que creó el reporte O un 'admin' pueden borrarlo.
    if (duenoDelReporteId !== usuarioQueBorra.id && usuarioQueBorra.rol !== 'admin') {
      return res.status(403).json({ message: 'Acción no permitida. No tienes permiso para borrar este reporte.' });
    }

    // Si los permisos son correctos, procedemos a borrar.
    await pool.query('DELETE FROM reportes WHERE id = $1', [id]);
    
    // Enviamos una respuesta 204 No Content, que es el estándar para un DELETE exitoso.
    res.sendStatus(204); 
  } catch (error) {
    console.error('Error en deleteReporte:', error);
    res.status(500).json({ message: 'Error interno del servidor al eliminar el reporte.' });
  }
};