/**
 * Ruta: components/dashboard/header.js
 * Descripción: Componente que muestra la barra superior del dashboard, con la funcionalidad 
 *              de búsqueda, filtros y cambio de tema.
 */

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFilter } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../context/ThemeContext";

const Header = ({ onFilter }) => {
    const { isDarkMode, toggleTheme } = useTheme();  // Obtiene el estado del tema y la función para cambiarlo
    const [searchTerm, setSearchTerm] = useState(""); // Maneja el término de búsqueda

    // Función para manejar el cambio en el input de búsqueda
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        onFilter(e.target.value); // Llama a la función de filtro al escribir
    };

    return (
        <div
            className={`flex justify-between items-center px-6 py-4 ${isDarkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"}`}
        >
            {/* Barra de búsqueda */}
            <div className="flex items-center space-x-2">
                <input
                    type="text"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className={`p-2 rounded ${isDarkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-black"}`}
                />
                <FontAwesomeIcon
                    icon={faSearch}
                    className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
                />
    
                 <button
                    className={`flex items-center px-4 py-2 rounded ${isDarkMode ? "bg-gray-600 hover:bg-gray-700 text-white" : "bg-red-600 hover:bg-red-700 text-white"}`}
                    onClick={() => alert("Filtrar documentos")} // Aquí puedes implementar la funcionalidad de filtro
                >
                
                    Filtrar
                    <FontAwesomeIcon
                        icon={faFilter}
                        className="mr-2 ml-2"
                        onClick={() => toggleTheme()}
                    />
                </button>
                
            </div>

        
        </div>
    );
};

export default Header;
