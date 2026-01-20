import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Box,
  TextField,
  InputAdornment,
  Pagination,
  CircularProgress,
  Alert,
  Typography,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import type { Pokemon } from "../types/pokemon";
import { PokemonCard } from "../components/CardPokemon";
import { usePokemons } from "../hooks/usePokemon";
import { SearchBar } from "../components/SearchBar";
import { PokemonDetailModal } from "../components/DetailPokemonModal";

export const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);

  const { pokemons, loading, error } = usePokemons();

  // Filtro de búsqueda
  const filteredList = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const itemsPerPage = 20;
  const totalPages = Math.ceil(filteredList.length / itemsPerPage);

  // Paginación de la lista filtrada
  const paginatedPokemons = filteredList.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  const handleOpenDetail = (id: number) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
        }}
      >
        <CircularProgress size={60} thickness={4} color="primary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth={false} sx={{ py: 4, px: { xs: 2, md: 5 } }}>
      <Box sx={{ mb: 4 }}>
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          label="Buscar Pokémon"
        />
      </Box>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {paginatedPokemons.map((pokemon) => (
          <Grid item key={pokemon.id} xs={12} sm={6} md={4} lg={3}>
            <PokemonCard
              pokemon={pokemon}
              onView={() => {
                // Hacemos un log aquí para ver qué tiene el objeto antes de abrir

                // Intenta con pokemon.external_id, y si no existe, usa pokemon.id
                const idToOpen = pokemon.external_id || pokemon.id;

                if (idToOpen) {
                  handleOpenDetail(idToOpen);
                } else {
                  console.error(
                    "No se encontró un ID válido para este pokemon",
                    pokemon,
                  );
                }
              }}
            />
          </Grid>
        ))}

        {paginatedPokemons.length === 0 && (
          <Box sx={{ width: "100%", textAlign: "center", mt: 5 }}>
            <Typography variant="h6" color="text.secondary">
              No se encontraron Pokémon.
            </Typography>
          </Box>
        )}
      </Grid>

      <Box sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
          shape="rounded"
          size="large" // Un poco más grande para mejor UX
        />
      </Box>

      {/* Modal Reutilizado */}
      <PokemonDetailModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        pokemonId={selectedId}
      />
    </Container>
  );
};
