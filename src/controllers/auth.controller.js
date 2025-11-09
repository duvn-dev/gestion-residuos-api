import pool from '../db/database.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// --- Controlador para el REGISTRO de un nuevo usuario ---
export const register = async (req, res) => {
  // 1. Extraer los datos del cuerpo de la petición (el JSON que nos envían)
  const { nombre, email, password, rol } = req.body;

  // Validación simple (en un proyecto real sería más robusta)
  if (!nombre || !email || !password || !rol) {
    return res.status(400).json({ message: 'Todos los campos son requeridos.' });
  }

  try {
    // 2. Hashear la contraseña antes de guardarla
    const salt = await bcrypt.genSalt(10); // Genera una "sal" para mayor seguridad
    const passwordHash = await bcrypt.hash(password, salt);

    // 3. Insertar el nuevo usuario en la base de datos
    const result = await pool.query(
      'INSERT INTO usuarios (nombre, email, password_hash, rol) VALUES ($1, $2, $3, $4) RETURNING id, email',
      [nombre, email, passwordHash, rol]
    );

    // 4. Responder al cliente con un mensaje de éxito
    res.status(201).json({ 
        message: 'Usuario registrado exitosamente.',
        user: result.rows[0] 
    });

  } catch (error) {
    // Manejo de errores (ej. email duplicado)
    if (error.code === '23505') { // Código de error de PostgreSQL para violación de constraint UNIQUE
      return res.status(409).json({ message: 'El email ya está registrado.' });
    }
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// --- Controlador para el LOGIN de un usuario existente ---
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email y contraseña son requeridos.' });
  }

  try {
    // 1. Buscar al usuario por su email en la base de datos
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    // 2. Comparar la contraseña enviada con la contraseña hasheada que tenemos guardada
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ message: 'Contraseña incorrecta.' });
    }

    // 3. Si todo es correcto, crear el Token JWT
    const token = jwt.sign(
      { id: user.id, rol: user.rol }, // "Payload": ¿Qué datos guardamos en el token?
      process.env.JWT_SECRET,          // La clave secreta para firmar el token
      { expiresIn: '1h' }             // Opciones: ¿Cuánto tiempo es válido el token?
    );

    // 4. Enviar el token al cliente
    res.json({ 
        message: 'Login exitoso.',
        token: token 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};