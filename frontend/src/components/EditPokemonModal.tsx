import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box } from '@mui/material';
import type { Pokemon } from '../types/pokemon';
import { updatePokemon } from '../services/pokemonService';

interface EditModalProps {
  open: boolean;
  onClose: () => void;
  pokemon: Pokemon | null;
  onUpdate: () => void;
}

export const EditPokemonModal = ({ open, onClose, pokemon, onUpdate }: EditModalProps) => {
  const [name, setName] = useState('');
  const [types, setTypes] = useState('');

  // Sincronizar el estado cuando se abre el modal con un pokemon
  useEffect(() => {
    if (pokemon) {
      setName(pokemon.name);
      setTypes(pokemon.types.join(', '));
    }
  }, [pokemon]);

  const handleSubmit = async () => {
    if (!pokemon) return;
    try {
      await updatePokemon(pokemon.id, { name, type: types });
      alert("¡Actualizado correctamente!");
      onUpdate(); // Refresca la lista en FavoritesPage
      onClose();
    } catch (error: unknown) {
      if (error instanceof Error) alert(error.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Editar Pokémon</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label="Nombre"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Tipos (separados por coma)"
            fullWidth
            value={types}
            onChange={(e) => setTypes(e.target.value)}
            helperText="Ej: grass, poison"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Guardar Cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
};