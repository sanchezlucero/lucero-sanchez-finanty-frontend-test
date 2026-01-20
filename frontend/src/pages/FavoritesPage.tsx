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
  Button,
} from "@mui/material";
import { useSavedPokemons } from "../hooks/useSavedPokemons";
import { PokemonCard } from "../components/CardPokemon";
import { SearchBar } from "../components/SearchBar";
import { EditPokemonModal } from "../components/EditPokemonModal";
import type { Pokemon } from "../types/pokemon";
import { PokemonDetailModal } from "../components/DetailPokemonModal";
import { Link } from "react-router-dom";

export const FavoritesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 12; // Puedes ajustar este número
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  // Traemos los datos de tu PostgreSQL
  const { savedPokemons, loading, error, refreshFavorites } =
    useSavedPokemons();

  const filteredList = savedPokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredList.length / itemsPerPage);
  const paginatedPokemons = filteredList.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );
  // Resetear página al buscar
  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  const handleEditClick = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    setIsModalOpen(true);
  };

  const handleViewClick = (id: number) => {
    setSelectedId(id);
    setIsViewOpen(true);
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
        <CircularProgress size={60} thickness={4} color="secondary" />
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
          label="Buscar mi favorito"
        />
      </Box>

      {savedPokemons.length === 0 ? (
        <Box sx={{ textAlign: "center", mt: 5 }}>
          <Typography variant="h6">Aún no tienes Pokémon favoritos</Typography>
          <Button component={Link} to="/" sx={{ mt: 2 }}>
            Ir a buscar
          </Button>
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            {paginatedPokemons.map((pokemon) => (
              <Grid item key={pokemon.id} xs={12} sm={6} md={4} lg={3}>
                <PokemonCard
                  pokemon={pokemon}
                  isEditable={true} // Habilita Editar/Eliminar
                  onUpdate={refreshFavorites} // Refresca tras cambios
                  onEdit={() => handleEditClick(pokemon)}
                  onView={() => handleViewClick(pokemon.externalId)}
                />
              </Grid>
            ))}
          </Grid>

          {/* Estado vacío del buscador */}
          {filteredList.length === 0 && (
            <Box sx={{ width: "100%", textAlign: "center", mt: 5 }}>
              <Typography variant="h6" color="text.secondary">
                No hay coincidencias en tus favoritos.
              </Typography>
            </Box>
          )}

          {/* Paginación Reutilizada */}
          {totalPages > 1 && (
            <Box sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(_, value) => setPage(value)}
                color="secondary"
                shape="rounded"
              />
            </Box>
          )}
        </>
      )}
      <EditPokemonModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        pokemon={selectedPokemon}
        onUpdate={refreshFavorites}
      />
      <PokemonDetailModal
        open={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        pokemonId={selectedId} // <--- Pasamos el ID que guardaste en el estado
      />
    </Container>
  );
};
