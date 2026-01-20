import axios from 'axios';
import { PokemonItem } from '../models/item.interface';

const POKE_API_BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

export const fetchPokemonData = async (pokemonId: number): Promise<PokemonItem> => {
  try {
    const response = await axios.get(`${POKE_API_BASE_URL}/${pokemonId}`);
    const data = response.data;

    // Mapeamos los datos de la API a nuestra interfaz
    return {
      external_id: data.id,
      name: data.name,
      image_url: data.sprites.front_default,
      type: data.types[0].type.name
    };
  } catch (error) {
    console.error(`Error fetching pokemon ${pokemonId}:`, error);
    throw new Error('Failed to fetch data from PokéAPI');
  }
};