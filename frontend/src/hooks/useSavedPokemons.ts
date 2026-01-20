// src/hooks/useSavedPokemons.ts
import { useState, useEffect } from 'react';
import type { Pokemon } from '../types/pokemon';
import { getSavedPokemons } from '../services/pokemonService';

export const useSavedPokemons = () => {
    const [savedPokemons, setSavedPokemons] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchFavorites = async () => {
        try {
            setLoading(true);
            const response = await getSavedPokemons(); // Llama a GET /api/items

            // Adaptamos los datos de tu DB al formato que usa tu interfaz
            const formatted = response.data.map((item: any) => ({
                id: item.id, // ID interno de tu DB
                externalId: item.external_id, // ID original de PokeAPI
                name: item.name,
                imageUrl: item.image_url,
                types: item.type ? item.type.split(',') : [],
                isFavorite: true
            }));

            setSavedPokemons(formatted);
        } catch (error) {
            console.error("Error cargando favoritos:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    return { savedPokemons, loading, refreshFavorites: fetchFavorites };
};