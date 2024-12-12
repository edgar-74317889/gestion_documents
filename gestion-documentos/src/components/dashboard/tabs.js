/**
 * Ruta: components/dashboard/tabs.js
 * Descripción: Componente que muestra las pestañas de navegación dentro de una sección, 
 *              como Vacaciones, Licencias, Justificaciones, etc. Permite cambiar de sección
 *              y resaltar la pestaña activa.
 */

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faFileAlt, faCheckCircle, faChartLine } from "@fortawesome/free-solid-svg-icons";

const Tabs = ({ selectedSection, onSectionChange }) => {
    return (
        <div className="flex border-b-2 mb-4 pl-6">
            {/* Pestaña de Vacaciones */}
            <div
                className={`px-4 py-2 cursor-pointer flex items-center space-x-2 ${
                    selectedSection === "vacaciones"
                        ? "border-b-2 border-red-600 text-red-600"
                        : "hover:text-red-600"
                }`}
                onClick={() => onSectionChange("vacaciones")}
            >
                <FontAwesomeIcon icon={faCalendarAlt} />
                <span>Vacaciones</span>
            </div>

            {/* Pestaña de Licencias */}
            <div
                className={`px-4 py-2 cursor-pointer flex items-center space-x-2 ${
                    selectedSection === "licencias"
                        ? "border-b-2 border-red-600 text-red-600"
                        : "hover:text-red-600"
                }`}
                onClick={() => onSectionChange("licencias")}
            >
                <FontAwesomeIcon icon={faFileAlt} />
                <span>Licencias</span>
            </div>

            {/* Pestaña de Justificaciones */}
            <div
                className={`px-4 py-2 cursor-pointer flex items-center space-x-2 ${
                    selectedSection === "justificaciones"
                        ? "border-b-2 border-red-600 text-red-600"
                        : "hover:text-red-600"
                }`}
                onClick={() => onSectionChange("justificaciones")}
            >
                <FontAwesomeIcon icon={faCheckCircle} />
                <span>Justificaciones</span>
            </div>

            {/* Pestaña de Informes */}
            <div
                className={`px-4 py-2 cursor-pointer flex items-center space-x-2 ${
                    selectedSection === "informes"
                        ? "border-b-2 border-red-600 text-red-600"
                        : "hover:text-red-600"
                }`}
                onClick={() => onSectionChange("informes")}
            >
                <FontAwesomeIcon icon={faChartLine} />
                <span>Informes</span>
            </div>
        </div>
    );
};

export default Tabs;
