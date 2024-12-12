import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faFileAlt, faSignOutAlt, faChevronDown, faChevronUp, faArrowLeft, faCog } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const Sidebar = ({ user, selectedSection, onSectionChange, onSectionChangeTab }) => {
    const navigate = useNavigate();
    const [isDocumentsMenuOpen, setIsDocumentsMenuOpen] = useState(false); // Estado para el submenú de Documentos
    const [isSidebarHidden, setIsSidebarHidden] = useState(false); // Estado para ocultar el sidebar
    const { isDarkMode, toggleTheme } = useTheme(); 

    const toggleDocumentsMenu = () => {
        setIsDocumentsMenuOpen(!isDocumentsMenuOpen);
    };

    const toggleSidebar = () => {
        setIsSidebarHidden(!isSidebarHidden); // Alternar entre mostrar/ocultar el sidebar
    };

    const handleLogout = () => {
        const confirmed = window.confirm("¿Estás seguro que quieres cerrar sesión?");
        if (confirmed) {
            localStorage.removeItem("user"); // Eliminar las credenciales almacenadas
            navigate("/"); // Redirigir al login
        }
    };

    return (
        <div className={`h-screen flex flex-col transition-all duration-300 px-6 border-r-2 border-white ${isDarkMode?'border-white':'border-gray-700 border-opacity-5'}`}>
            {/* Ícono para ocultar/mostrar el Sidebar */}
            <div
                className={`cursor-pointer absolute top-6  transform -translate-y-1/2 p-2 bg-gray-600 text-white rounded-full ${isSidebarHidden?'translate-x-1':'left-56'}`}
                onClick={toggleSidebar}
                style={{
                    zIndex: 1000,
                }}
            >
                <FontAwesomeIcon
                    icon={faArrowLeft}
                    className={`transform transition-all  ${isSidebarHidden ? "rotate-180  " : "rotate-0"}`}
                />
            </div>

            {/* Usuario y Logo */}
            <div className="mb-6 flex flex-col justify-center items-center relative  ">
                {!isSidebarHidden && (
                    <>
                        <img src="https://via.placeholder.com/70" alt="Logo" className="my-2 rounded-full"  />
                        <h1 className="text-center text-lg font-bold">{user.nombres || "Usuario"}</h1>
                        <p className="text-center text-sm">{user.cargo || "Cargo"}</p>
                    </>
                )}
            </div>

            {/* Menú Principal */}
            <div className="flex-grow space-y-4 mt-8 border-t-2 border-white flex flex-col items-center">
                {/* Opción de Asistencia */}
                <div
                    className={`menu-item cursor-pointer flex items-center space-x-2 p-2 pt-4 rounded ${
                        selectedSection === "asistencia"
                            ? "bg-red-600 text-white"
                            : "hover:bg-gray-300"
                    }`}
                    onClick={() => onSectionChangeTab("asistencia")}
                >
                    <FontAwesomeIcon icon={faCheckCircle} />
                    {!isSidebarHidden && <span>Asistencia</span>}
                </div>

                {/* Menú de Documentos con Submenús */}
                <div
                    className={`menu-item cursor-pointer flex items-center justify-between p-2 rounded ${
                        selectedSection === "documentos"
                            ? "bg-red-600 text-white"
                            : "hover:bg-gray-300"
                    }`}
                    onClick={toggleDocumentsMenu}
                >
                    <div className="flex items-center space-x-2">
                        <FontAwesomeIcon icon={faFileAlt} />
                        {!isSidebarHidden && <span>Documentos</span>}
                    </div>
                    <FontAwesomeIcon icon={isDocumentsMenuOpen ? faChevronUp : faChevronDown} />
                </div>

                {/* Submenú de Documentos */}
                {isDocumentsMenuOpen && (
                    <div className="space-y-2 pl-6">
                        <div
                            className={`submenu-item cursor-pointer p-2 rounded hover:bg-gray-300`}
                            onClick={() => onSectionChangeTab("vacaciones")}
                        >
                            {isSidebarHidden ? <FontAwesomeIcon icon={faCheckCircle} /> : <span>Vacaciones</span>}
                        </div>
                        <div
                            className={`submenu-item cursor-pointer p-2 rounded hover:bg-gray-300`}
                            onClick={() => onSectionChangeTab("licencias")}
                        >
                            {isSidebarHidden ? <FontAwesomeIcon icon={faCheckCircle} /> : <span>Licencias</span>}
                        </div>
                        <div
                            className={`submenu-item cursor-pointer p-2 rounded hover:bg-gray-300`}
                            onClick={() => onSectionChangeTab("justificaciones")}
                        >
                            {isSidebarHidden ? <FontAwesomeIcon icon={faCheckCircle} /> : <span>Justificaciones</span>}
                        </div>
                        <div
                            className={`submenu-item cursor-pointer p-2 rounded hover:bg-gray-300`}
                            onClick={() => onSectionChangeTab("informes")}
                        >
                            {isSidebarHidden ? <FontAwesomeIcon icon={faCheckCircle} /> : <span>Informes</span>}
                        </div>
                    </div>
                )}

                {/* Menú de Configuración */}
                <div
                    className={`menu-item cursor-pointer flex items-center space-x-2 p-2 rounded ${
                        selectedSection === "configuracion"
                            ? "bg-red-600 text-white"
                            : "hover:bg-gray-300"
                    }`}
                    onClick={() => onSectionChangeTab("configuracion")}
                >
                    <FontAwesomeIcon icon={faCog} />
                    {!isSidebarHidden && <span>Configuración</span>}
                </div>
            </div>

            {/* Botón de Salir */}
            <div className="mt-auto">
                <div
                    className={`menu-item cursor-pointer flex items-center space-x-2 p-2 rounded hover:bg-gray-300 text-black `}
                    onClick={handleLogout} // Llamada a la función de cierre de sesión
                >
                    <FontAwesomeIcon icon={faSignOutAlt} />
                    {!isSidebarHidden && <span>Salir</span>}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
