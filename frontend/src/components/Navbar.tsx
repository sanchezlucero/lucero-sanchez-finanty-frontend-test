import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Switch,
  Typography,
} from "@mui/material";
import { LightMode, DarkMode } from "@mui/icons-material";
import logo from "../assets/logo.png"; // Ajusta el nombre si es necesario
import { Link, useLocation, useNavigate } from "react-router-dom";
interface Props {
  onAddClick: () => void;
  isDarkMode: boolean;
  onThemeChange: () => void;
}

export const Navbar = ({ onAddClick, isDarkMode, onThemeChange }: Props) => {
  const location = useLocation();
  const navigate = useNavigate(); // Hook para navegar programáticamente

  const handleGoToFavorites = () => {
    navigate("/favorites"); // Redirige a la ruta que definimos en App.tsx
  };

  return (
    <AppBar
      position="static"
      color="default"
      elevation={1}
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Logo de PokéApi */}
        <Box
          onClick={() => navigate("/")}
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            "&:hover": { opacity: 0.8 },
          }}
        >
          {/* AQUÍ VA TU LOGO ACTUAL */}
          <img
            src={logo} // Pon aquí la ruta de tu imagen
            alt="PokeApp Logo"
            style={{ height: "40px", width: "auto" }}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Botón Agregar Pokémon */}
          {location.pathname !== "/favorites" && (
            <Button
              variant="contained"
              component={Link}
              to="/favorites"
              color="primary"
              onClick={handleGoToFavorites} // Cambiamos la función aquí
              sx={{ textTransform: "none", borderRadius: 2, mr: 2 }}
            >
              Ver favoritos
            </Button>
          )}
          {/* <Button
            variant="contained"
            color="primary"
            onClick={handleGoToFavorites} // Cambiamos la función aquí
            sx={{ textTransform: "none", borderRadius: 2, mr: 2 }}
          >
            Ver favoritos
          </Button> */}

          {/* Switch Modo Oscuro/Claro */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <LightMode color="warning" fontSize="small" />
            <Switch checked={isDarkMode} onChange={onThemeChange} />
            <DarkMode color="action" fontSize="small" />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
