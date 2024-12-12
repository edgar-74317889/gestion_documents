/**
 * Ruta: context/ThemeContext.js
 * Descripción: Contexto para gestionar el tema (oscuro/claro) a nivel global.
 */

import React, { createContext, useState, useContext } from "react";

// Crear el contexto
const ThemeContext = createContext();

// Proveedor del contexto que envolverá la aplicación
export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(true); // El modo oscuro es el valor por defecto

    // Función para alternar entre el modo oscuro y claro
    const toggleTheme = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}  {/* Esto permitirá que cualquier componente hijo tenga acceso al tema */}
        </ThemeContext.Provider>
    );
};

// Hook para usar el contexto del tema
export const useTheme = () => useContext(ThemeContext);
