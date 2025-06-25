# 🚪 Control de Acceso Portería SENA - Taladro

Aplicación web para gestionar el acceso de personas, vehículos y elementos a las instalaciones del SENA, sede Taladro. Permite registrar entradas y salidas de forma segura, realizar consultas y administrar usuarios.

---

## 📌 Tabla de Contenidos

- [🎯 Objetivo del Proyecto](#-objetivo-del-proyecto)
- [🚀 Tecnologías Usadas](#-tecnologías-usadas)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
- [📖 Casos de Uso](#-casos-de-uso)
- [🧭 Mapa de Navegación](#-mapa-de-navegación)
- [🔐 Seguridad](#-seguridad)
- [🧪 Pruebas](#-pruebas)
- [⚙️ Instalación y Configuración](#️-instalación-y-configuración)
- [🌍 Entorno de Desarrollo y Pruebas](#-entorno-de-desarrollo-y-pruebas)
- [👨‍💻 Autores](#-autores)

---

## 🎯 Objetivo del Proyecto

Desarrollar un sistema web con autenticación, registro de entradas y salidas, y consultas relacionadas con el control de acceso físico en la portería del SENA.

---

## 🚀 Tecnologías Usadas

### Frontend (React + Vite)

- React
- React Router DOM
- TailwindCSS o CSS Modules
- Axios

### Backend (Node.js + Express)

- Node.js
- MySQL

### Herramientas

- Visual Studio Code
- Git y GitHub
- Postman
- Figma (diseño)
- ESLint

---

## 📁 Estructura del Proyecto

├──api-control-acceso
├──config
├── controllers/
├── models/
├── routes/
├── config/
├── server.js
├── .env

controlAccesoReact/
├── src/
├── ui/
├── Button.jsx
├── Card.jsx
├── DatePicker.jsx
├── InputField.jsx
├── Modal.jsx
├── SelectDropdown.jsx
├── Spinner.jsx
│ ├── components/
├──AlertComponent.jsx
├──ConsultasComponent.jsx
├──ElementosComponent.jsx
├──FooterComponent.jsx
├──ModalLoginComponent.jsx
├──NavbarComponent.jsx
├──PersonasComponent.jsx
├──RegistrosComponent.jsx
├──VehiculosComponent.jsx
├──LoginComponent.jsx
│ ├── Styles/
├── modal.css
│ ├── AppRouter.jsx
│ ├──main.jsx
├── styles.css
├── .gitignore
├──eslint.config.js
├── etc....

## 📖 Casos de Uso

1. **Inicio de sesión de usuario**
2. **Registro de ingreso/salida de personas**
3. **Registro de vehículos y elementos**
4. **Consultas por fecha, persona o tipo**
5. **Administración de usuarios (rol guardia/admin)**

### 🧪 Ambiente de desarrollo

- Sistema operativo: Windows 11
- Node.js v18.17.0
- Vite v6.2.6
- Editor: Visual Studio Code
- Backend:
- Base de datos: MySQL

##🔐 Seguridad
La aplicación implementa mecanismos básicos de seguridad para proteger la información sensible y controlar el acceso:

-Autenticación basada en JSON Web Tokens (JWT) para usuarios registrados.
-Encriptación de contraseñas con bcrypt antes de almacenarlas en la base de datos.
-Validación de formularios tanto en el frontend (React) como en el backend (Node.js).
-Protección de rutas: rutas privadas protegidas en frontend según el rol del usuario.
-Control de roles: Se diferencian al menos dos tipos de usuario (ej. guardia y admin) con distintos permisos de acceso a módulos.

## 🧪 Pruebas

Las pruebas se realizaron con los siguientes métodos:

Backend:
-Pruebas de endpoints con Postman.
-Pruebas unitarias (por implementar) con Jest y Supertest.

Frontend:
-Pruebas manuales de comportamiento.
-Validaciones visuales y de flujo de navegación.

Base de datos:
-Verificación de inserción, eliminación y consulta desde el backend.

🔧 Se planifica integrar pruebas automatizadas más adelante en ambos entornos.

Instalación y Configuración
Próximamente...

##👨‍💻 Autores

Paula Andrea Bernal
📧 paulabeltran993@gmail.com

Jhoans Stiven Sandoval
📧 sandovaljhoan260@gmail.com

Ficha: 2879713 - Tecnólogo en Análisis y Desarrollo de Software
Formación: SENA - Pitalito, Huila
Roles: Backend y Frontend Developers
