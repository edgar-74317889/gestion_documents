/**
 * Ruta: components/dashboard/datatable.js
 * Descripción: Componente que muestra una tabla con los documentos. Permite realizar 
 *              acciones como eliminar, editar y descargar documentos. También incluye 
 *              funcionalidades de filtrado y búsqueda.
 */

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../context/ThemeContext";

const DataTable = () => {
    const { isDarkMode } = useTheme();
    const [documents, setDocuments] = useState([]);  // Estado para almacenar documentos
    const [filter, setFilter] = useState("");  // Estado para el filtro de búsqueda
    const [filteredDocuments, setFilteredDocuments] = useState([]); // Documentos filtrados

    // Obtener documentos desde el backend
    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/documents");
                setDocuments(response.data);
                setFilteredDocuments(response.data); // Al cargar, los documentos son todos
            } catch (error) {
                console.error("Error al obtener documentos:", error);
            }
        };
        fetchDocuments();
    }, []);

    // Filtrar los documentos según el término de búsqueda
    const handleSearch = (e) => {
        const searchTerm = e.target.value;
        setFilter(searchTerm);

        if (searchTerm === "") {
            setFilteredDocuments(documents); // Si no hay búsqueda, mostramos todos los documentos
        } else {
            const filtered = documents.filter((doc) =>
                doc.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) // Filtrar por descripción
            );
            setFilteredDocuments(filtered);
        }
    };

    // Eliminar un documento
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/documents/${id}`);
            setDocuments((prevDocuments) => prevDocuments.filter((doc) => doc.id !== id));
            setFilteredDocuments((prevDocuments) => prevDocuments.filter((doc) => doc.id !== id));
        } catch (error) {
            console.error("Error al eliminar documento:", error);
        }
    };

    // Función de edición (aquí podrías abrir un modal o un formulario para editar el documento)
    const handleEdit = (id) => {
        console.log(`Editar documento con ID: ${id}`);
        // Aquí deberías abrir un modal o formulario con la información del documento para editar
    };

    // Descargar documento
    const handleDownload = (archivo) => {
        // Aquí podrías implementar la lógica para descargar el archivo desde el backend
        const link = document.createElement("a");
        link.href = `http://localhost:5000/files/${archivo}`; // Ruta de descarga
        link.download = archivo;
        link.click();
    };

    return (
        <div className={`p-4 ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
            {/* Barra de búsqueda */}
            <div className="mb-4 flex justify-between items-center">
                <input
                    type="text"
                    placeholder="Buscar documentos..."
                    value={filter}
                    onChange={handleSearch}
                    className={`p-2 rounded ${isDarkMode ? "bg-gray-700 text-white" : "bg-white text-black"}`}
                />
            </div>

            {/* Tabla de documentos */}
            <table className="w-full border-collapse bg-white rounded-lg shadow-md overflow-hidden">
                <thead className={`${isDarkMode ? "bg-gray-800 text-white" : "bg-gray-200"}`}>
                    <tr>
                        <th className="p-2 text-left font-semibold">ID</th>
                        <th className="p-2 text-left font-semibold">Descripción</th>
                        <th className="p-2 text-left font-semibold">Tipo de Documento</th>
                        <th className="p-2 text-left font-semibold">Estado</th>
                        <th className="p-2 text-left font-semibold">Fecha de Recepción</th>
                        <th className="p-2 text-left font-semibold">Mes Correspondiente</th>
                        <th className="p-2 text-left font-semibold">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredDocuments.map((doc) => (
                        <tr
                            key={doc.id}
                            className={`${
                                isDarkMode
                                    ? "bg-gray-700 hover:bg-gray-600"
                                    : "bg-gray-100 hover:bg-gray-200"
                            }`}
                        >
                            <td className="p-2">{doc.id}</td>
                            <td className="p-2">{doc.descripcion}</td>
                            <td className="p-2">{doc.tipoDocumento}</td>
                            <td className="p-2">{doc.estado}</td>
                            <td className="p-2">{doc.fechaRecepcion}</td>
                            <td className="p-2">{doc.mesCorrespondiente}</td>
                            <td className="p-2 flex space-x-2 text-center">
                                <FontAwesomeIcon
                                    icon={faDownload}
                                    className="cursor-pointer text-blue-500"
                                    onClick={() => handleDownload(doc.archivo)}
                                />
                                <FontAwesomeIcon
                                    icon={faEdit}
                                    className="cursor-pointer text-yellow-500"
                                    onClick={() => handleEdit(doc.id)}
                                />
                                <FontAwesomeIcon
                                    icon={faTrash}
                                    className="cursor-pointer text-red-500"
                                    onClick={() => handleDelete(doc.id)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;
