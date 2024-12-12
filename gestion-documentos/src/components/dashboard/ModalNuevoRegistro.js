/**
 * Ruta: components/dashboard/modalnuevoregistro.js
 * Descripción: Componente de modal para registrar un nuevo documento. El usuario puede 
 *              ingresar los datos de un nuevo documento y guardarlos en la base de datos.
 */

import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

const ModalNuevoRegistro = ({ isOpen, onClose, onSave }) => {
    const { isDarkMode } = useTheme();  // Usamos el contexto del tema
    const [formData, setFormData] = useState({
        motivo: "",
        tipoDocumento: "",
        numero: "",
        procedencia: "",
        archivo: null,
        fechaRecepcion: "",
        mesCorrespondiente: "",
        descripcion: "",
    });

    // Manejo de los cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    // Enviar el formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        // Validación simple para asegurarse de que todos los campos estén completos
        if (!formData.motivo || !formData.tipoDocumento || !formData.numero || !formData.procedencia || !formData.fechaRecepcion || !formData.mesCorrespondiente || !formData.descripcion) {
            alert("Por favor complete todos los campos.");
            return;
        }
        onSave(formData); // Guardar los datos
        onClose(); // Cerrar el modal
        setFormData({ // Resetear el formulario
            motivo: "",
            tipoDocumento: "",
            numero: "",
            procedencia: "",
            archivo: null,
            fechaRecepcion: "",
            mesCorrespondiente: "",
            descripcion: "",
        });
    };

    if (!isOpen) return null;  // No mostrar el modal si `isOpen` es false

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div
                className={`w-full max-w-md p-6 rounded-lg shadow-lg ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}
            >
                <h2 className="text-xl font-bold mb-4">Nuevo Registro</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Motivo */}
                    <div>
                        <label
                            htmlFor="motivo"
                            className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                        >
                            Motivo:
                        </label>
                        <select
                            id="motivo"
                            name="motivo"
                            value={formData.motivo}
                            onChange={handleChange}
                            required
                            className={`w-full p-2 border rounded ${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-gray-100 text-black border-gray-300"}`}
                        >
                            <option value="">Seleccione un motivo</option>
                            <option value="Vacaciones">Vacaciones</option>
                            <option value="Licencias">Licencias</option>
                            <option value="Justificaciones">Justificaciones</option>
                            <option value="Informes">Informes</option>
                        </select>
                    </div>

                    {/* Tipo de Documento */}
                    <div>
                        <label
                            htmlFor="tipoDocumento"
                            className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                        >
                            Tipo de Documento:
                        </label>
                        <input
                            type="text"
                            id="tipoDocumento"
                            name="tipoDocumento"
                            value={formData.tipoDocumento}
                            onChange={handleChange}
                            required
                            className={`w-full p-2 border rounded ${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-gray-100 text-black border-gray-300"}`}
                        />
                    </div>

                    {/* Número */}
                    <div>
                        <label
                            htmlFor="numero"
                            className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                        >
                            Número:
                        </label>
                        <input
                            type="text"
                            id="numero"
                            name="numero"
                            value={formData.numero}
                            onChange={handleChange}
                            required
                            className={`w-full p-2 border rounded ${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-gray-100 text-black border-gray-300"}`}
                        />
                    </div>

                    {/* Procedencia */}
                    <div>
                        <label
                            htmlFor="procedencia"
                            className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                        >
                            Procedencia/Personal:
                        </label>
                        <input
                            type="text"
                            id="procedencia"
                            name="procedencia"
                            value={formData.procedencia}
                            onChange={handleChange}
                            required
                            className={`w-full p-2 border rounded ${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-gray-100 text-black border-gray-300"}`}
                        />
                    </div>

                    {/* Archivo */}
                    <div>
                        <label
                            htmlFor="archivo"
                            className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                        >
                            Archivo:
                        </label>
                        <input
                            type="file"
                            id="archivo"
                            name="archivo"
                            onChange={handleChange}
                            className={`w-full p-2 border rounded ${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-gray-100 text-black border-gray-300"}`}
                        />
                    </div>

                    {/* Fecha de Recepción */}
                    <div>
                        <label
                            htmlFor="fechaRecepcion"
                            className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                        >
                            Fecha de Recepción:
                        </label>
                        <input
                            type="date"
                            id="fechaRecepcion"
                            name="fechaRecepcion"
                            value={formData.fechaRecepcion}
                            onChange={handleChange}
                            required
                            className={`w-full p-2 border rounded ${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-gray-100 text-black border-gray-300"}`}
                        />
                    </div>

                    {/* Mes Correspondiente */}
                    <div>
                        <label
                            htmlFor="mesCorrespondiente"
                            className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                        >
                            Mes Correspondiente:
                        </label>
                        <input
                            type="text"
                            id="mesCorrespondiente"
                            name="mesCorrespondiente"
                            value={formData.mesCorrespondiente}
                            onChange={handleChange}
                            required
                            className={`w-full p-2 border rounded ${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-gray-100 text-black border-gray-300"}`}
                        />
                    </div>

                    {/* Descripción */}
                    <div>
                        <label
                            htmlFor="descripcion"
                            className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                        >
                            Descripción:
                        </label>
                        <textarea
                            id="descripcion"
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                            rows="3"
                            required
                            className={`w-full p-2 border rounded ${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-gray-100 text-black border-gray-300"}`}
                        ></textarea>
                    </div>

                    {/* Botones */}
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className={`px-4 py-2 rounded ${isDarkMode ? "bg-gray-600 hover:bg-gray-700 text-white" : "bg-gray-300 hover:bg-gray-400 text-black"}`}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className={`px-4 py-2 rounded ${isDarkMode ? "bg-red-600 hover:bg-red-700 text-white" : "bg-red-600 hover:bg-red-700 text-white"}`}
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalNuevoRegistro;
