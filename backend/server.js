// Ruta: backend/server.js
// Descripción: Este archivo contiene la configuración del servidor Express, incluyendo la configuración de CORS, las rutas de autenticación, usuarios y documentos,
//              y la configuración de puerto del servidor.

const express = require("express"); 
const cors = require("cors");  // Importamos el paquete CORS para habilitar solicitudes desde diferentes orígenes
const app = express();
require("dotenv").config(); // Para cargar las variables de entorno desde el archivo .env

// Middleware para habilitar CORS
app.use(cors());  // Permite solicitudes desde cualquier origen

// Middleware para manejar solicitudes JSON
app.use(express.json());

// Importar rutas
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const documentRoutes = require("./routes/documents");

// Usar las rutas con el prefijo '/api'
app.use("/api/auth", authRoutes.router); // Ruta de autenticación
app.use("/api/users", userRoutes);       // Ruta de usuarios
app.use("/api/documents", documentRoutes); // Ruta de documentos

// Iniciar servidor en el puerto configurado en el archivo .env o en el puerto 5000 por defecto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
