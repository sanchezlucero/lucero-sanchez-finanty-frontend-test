import { useState, useContext } from "react";
import { Card, CardContent, Typography, Box, IconButton } from "@mui/material";
import {
  Edit,
  Delete,
  FavoriteBorder,
  Favorite,
  Visibility,
} from "@mui/icons-material";
import type { Pokemon } from "../types/pokemon";
import { AppContext } from "../store/AppContext";
import { savePokemon, deletePokemon } from "../services/pokemonService";

interface Props {
  pokemon: Pokemon;
  isEditable?: boolean;
  onUpdate?: () => void;
  onEdit?: () => void;
  onView?: () => void; // <--- AÑADIMOS ESTA PROP
}

export const PokemonCard = ({
  pokemon,
  isEditable = false,
  onUpdate,
  onEdit,
  onView, // <--- LA RECIBIMOS AQUÍ
}: Props) => {
  const { isDarkMode } = useContext(AppContext);
  const handleSave = async (): Promise<void> => {
    try {
      await savePokemon(pokemon.id);
      alert("¡Pokémon guardado!");
      if (onUpdate) onUpdate();
    } catch (error: unknown) {
      if (error instanceof Error) alert(error.message);
    }
  };

  const handleDelete = async (): Promise<void> => {
    if (!window.confirm("¿Estás seguro de eliminar este Pokémon?")) return;
    try {
      await deletePokemon(pokemon.id);
      alert("Eliminado correctamente");
      if (onUpdate) onUpdate();
    } catch (error: unknown) {
      if (error instanceof Error) alert(error.message);
    }
  };

  return (
    <Card
      sx={{
        borderRadius: 4,
        bgcolor: "background.paper",
        boxShadow: isDarkMode ? "none" : 3,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s",
        "&:hover": { transform: "scale(1.02)" },
      }}
    >
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "white",
          px: 1,
          width: "fit-content",
          ml: 1,
          borderRadius: "4px 4px 0 0",
          fontSize: "0.75rem",
        }}
      >
        {/* Usamos external_id si existe (Favoritos), si no, usamos id (Home) [cite: 2026-01-19] */}
        #{(pokemon.external_id || pokemon.id).toString().padStart(3, "0")}
      </Box>

      <CardContent sx={{ textAlign: "center", pt: 1 }}>
        <Box
          sx={{
            bgcolor: "rgba(0,0,0,0.04)",
            borderRadius: "50%",
            width: 100,
            height: 100,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 2,
          }}
        >
          <img
            src={pokemon.imageUrl}
            alt={pokemon.name}
            style={{ width: "80%" }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", textTransform: "capitalize" }}
          >
            {pokemon.name}
          </Typography>

          {!isEditable && (
            <IconButton
              size="small"
              onClick={handleSave}
              disabled={pokemon.isFavorite}
            >
              {pokemon.isFavorite ? (
                <Favorite color="error" />
              ) : (
                <FavoriteBorder />
              )}
            </IconButton>
          )}
        </Box>

        {/* --- BARRA DE ACCIONES --- */}
        <Box sx={{ mt: 2, display: "flex", justifyContent: "center", gap: 1 }}>
          {/* BOTÓN VER: Llama a onView que abrirá el modal en el padre */}
          <IconButton
            size="small"
            color="info"
            sx={{ border: "1px solid #e0e0e0" }}
            onClick={onView} // <--- CONEXIÓN AQUÍ
          >
            <Visibility fontSize="small" />
          </IconButton>

          {isEditable && (
            <>
              <IconButton
                size="small"
                color="primary"
                sx={{ border: "1px solid #e0e0e0" }}
                onClick={onEdit}
              >
                <Edit fontSize="small" />
              </IconButton>

              <IconButton
                size="small"
                color="error"
                sx={{ border: "1px solid #e0e0e0" }}
                onClick={handleDelete}
              >
                <Delete fontSize="small" />
              </IconButton>
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
