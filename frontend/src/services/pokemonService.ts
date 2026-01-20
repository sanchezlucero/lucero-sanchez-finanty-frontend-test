// src/services/pokemonService.ts

import type { BackendResponse, Pokemon } from "../types/pokemon";

export const API_URL = import.meta.env.VITE_API_URL;

interface SavePokemonResponse {
  message: string;
  data: {
    id: number;
    external_id: number;
    name: string;
    image_url: string;
    type: string;
  };
}

// 1. REQUISITO: Catálogo desde el Backend (Proxy)
export const getExternalPokemons = async (limit: number = 151, offset: number = 0) => {
  const response = await fetch(`${API_URL}/test-proxy?limit=${limit}&offset=${offset}`);
  if (!response.ok) throw new Error('Error al conectar con el proxy');
  return response.json(); // Esto devuelve la estructura de PokeAPI
};

// 2. REQUISITO: CRUD Local (Tus guardados en Postgres)
export const savePokemon = async (pokemonId: number): Promise<SavePokemonResponse> => {
  const response = await fetch(`${API_URL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pokemonId })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error al guardar');
  }
  return response.json(); // Ahora TypeScript sabe que esto es un SavePokemonResponse
};

export const getSavedPokemons = async (): Promise<BackendResponse> => {
  const response = await fetch(`${API_URL}`); // Llama a tu base de datos local
  if (!response.ok) throw new Error('Error al obtener tus Pokémon guardados');
  return response.json();
};

export const deletePokemon = async (id: number): Promise<{ message: string }> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData: { message: string } = await response.json();
    throw new Error(errorData.message || 'Error al eliminar el Pokémon');
  }

  return response.json();
};

export const updatePokemon = async (id: number, data: { name: string; type: string }): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error al actualizar');
  }
};

export const getPokemonById = async (id: number): Promise<Pokemon> => {
  const response = await fetch(`${API_URL}/${id}`); // Asegúrate de que la ruta sea /items/${id}

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error al obtener el detalle');
  }

  const data = await response.json();
  console.log("Datos brutos del backend:", data);

  // Mapeamos los datos de la base de datos al formato de tu interfaz
  return {
    id: data.id, // ID de tu DB (o null)
    name: data.name,
    imageUrl: data.image_url,
    types: [data.type],
    isFavorite: data.isFavorite,
    stats: data.stats,
    weight: data.weight,
    height: data.height
  };
};