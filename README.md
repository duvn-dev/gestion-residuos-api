# API de Gestión de Residuos - Proyecto de Grado

Este repositorio contiene el código fuente del backend para la "Plataforma tecnológica para optimizar la gestión de residuos sólidos en Bogotá". La API está construida con Node.js, Express y PostgreSQL.

## Características

*   **Autenticación de Usuarios:** Sistema de registro y login seguro usando JSON Web Tokens (JWT).
*   **Gestión de Roles:** Diferenciación entre usuarios 'ciudadano' y 'reciclador'.
*   **CRUD de Reportes:** Endpoints para crear, leer, actualizar y eliminar reportes de residuos.
*   **Rutas Protegidas:** Uso de middleware para asegurar que solo usuarios autenticados y/o con roles específicos puedan realizar ciertas acciones.

## Tecnologías Utilizadas

*   **Runtime:** Node.js
*   **Framework:** Express.js
*   **Base de Datos:** PostgreSQL
*   **Autenticación:** JSON Web Tokens (JWT), bcrypt.js
*   **Driver de DB:** node-postgres (pg)

## Instalación y Puesta en Marcha

Sigue estos pasos para levantar el entorno de desarrollo local.

### Prerrequisitos

*   Node.js (versión LTS recomendada)
*   PostgreSQL
*   Git

### Pasos

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/TuUsuario/gestion-residuos-api.git
    cd gestion-residuos-api
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar la base de datos:**
    *   Crea una base de datos en PostgreSQL llamada `residuos_db`.
    *   Ejecuta el script `database.sql` que se encuentra en la raíz del proyecto para crear las tablas necesarias.

4.  **Configurar variables de entorno:**
    *   Crea un archivo `.env` en la raíz del proyecto.
    *   Copia el contenido del archivo `.env.example` (si lo tienes) o añade las siguientes variables, reemplazando los valores con tus credenciales:
    ```
    PORT=3000
    DB_USER=postgres
    DB_HOST=localhost
    DB_DATABASE=residuos_db
    DB_PASSWORD=tu_contraseña_secreta
    DB_PORT=5432
    JWT_SECRET=un_secreto_muy_largo
    ```

5.  **Iniciar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    El servidor estará corriendo en `http://localhost:3000`.

## Documentación de la API

Puedes usar las siguientes rutas para probar los endpoints:

### Autenticación (`/api/auth`)

*   `POST /register`: Registra un nuevo usuario.
*   `POST /login`: Inicia sesión y devuelve un token JWT.

### Reportes (`/api/reportes`)

*   `GET /`: Obtiene todos los reportes (Pública).
*   `GET /:id`: Obtiene un reporte por su ID (Pública).
*   `POST /`: Crea un nuevo reporte (Protegida, requiere token).
*   `PUT /:id`: Actualiza un reporte (Protegida, requiere token de 'reciclador').
*   `DELETE /:id`: Elimina un reporte (Protegida, requiere token del dueño o 'admin').