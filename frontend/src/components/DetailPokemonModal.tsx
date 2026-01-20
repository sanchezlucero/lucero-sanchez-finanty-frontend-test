import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  IconButton,
  CircularProgress,
  LinearProgress,
  Grid,
  Chip,
  Stack,
  Fade,
  useTheme,
} from "@mui/material";
import { Close, Scale, Height, Star } from "@mui/icons-material";
import type { Pokemon } from "../types/pokemon";
import { getPokemonById } from "../services/pokemonService";

interface Props {
  open: boolean;
  onClose: () => void;
  pokemonId: number | null;
}

export const PokemonDetailModal = ({ open, onClose, pokemonId }: Props) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    if (open && pokemonId) {
      setLoading(true);
      getPokemonById(pokemonId)
        .then((data) => {
          setPokemon(data);
        })
        .catch((err) => console.error("Error al llamar la API:", err))
        .finally(() => setLoading(false));
    }
  }, [open, pokemonId]);

  const getStatColor = (statName: string) => {
    const colors: Record<string, string> = {
      hp: "#FF5959",
      attack: "#F5AC78",
      defense: "#FAE078",
      "special-attack": "#9DB7F5",
      "special-defense": "#A7DB8D",
      speed: "#F85888",
    };
    return colors[statName] || theme.palette.primary.main;
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: {
          borderRadius: 5,
          bgcolor: theme.palette.background.paper,
          backgroundImage: "none", // Quita el overlay gris de MUI en dark mode
        },
      }}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          component="span" //
          sx={{ fontWeight: 900, textTransform: "capitalize" }}
        >
          {loading ? "Cargando..." : pokemon?.name}
        </Typography>
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 3 }}>
        {loading ? (
          <Box sx={{ display: "flex", py: 8, justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : pokemon ? (
          <Fade in={!loading}>
            <Box>
              {/* --- CABECERA: IMAGEN Y MEDIDAS --- */}
              <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
                <Grid
                  item
                  xs={7}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      width: 160,
                      height: 160,
                      borderRadius: "50%",
                      bgcolor:
                        theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.05)"
                          : "rgba(0,0,0,0.02)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={pokemon.imageUrl}
                      alt={pokemon.name}
                      style={{
                        width: "85%",
                        zIndex: 1,
                        filter: "drop-shadow(0px 8px 12px rgba(0,0,0,0.2))",
                      }}
                    />
                  </Box>
                </Grid>

                <Grid item xs={5}>
                  <Stack spacing={2.5}>
                    <Box>
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        sx={{ mb: 0.5 }}
                      >
                        <Scale sx={{ color: "#00d2ff", fontSize: "1.1rem" }} />
                        <Typography
                          variant="caption"
                          sx={{ fontWeight: 800, color: "text.secondary" }}
                        >
                          PESO
                        </Typography>
                      </Stack>
                      <Typography variant="h6" sx={{ fontWeight: 800 }}>
                        {pokemon.weight! / 10} kg
                      </Typography>
                    </Box>

                    <Box>
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        sx={{ mb: 0.5 }}
                      >
                        <Height sx={{ color: "#ff00d2", fontSize: "1.1rem" }} />
                        <Typography
                          variant="caption"
                          sx={{ fontWeight: 800, color: "text.secondary" }}
                        >
                          ALTURA
                        </Typography>
                      </Stack>
                      <Typography variant="h6" sx={{ fontWeight: 800 }}>
                        {pokemon.height! / 10} m
                      </Typography>
                    </Box>
                  </Stack>
                </Grid>
              </Grid>

              {/* --- TIPOS Y HABILIDADES --- */}
              <Box sx={{ mb: 4, textAlign: "center" }}>
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="center"
                  sx={{ mb: 2 }}
                >
                  {pokemon.types?.map((type) => (
                    <Chip
                      key={type}
                      label={type}
                      size="small"
                      sx={{
                        fontWeight: 900,
                        textTransform: "uppercase",
                        bgcolor:
                          theme.palette.mode === "dark"
                            ? "rgba(255,255,255,0.1)"
                            : "primary.main",
                        color: "#fff",
                      }}
                    />
                  ))}
                </Stack>

                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 800,
                    color: "text.secondary",
                    display: "block",
                    mb: 1,
                    letterSpacing: 1,
                  }}
                >
                  HABILIDADES
                </Typography>
                <Stack direction="row" spacing={1} justifyContent="center">
                  {/* @ts-ignore - Asumiendo que ahora traes habilidades del backend */}
                  {pokemon.abilities?.map((a: any) => (
                    <Chip
                      key={a.ability.name}
                      label={a.ability.name.replace("-", " ")}
                      variant="outlined"
                      size="small"
                      sx={{
                        textTransform: "capitalize",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                      }}
                    />
                  ))}
                </Stack>
              </Box>

              {/* --- ESTADÍSTICAS --- */}
              <Typography
                variant="subtitle2"
                sx={{
                  mb: 2.5,
                  fontWeight: 900,
                  color: "text.secondary",
                  textAlign: "center",
                  letterSpacing: 1,
                }}
              >
                ESTADÍSTICAS BASE
              </Typography>

              {pokemon.stats?.map((s) => (
                <Box key={s.stat.name} sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 0.5,
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        textTransform: "uppercase",
                        fontWeight: 800,
                        fontSize: "0.65rem",
                      }}
                    >
                      {s.stat.name.replace("-", " ")}
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 900 }}>
                      {s.base_stat} <span style={{ opacity: 0.4 }}>/ 255</span>
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(s.base_stat / 255) * 100}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor:
                        theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.05)"
                          : "#eee",
                      "& .MuiLinearProgress-bar": {
                        borderRadius: 4,
                        bgcolor: getStatColor(s.stat.name),
                        boxShadow:
                          theme.palette.mode === "dark"
                            ? `0 0 10px ${getStatColor(s.stat.name)}77`
                            : "none",
                      },
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Fade>
        ) : (
          <Typography textAlign="center">No se encontraron datos.</Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};
