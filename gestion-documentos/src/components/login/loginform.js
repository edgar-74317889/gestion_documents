/**
 * Ruta: components/login/loginform.js
 * Descripción: Componente del formulario de inicio de sesión. Permite al usuario ingresar 
 *              su cargo y clave para autenticarse. Si las credenciales son correctas, 
 *              el usuario es redirigido al dashboard.
 */

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext"; // Para el cambio de tema
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const LoginForm = () => {
    const navigate = useNavigate(); // Para redirigir al dashboard
    const { isDarkMode } = useTheme(); // Obtenemos el tema actual

    // Estados locales para manejar los campos de login y error
    const [cargo, setCargo] = useState("");
    const [clave, setClave] = useState("");
    const [showPassword, setShowPassword] = useState(false); // Controla la visibilidad de la contraseña
    const [error, setError] = useState("");

    // Manejar el cambio del cargo
    const handleCargoChange = (e) => {
        setCargo(e.target.value);
        setError(""); // Limpiar el error cuando se cambia el cargo
    };

    // Manejar el envío del formulario para autenticación
    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); // Limpiar errores previos

        // Validación básica
        if (!cargo || !clave) {
            setError("Por favor ingresa tu cargo y clave.");
            return;
        }
        console.log(cargo,clave);

        try {
            // URL desde el archivo .env
            const response = await axios.post(`http://localhost:5000/api/auth/authenticate`, {
                cargo,
                clave,
            });            

            // Verificar si la autenticación fue exitosa
            if (response.data.token) {
                // Almacenar el token y los datos del usuario en el localStorage
                localStorage.setItem("user", JSON.stringify(response.data.user));
                localStorage.setItem("token", response.data.token);

                // Redirigir al dashboard con la información del usuario
                navigate("/dashboard", { state: response.data.user });
            } else {
                setError("Credenciales incorrectas.");
            }
        } catch (error) {
            console.error("Error en la autenticación:", error);
            setError("Error al conectar con el servidor.");
        }
    };

    return (
        <form
            className={`w-full max-w-sm mx-auto ${isDarkMode ? "text-white" : "text-black"}`}
            onSubmit={handleLogin}
        >
            {/* Campo de Cargo */}
            <div className="mb-4">
                <label className={`block mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`} >
                    Cargo:
                </label>
                <select
                    className={`w-full p-2 border rounded ${isDarkMode ? "bg-[#10243D] text-white" : "bg-gray-100 text-black"}`}
                    value={cargo}
                    onChange={handleCargoChange}
                    required
                >
                    <option value="">Seleccione un cargo</option>
                    <option value="Control Administrativos Nombrados">Control Administrativos Nombrados</option>
                    <option value="Control Administrativos Contratados">Control Administrativos Contratados</option>
                    <option value="Control Docentes Nombrados">Control Docentes Nombrados</option>
                    <option value="Control Docentes Contratados">Control Docentes Contratados</option>
                </select>
            </div>

            {/* Campo de Clave */}
            <div className="mb-4 relative">
                <label className={`block mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`} >
                    Clave:
                </label>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        className={`w-full p-2 border rounded pr-10 ${isDarkMode ? "bg-[#10243D] text-white" : "bg-gray-100 text-black"}`}
                        value={clave}
                        onChange={(e) => setClave(e.target.value)}
                        required
                    />
                    <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                        className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                    />
                </div>
            </div>

            {/* Mostrar el Error si Existe */}
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            {/* Botón de Ingresar */}
            <button
                type="submit"
                className={`w-full p-2 rounded ${isDarkMode ? "bg-gray-600 hover:bg-gray-700 text-white" : "bg-red-600 hover:bg-red-700 text-white"}`}
            >
                Ingresar
            </button>
        </form>
    );
};

export default LoginForm;
