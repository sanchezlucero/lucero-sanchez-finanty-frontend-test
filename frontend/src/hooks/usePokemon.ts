import { useState, useEffect, useCallback } from 'react';
import { getExternalPokemons, getSavedPokemons } from '../services/pokemonService';
import type { Pokemon, BackendResponse } from '../types/pokemon';

export const usePokemons = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      
      // 1. Llamada paralela a tus dos rutas del controlador:
      // a) getExternalPokemons (Proxy -> PokeAPI)
      // b) getItems (Tu DB PostgreSQL)
      const [proxyRes, localRes]: [any, BackendResponse] = await Promise.all([
        getExternalPokemons(151, 0), 
        getSavedPokemons(1, 1000) // Pedimos un límite alto para marcar todos los favoritos
      ]);

      // 2. Extraemos los external_id de tu tabla 'items'
      // Usamos 'external_id' porque es el que guardas al hacer el POST
      const favoriteIds = new Set(localRes.data.map(item => item.external_id));

      // 3. Mapeamos la respuesta del Proxy (estructura estándar de PokeAPI)
      const formatted: Pokemon[] = proxyRes.results.map((p: { name: string, url: string }) => {
        // Extraemos el ID de la URL (ej: .../pokemon/25/ -> 25)
        const id = parseInt(p.url.split('/').filter(Boolean).pop() || '0');
        
        return {
          id: id,
          name: p.name,
          imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          types: [], // El listado general de PokeAPI no trae tipos
          isFavorite: favoriteIds.has(id) // Marcamos si ya existe en tu DB
        };
      });

      setPokemons(formatted);
      setError(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error al sincronizar datos con el servidor');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { pokemons, loading, error, refresh: fetchData };
};