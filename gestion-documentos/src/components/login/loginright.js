/**
 * Ruta: components/login/loginright.js
 * Descripción: Componente que muestra el lado derecho de la pantalla de login. Contiene
 *              el formulario de inicio de sesión y un mensaje de bienvenida. 
 */

import React from "react";
import LoginForm from "./loginform"; // Componente del formulario de login
import { useTheme } from "../../context/ThemeContext"; // Para acceder al tema

const LoginRight = () => {
    const { isDarkMode } = useTheme(); // Obtener el estado del tema (oscuro o claro)

    return (
        <div
            className={`w-full md:w-1/2 flex flex-col justify-center items-center p-8 ${isDarkMode ? "bg-[#10243D] text-white" : "bg-white text-black"}`}
        >
            <div className="mb-6 text-center">
                <h1 className="text-3xl font-bold mb-2">Bienvenido</h1>
                <p className="text-gray-400">
                    Ingrese sus credenciales para continuar
                </p>
            </div>

            {/* Formulario de Login */}
            <div className="w-full max-w-md">
                <LoginForm />
            </div>

            {/* Información adicional */}
            <div className="mt-8 text-center text-sm">
                <p>© {new Date().getFullYear()} Universidad Nacional del Altiplano - Puno</p>
                <p>Todos los derechos reservados.</p>
            </div>
        </div>
    );
};

export default LoginRight;
