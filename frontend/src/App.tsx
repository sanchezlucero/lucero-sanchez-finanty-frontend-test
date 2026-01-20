// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, Box } from "@mui/material";
import { AppProvider, AppContext } from "./store/AppContext";
import { Navbar } from "./components/Navbar";
import { useContext } from "react";
import { HomePage } from "./pages/HomePage";
import { FavoritesPage } from "./pages/FavoritesPage";

const AppContent = () => {
  const { isDarkMode, toggleTheme } = useContext(AppContext);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <CssBaseline />
      <Navbar
        onAddClick={() => console.log("Abrir Modal de Agregar")}
        isDarkMode={isDarkMode}
        onThemeChange={toggleTheme}
      />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Corregido: etiqueta cerrada con /> y cierre de llaves */}
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </main>
    </Box>
  );
};

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
