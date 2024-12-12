/**
 * Ruta: components/login/loginleft.js
 * Descripción: Componente que muestra el lado izquierdo de la pantalla de login. Incluye
 *              una imagen representativa, un mensaje inspirador y detalles sobre la aplicación.
 */

import React from "react";
import { useTheme } from "../../context/ThemeContext"; // Para acceder al tema (oscuro o claro)

const LoginLeft = () => {
    const { isDarkMode } = useTheme(); // Acceder al contexto para obtener el tema actual

    return (
        <div
            className={`w-full md:w-1/2 flex items-center justify-center p-8 ${isDarkMode ? "bg-[#10243D] text-white" : "bg-gray-100 text-black"}`}
        >
            <div className="text-center">
                {/* Mensaje Inspirador */}
                <div className="mb-6 text-xl font-semibold">
                    "La puntualidad es el alma de la gestión eficiente"
                </div>

                {/* Línea Divisoria */}
                <div
                    className="w-2/3 mx-auto border-t-4 mb-6"
                    style={{ borderColor: "#FF0000" }}
                ></div>

                {/* Imagen Principal */}
                <img
                    src="https://placehold.co/300x300"
                    alt="Ilustración representativa del sistema"
                    className="mb-6 mx-auto rounded-lg shadow-lg"
                />

                {/* Logo Institucional */}
                <img
                    src="https://placehold.co/100x100"
                    alt="Escudo Institucional"
                    className="mb-6 mx-auto rounded-full shadow-md"
                />

                {/* Información Adicional */}
                <div className="text-sm text-gray-300">
                    <p>OFICINA DE CONTROL DE ASISTENCIA - UCA </p>
                    <p>Universidad Nacional del Altiplano</p>
                </div>
            </div>
        </div>
    );
};

export default LoginLeft;
