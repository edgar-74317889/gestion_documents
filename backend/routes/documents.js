/**
 * Ruta: backend/routes/documents.js
 * Descripción: Rutas para manejar documentos en el sistema. Permite operaciones CRUD 
 *              y filtrado sobre los datos almacenados en `documents.json`.
 */

const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

// Ruta del archivo JSON
const documentsPath = path.join(__dirname, "../data/documents.json");

// Funciones auxiliares para leer y escribir datos
const loadDocuments = () => {
    try {
        const data = fs.readFileSync(documentsPath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error al leer el archivo de documentos:", error);
        return [];
    }
};

const saveDocuments = (data) => {
    try {
        fs.writeFileSync(documentsPath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("Error al guardar el archivo de documentos:", error);
    }
};

// ** 1. Obtener todos los documentos o aplicar filtros **
router.get("/", (req, res) => {
    const { tipoDocumento, mes, estado } = req.query;
    let documents = loadDocuments();

    // Aplicar filtros si se proporcionan en la query
    if (tipoDocumento) {
        documents = documents.filter((doc) => doc.tipoDocumento === tipoDocumento);
    }
    if (mes) {
        documents = documents.filter((doc) => doc.mesCorrespondiente === mes);
    }
    if (estado) {
        documents = documents.filter((doc) => doc.estado === estado);
    }

    res.json(documents);
});

// ** 2. Agregar un nuevo documento **
router.post("/", (req, res) => {
    const { tipoDocumento, descripcion, estado, fechaRecepcion, mesCorrespondiente, archivo } = req.body;

    if (!tipoDocumento || !descripcion || !estado || !fechaRecepcion || !mesCorrespondiente || !archivo) {
        return res.status(400).json({ message: "Todos los campos son obligatorios." });
    }

    const documents = loadDocuments();
    const newDocument = {
        id: documents.length > 0 ? documents[documents.length - 1].id + 1 : 1, // Generar ID único
        tipoDocumento,
        descripcion,
        estado,
        fechaRecepcion,
        mesCorrespondiente,
        archivo,
    };

    documents.push(newDocument);
    saveDocuments(documents);
    res.status(201).json(newDocument);
});

// ** 3. Actualizar un documento por ID **
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const updatedFields = req.body;
    let documents = loadDocuments();

    const documentIndex = documents.findIndex((doc) => doc.id === parseInt(id));
    if (documentIndex === -1) {
        return res.status(404).json({ message: "Documento no encontrado." });
    }

    // Actualizar solo los campos proporcionados
    documents[documentIndex] = { ...documents[documentIndex], ...updatedFields };
    saveDocuments(documents);
    res.json(documents[documentIndex]);
});

// ** 4. Eliminar un documento por ID **
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    let documents = loadDocuments();

    const newDocuments = documents.filter((doc) => doc.id !== parseInt(id));
    if (documents.length === newDocuments.length) {
        return res.status(404).json({ message: "Documento no encontrado." });
    }

    saveDocuments(newDocuments);
    res.json({ message: "Documento eliminado con éxito." });
});

module.exports = router;
