-- Borramos las tablas si ya existen para empezar desde cero (útil para pruebas)
DROP TABLE IF EXISTS reportes;
DROP TABLE IF EXISTS usuarios;

-- Tabla para almacenar los usuarios de la plataforma
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    rol VARCHAR(20) NOT NULL CHECK (rol IN ('ciudadano', 'reciclador', 'admin')),
    fecha_registro TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla para almacenar los reportes de residuos
CREATE TABLE reportes (
    id SERIAL PRIMARY KEY,
    ciudadano_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    latitud DECIMAL(10, 8) NOT NULL,
    longitud DECIMAL(11, 8) NOT NULL,
    descripcion TEXT,
    estado VARCHAR(20) NOT NULL DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'recogido')),
    fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    reciclador_id INTEGER REFERENCES usuarios(id) ON DELETE SET NULL -- Opcional: quién lo recogió
);

-- Índices para mejorar la velocidad de las búsquedas
CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_reportes_estado ON reportes(estado);
CREATE INDEX idx_reportes_ciudadano_id ON reportes(ciudadano_id);