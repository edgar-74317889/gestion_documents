/**
 * Ruta: backend/routes/users.js
 * Descripción: Rutas para manejar usuarios en el sistema. Permite operaciones CRUD 
 *              sobre los datos almacenados en `users.json`.
 */

const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

// Ruta del archivo JSON
const usersPath = path.join(__dirname, "../data/users.json");

// Funciones auxiliares para leer y escribir datos
const loadUsers = () => {
    try {
        const data = fs.readFileSync(usersPath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error al leer el archivo de usuarios:", error);
        return [];
    }
};

const saveUsers = (data) => {
    try {
        fs.writeFileSync(usersPath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("Error al guardar el archivo de usuarios:", error);
    }
};

// ** 1. Obtener todos los usuarios o buscar por cargo **
router.get("/", (req, res) => {
    const { cargo } = req.query;
    let users = loadUsers();

    // Si se proporciona un cargo, buscar usuarios con ese cargo
    if (cargo) {
        users = users.filter((user) => user.cargo === cargo);
        if (users.length === 0) {
            return res.status(404).json({ message: "No se encontraron usuarios con ese cargo." });
        }
    }

    res.json(users);
});

// ** 2. Crear un nuevo usuario **
router.post("/", async (req, res) => {
    const { cargo, nombres, apellidos, clave } = req.body;

    // Validar campos obligatorios
    if (!cargo || !nombres || !apellidos || !clave) {
        return res.status(400).json({ message: "Todos los campos son obligatorios." });
    }

    const users = loadUsers();

    // Crear un nuevo usuario con ID único
    const newUser = {
        id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
        cargo,
        nombres,
        apellidos,
        clave: await bcrypt.hash(clave, 10), // Encriptar contraseña
    };

    users.push(newUser);
    saveUsers(users);
    res.status(201).json(newUser);
});

// ** 3. Actualizar un usuario por ID **
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { cargo, nombres, apellidos, clave } = req.body;
    let users = loadUsers();

    const userIndex = users.findIndex((user) => user.id === parseInt(id));
    if (userIndex === -1) {
        return res.status(404).json({ message: "Usuario no encontrado." });
    }

    // Actualizar solo los campos proporcionados
    const updatedUser = {
        ...users[userIndex],
        ...(cargo && { cargo }),
        ...(nombres && { nombres }),
        ...(apellidos && { apellidos }),
        ...(clave && { clave: await bcrypt.hash(clave, 10) }),
    };

    users[userIndex] = updatedUser;
    saveUsers(users);
    res.json(updatedUser);
});

// ** 4. Eliminar un usuario por ID **
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    let users = loadUsers();

    const newUsers = users.filter((user) => user.id !== parseInt(id));
    if (users.length === newUsers.length) {
        return res.status(404).json({ message: "Usuario no encontrado." });
    }

    saveUsers(newUsers);
    res.json({ message: "Usuario eliminado con éxito." });
});

module.exports = router;
