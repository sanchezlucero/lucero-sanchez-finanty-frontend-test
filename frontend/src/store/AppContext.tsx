import React, { createContext, useState, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material";

export const AppContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {},
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Configuramos el tema de MUI aquí mismo
  // src/store/AppContext.tsx
  // src/store/AppContext.tsx
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkMode ? "dark" : "light",
          background: {
            // Fondo de la aplicación (debajo del header)
            default: isDarkMode ? "#292C35" : "#F4F6FF",
            // Fondo de las Cards y del Navbar en modo oscuro
            paper: isDarkMode ? "#373B47" : "#FFFFFF",
          },
          primary: {
            main: "#2a5ee8", // Color del botón "Agregar"
          },
        },
        components: {
          MuiAppBar: {
            styleOverrides: {
              root: {
                // Esto hará que el Header cambie según el modo
                backgroundColor: isDarkMode ? "#373B47" : "#FFFFFF",
                color: isDarkMode ? "#FFFFFF" : "#373B47",
                transition: "background-color 0.3s ease",
              },
            },
          },
        },
      }),
    [isDarkMode],
  );

  return (
    <AppContext.Provider value={{ isDarkMode, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AppContext.Provider>
  );
};
