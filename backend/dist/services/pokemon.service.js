"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchPokemonData = void 0;
const axios_1 = __importDefault(require("axios"));
const POKE_API_BASE_URL = 'https://pokeapi.co/api/v2/pokemon';
const fetchPokemonData = async (pokemonId) => {
    try {
        const response = await axios_1.default.get(`${POKE_API_BASE_URL}/${pokemonId}`);
        const data = response.data;
        // Mapeamos los datos de la API a nuestra interfaz
        return {
            external_id: data.id,
            name: data.name,
            image_url: data.sprites.front_default,
            type: data.types[0].type.name
        };
    }
    catch (error) {
        console.error(`Error fetching pokemon ${pokemonId}:`, error);
        throw new Error('Failed to fetch data from PokéAPI');
    }
};
exports.fetchPokemonData = fetchPokemonData;
