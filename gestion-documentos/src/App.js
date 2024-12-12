/**
 * Ruta: src/App.js
 * Descripción: Componente principal de la aplicación que configura las rutas de las páginas de login y dashboard.
 */

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/loginpage"; // Página de Login
import DashboardPage from "./pages/dashboardpage"; // Página del Dashboard
import { ThemeProvider } from "./context/ThemeContext"; // Contexto para manejar el tema (oscuro/claro)

const App = () => {
    return (
        <ThemeProvider> {/* Proveedor del contexto para el tema */}
            <Router> {/* Configura el Router para manejar las rutas */}
                <Routes>
                    <Route path="/" element={<LoginPage />} /> {/* Ruta de Login */}
                    <Route path="/dashboard" element={<DashboardPage />} /> {/* Ruta del Dashboard */}
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default App;
