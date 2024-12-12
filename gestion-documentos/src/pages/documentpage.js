/**
 * Ruta: pages/documentpage.js
 * Descripción: Página que muestra la gestión de documentos en el sistema.
 *              Permite al usuario navegar entre las secciones de documentos: Vacaciones, Licencias, Justificaciones, Informes.
 */

import React, { useState } from "react";
import Tabs from "../components/dashboard/tabs"; // Componente para las pestañas
import DataTable from "../components/dashboard/datatable"; // Componente para mostrar la tabla de documentos

const DocumentPage = () => {
    const [selectedSection, setSelectedSection] = useState("vacaciones"); // Estado para manejar la sección activa de documentos

    // Función para cambiar de sección
    const handleSectionChange = (section) => {
        setSelectedSection(section);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Gestión de Documentos</h1>
            
            {/* Componente de pestañas */}
            <Tabs
                menu="documentos"  // Pasa el nombre de la sección (documentos)
                selectedSection={selectedSection} // Estado de la sección seleccionada
                onSectionChange={handleSectionChange} // Función para cambiar de sección
            />

            <div className="mt-4">
                {/* Muestra el contenido dependiendo de la sección activa */}
                {selectedSection === "vacaciones" && <DataTable />}
                {selectedSection === "licencias" && <p>Gestión de Licencias</p>}
                {selectedSection === "justificaciones" && <p>Gestión de Justificaciones</p>}
                {selectedSection === "informes" && <p>Gestión de Informes</p>}
            </div>
        </div>
    );
};

export default DocumentPage;
