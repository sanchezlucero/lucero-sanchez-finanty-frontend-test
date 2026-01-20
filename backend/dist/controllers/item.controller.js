"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExternalPokemons = exports.searchItems = exports.deleteItem = exports.updateItem = exports.createItem = exports.getItemById = exports.getItems = void 0;
const database_1 = require("../config/database");
const pokemon_service_1 = require("../services/pokemon.service");
const axios_1 = __importDefault(require("axios"));
const getItems = async (req, res, next) => {
    try {
        // Obtenemos página y límite de la URL, ej: /api/items?page=1&limit=10
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        // Consulta con LIMIT y OFFSET para la paginación
        const result = await database_1.dbPool.query('SELECT * FROM items ORDER BY created_at DESC LIMIT $1 OFFSET $2', [limit, offset]);
        // También necesitamos el total para que el frontend sepa cuántas páginas hay
        const countResult = await database_1.dbPool.query('SELECT COUNT(*) FROM items');
        const totalItems = parseInt(countResult.rows[0].count);
        res.status(200).json({
            status: 'success',
            pagination: {
                totalItems,
                currentPage: page,
                totalPages: Math.ceil(totalItems / limit)
            },
            data: result.rows
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getItems = getItems;
// Backend: controller.ts
const getItemById = async (req, res, next) => {
    // IMPORTANTE: Este 'id' que recibes ahora lo trataremos SIEMPRE como el external_id
    const { id } = req.params;
    try {
        // 1. Buscamos en nuestra DB si es un favorito usando SOLO el external_id
        const result = await database_1.dbPool.query('SELECT * FROM items WHERE external_id = $1', [id]);
        const localData = result.rows[0];
        // 2. Vamos a la PokeAPI usando el mismo 'id' (que es el de la pokedex)
        const response = await axios_1.default.get(`${pokemon_service_1.POKE_API_BASE_URL}/${id}`);
        const fullData = response.data;
        // 3. Devolvemos la respuesta unificada
        res.json({
            id: localData ? localData.id : null,
            external_id: fullData.id,
            name: fullData.name,
            image_url: fullData.sprites.other['official-artwork'].front_default,
            type: fullData.types[0].type.name,
            stats: fullData.stats,
            weight: fullData.weight,
            height: fullData.height,
            isFavorite: !!localData
        });
    }
    catch (error) {
        // Si la PokeAPI no lo encuentra o hay otro error
        next(error);
    }
};
exports.getItemById = getItemById;
const createItem = async (req, res, next) => {
    const { pokemonId } = req.body; // El usuario enviará el ID que quiere guardar
    if (!pokemonId || typeof pokemonId !== 'number') {
        return res.status(400).json({ message: 'Debe proporcionar un pokemonId numérico válido.' });
    }
    try {
        // NUEVO: Verificar si ya existe en nuestra DB usando el external_id
        const existing = await database_1.dbPool.query('SELECT id FROM items WHERE external_id = $1', [pokemonId]);
        if (existing.rowCount && existing.rowCount > 0) {
            return res.status(400).json({ message: 'Este Pokémon ya está en tu base de datos' });
        }
        // 1. Consumir la API
        const pokemon = await (0, pokemon_service_1.fetchPokemonData)(pokemonId);
        // 2. Persistir en la base de datos (PostgreSQL)
        const query = `
      INSERT INTO items (external_id, name, image_url, type)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
        const values = [pokemon.external_id, pokemon.name, pokemon.image_url, pokemon.type];
        const result = await database_1.dbPool.query(query, values);
        res.status(201).json({
            message: 'Pokemon saved successfully',
            data: result.rows[0]
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createItem = createItem;
const updateItem = async (req, res) => {
    const { id } = req.params;
    const { name, type } = req.body;
    try {
        const result = await database_1.dbPool.query('UPDATE items SET name = $1, type = $2 WHERE id = $3 RETURNING *', [name, type, id]);
        if (result.rowCount === 0)
            return res.status(404).json({ message: 'No encontrado' });
        res.json({ message: 'Actualizado!', data: result.rows[0] });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar', error });
    }
};
exports.updateItem = updateItem;
const deleteItem = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await database_1.dbPool.query('DELETE FROM items WHERE id = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'No se encontró el Pokémon con ese ID.' });
        }
        res.json({ message: 'Pokémon eliminado correctamente' });
    }
    catch (error) {
        // Tipamos el error de forma segura
        const dbError = error;
        // Si el ID es inválido para la base de datos (ej: muy grande o mal formato)
        if (dbError.code === '22P02' || dbError.code === '22003') {
            return res.status(404).json({ message: 'Pokémon no encontrado (ID inválido).' });
        }
        next(dbError);
    }
};
exports.deleteItem = deleteItem;
const searchItems = async (req, res, next) => {
    try {
        const { name } = req.query;
        // Si el test envía ?name=pika, debemos asegurarnos de procesarlo
        if (!name || typeof name !== 'string') {
            return res.status(400).json({ message: 'El parámetro name es requerido y debe ser texto.' });
        }
        const query = 'SELECT * FROM items WHERE name ILIKE $1';
        const result = await database_1.dbPool.query(query, [`%${name}%`]);
        res.status(200).json(result.rows);
    }
    catch (error) {
        next(error);
    }
};
exports.searchItems = searchItems;
// En tu controller de backend
const getExternalPokemons = async (req, res, next) => {
    try {
        const { limit = 151, offset = 0 } = req.query;
        // Importante: No uses params.id aquí, usa la URL de PokeAPI directamente
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        const data = await response.json();
        res.status(200).json(data);
    }
    catch (error) {
        next(error);
    }
};
exports.getExternalPokemons = getExternalPokemons;
