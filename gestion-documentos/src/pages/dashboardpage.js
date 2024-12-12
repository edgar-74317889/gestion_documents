/**
 * Ruta: pages/dashboardpage.js
 * Descripción: Página principal del dashboard que organiza y muestra el sidebar, header, tabs y data table.
 *              También maneja las secciones activas y el modal para agregar nuevos documentos.
 */

import React, { useState } from "react";
import { useLocation } from "react-router-dom";  // Para obtener la información del usuario desde la ubicación actual
import Sidebar from "../components/dashboard/sidebar"; // Sidebar del dashboard
import Header from "../components/dashboard/header"; // Header de la página
import Tabs from "../components/dashboard/tabs"; // Tabs para cambiar entre secciones
import DataTable from "../components/dashboard/datatable"; // DataTable para mostrar los documentos
import ModalNuevoRegistro from "../components/dashboard/ModalNuevoRegistro"; // Modal para crear un nuevo registro
import { useTheme } from "../context/ThemeContext"; // Contexto para manejar el tema
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // FontAwesome para iconos
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'; // Iconos de sol y luna

const DashboardPage = () => {
    const location = useLocation(); // Obtiene la ubicación de la sesión actual
    const { nombres, cargo } = location.state || {}; // Información del usuario desde la sesión

    const { isDarkMode, toggleTheme } = useTheme(); // Obtener el estado del tema y la función para cambiarlo

    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para manejar el modal de nuevo registro
    const [selectedMenu, setSelectedMenu] = useState("documentos"); // Menú seleccionado
    const [selectedSection, setSelectedSection] = useState("vacaciones"); // Sección seleccionada

    // Función para manejar el cambio de menú
    const handleMenuChange = (menu) => {
        setSelectedMenu(menu);
        setSelectedSection(""); // Resetea la sección activa al cambiar de menú
    };

    // Función para manejar el cambio de sección
    const handleSectionChange = (section) => {
        setSelectedSection(section); // Cambia la sección activa
    };

    // Función para abrir el modal
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    // Función para cerrar el modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={`flex ${isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black"}`}>
            {/* Sidebar */}
            <Sidebar
                user={{ nombres: nombres || "Usuario", cargo: cargo || "Cargo" }}
                selectedSection={selectedMenu}
                onSectionChange={handleMenuChange}
                onSectionChangeTab={handleSectionChange} // Pasamos la función para cambiar de pestaña
            />

            {/* Contenido Principal */}
            <div className="flex-grow">
                {/* Header */}
                <Header onFilter={() => {}} />

                {/* Botón de cambio de tema */}
                <div className="absolute top-5 right-5 cursor-pointer" onClick={toggleTheme}>
                    <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} className="text-white text-2xl" />
                </div>

                {/* Tabs */}
                <Tabs
                    selectedSection={selectedSection}
                    onSectionChange={handleSectionChange}
                />

                {/* Contenido principal */}
                <div className="p-4">
                    <div className="flex justify-end mb-4">
                        {selectedMenu === "documentos" && (
                            <button
                                className="bg-red-600 text-white p-2 rounded flex items-center"
                                onClick={handleOpenModal}
                            >
                                + Agregar Nuevo
                            </button>
                        )}
                    </div>

                    {/* Mostrar el contenido de la sección */}
                    {selectedMenu === "documentos" ? (
                        <>
                            {selectedSection === "vacaciones" && <DataTable />}
                            {selectedSection === "licencias" && <p>Gestión de Licencias</p>}
                            {selectedSection === "justificaciones" && <p>Gestión de Justificaciones</p>}
                            {selectedSection === "informes" && <p>Gestión de Informes</p>}
                        </>
                    ) : (
                        <p className="text-center text-gray-500">Disponible en futuras versiones</p>
                    )}
                </div>
            </div>

            {/* Modal Nuevo Registro */}
            <ModalNuevoRegistro
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={(formData) => console.log("Datos guardados:", formData)} // Aquí puedes implementar el guardado
            />
        </div>
    );
};

export default DashboardPage;
