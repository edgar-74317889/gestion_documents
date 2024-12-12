/**
 * Ruta: pages/loginpage.js
 * Descripción: Página de inicio de sesión que organiza los componentes LoginLeft y LoginRight.
 *              También gestiona el cambio de tema (oscuro/claro).
 */

import React from "react";
import LoginLeft from "../components/login/loginleft"; // Componente del lado izquierdo
import LoginRight from "../components/login/loginright"; // Componente del lado derecho
import { useTheme } from "../context/ThemeContext"; // Contexto para manejar el tema
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Para los iconos
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons"; // Iconos para cambio de tema

const LoginPage = () => {
    const { isDarkMode, toggleTheme } = useTheme(); // Acceder al estado del tema

    return (
        <div className={`flex h-screen ${isDarkMode ? "bg-[#10243D]" : "bg-white"}`}>
            {/* Lado izquierdo (imagen, mensaje inspirador) */}
            <LoginLeft />

            {/* Lado derecho (formulario de login) */}
            <LoginRight />

            {/* Icono de Cambio de Tema */}
            <div
                className="absolute top-6 right-6 cursor-pointer text-xl"
                onClick={toggleTheme} // Cambiar el tema al hacer clic
            >
                <FontAwesomeIcon
                    icon={isDarkMode ? faSun : faMoon} // Mostrar icono de sol o luna
                    className={`transition text-2xl ${isDarkMode ? "text-yellow-400" : "text-gray-700"}`}
                />
            </div>
        </div>
    );
};

export default LoginPage;
