# API Backend - Plataforma de Gestión de Residuos

Este repositorio contiene el código fuente del **servicio de backend** para el proyecto "Plataforma tecnológica para optimizar la gestión de residuos sólidos en Bogotá".

**La API está desplegada en Render y se encuentra completamente funcional y accesible en la siguiente URL:**
> ### **URL Base de la API: `https://gestion-residuos-api.onrender.com`**

Esta API RESTful es la responsable de gestionar toda la lógica de negocio, la interacción con la base de datos y la seguridad de la aplicación. Está diseñada para ser consumida por uno o varios clientes, como una aplicación web (frontend) o una aplicación móvil.

> **Nota:** El código fuente del frontend final en React se encuentra en un repositorio separado para mantener un desarrollo desacoplado y organizado.
>
> **Repositorio del Frontend:** `[ENLACE AL REPOSITORIO DEL FRONTEND CUANDO EXISTA]`

## Características del Backend

*   **Autenticación Segura:** Sistema de registro y login basado en JSON Web Tokens (JWT) con encriptación de contraseñas (bcrypt).
*   **Gestión de Roles:** Diferenciación entre usuarios 'ciudadano' y 'reciclador' para control de acceso a funcionalidades específicas.
*   **CRUD de Reportes:** Endpoints completos para crear, leer, actualizar y eliminar reportes de residuos.
*   **Cliente de Prueba Incluido:** Incluye un frontend simple en HTML y JavaScript para demostración y validación rápida de la API.
*   **API RESTful:** Sigue los principios de diseño REST para una comunicación predecible y estandarizada.

## Tecnologías Utilizadas

*   **Runtime:** Node.js
*   **Framework:** Express.js
*   **Base de Datos:** PostgreSQL
*   **Despliegue:** Render
*   **Autenticación:** JSON Web Tokens (`jsonwebtoken`), `bcrypt.js`
*   **Driver de DB:** node-postgres (`pg`)

## Documentación de Endpoints

A continuación se detallan los endpoints disponibles. **Todas las rutas deben ir precedidas de la URL base:** `https://gestion-residuos-api.onrender.com`

**Ejemplo:** Para registrar un usuario, la petición POST se debe hacer a `https://gestion-residuos-api.onrender.com/api/auth/register`.

### Autenticación (`/api/auth`)

*   `POST /register`: Registra un nuevo usuario.
*   `POST /login`: Inicia sesión y devuelve un token JWT.

### Reportes (`/api/reportes`)

*   `GET /`: Obtiene todos los reportes (Pública).
*   `GET /:id`: Obtiene un reporte por su ID (Pública).
*   `POST /`: Crea un nuevo reporte (Protegida, requiere token).
*   `PUT /:id`: Actualiza un reporte (Protegida, requiere token de 'reciclador').
*   `DELETE /:id`: Elimina un reporte (Protegida, requiere token del dueño o 'admin').

---

## Desarrollo Local (Opcional)

Las siguientes instrucciones son para levantar un entorno de desarrollo local si se desea contribuir al código del backend.

### Prerrequisitos

*   Node.js (versión LTS recomendada)
*   PostgreSQL
*   Git

### Pasos

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/duvn-dev/gestion-residuos-api.git
    cd gestion-residuos-api
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar la base de datos local:**
    *   Crea una base de datos en PostgreSQL llamada `residuos_db`.
    *   Ejecuta el script `database.sql` para crear las tablas.

4.  **Configurar variables de entorno locales:**
    *   Crea un archivo `.env` en la raíz y añade las variables necesarias (`PORT`, `DB_USER`, `DB_PASSWORD`, `JWT_SECRET`, etc.).

5.  **Iniciar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    La API estará escuchando en `http://localhost:3000`.

## Cliente de Prueba HTML (Para Desarrollo Local)

Este repositorio incluye un cliente web simple en la carpeta `/public` para facilitar las pruebas locales. Una vez que el servidor local esté corriendo (`npm run dev`), puedes acceder a las siguientes páginas:

*   **Registro:** `http://localhost:3000/registro.html`
*   **Login:** `http://localhost:3000/login.html`
*   **Dashboard:** `http://localhost:3000/dashboard.html`