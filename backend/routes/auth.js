/**
 * Ruta: backend/routes/auth.js
 * Descripción: Rutas para manejar la autenticación de usuarios. Verifica credenciales
 *              y genera tokens JWT para sesiones seguras.
 */

const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

// Configuración del token JWT
const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey";  // Usar la variable de entorno JWT_SECRET
const TOKEN_EXPIRATION = "1h";

// Ruta del archivo JSON de usuarios
const usersPath = path.join(__dirname, "../data/users.json");

// Función auxiliar para cargar usuarios
const loadUsers = () => {
    try {
        const data = fs.readFileSync(usersPath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error al leer el archivo de usuarios:", error);
        return [];
    }
};

// ** Autenticación de usuario **
router.post("/authenticate", (req, res) => {
    const { cargo, clave } = req.body;

    // Verificar si cargo y clave están vacíos
    if (!cargo || !clave) {
        return res.status(400).json({ message: "Cargo y clave son obligatorios." });
    }

    const users = loadUsers();
    const user = users.find((u) => u.cargo === cargo);

    // Verificar si el usuario existe
    if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado." });
    }

    // Comparar la clave (en texto plano) con la almacenada
    const isPasswordValid = clave === user.clave; // Comparación de texto plano
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Clave incorrecta." });
    }

    // Generar un token JWT
    const token = jwt.sign({ id: user.id, cargo: user.cargo }, SECRET_KEY, {
        expiresIn: TOKEN_EXPIRATION,
    });

    res.json({
        message: "Autenticación exitosa.",
        token,
        user: { id: user.id, nombres: user.nombres, apellidos: user.apellidos, cargo: user.cargo },
    });
});

module.exports = { router };
