import { NextFunction, Request, Response } from 'express';
import { dbPool } from '../config/database';
import { fetchPokemonData, POKE_API_BASE_URL } from '../services/pokemon.service';
import { DatabaseError } from 'pg';
import axios from 'axios';

export const getItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Obtenemos página y límite de la URL, ej: /api/items?page=1&limit=10
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const offset = (page - 1) * limit;

        // Consulta con LIMIT y OFFSET para la paginación
        const result = await dbPool.query(
            'SELECT * FROM items ORDER BY created_at DESC LIMIT $1 OFFSET $2',
            [limit, offset]
        );

        // También necesitamos el total para que el frontend sepa cuántas páginas hay
        const countResult = await dbPool.query('SELECT COUNT(*) FROM items');
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
    } catch (error) {
        next(error);
    }
};

interface PokeApiPokemon {
    id: number;
    name: string;
    weight: number;
    height: number;
    stats: Array<{
        base_stat: number;
        stat: { name: string }
    }>;
    abilities: Array<{
        ability: { name: string };
        is_hidden: boolean
    }>; //
    types: Array<{
        slot: number;
        type: { name: string }
    }>; // La PokeAPI usa "types" en plural
    sprites: {
        other: {
            'official-artwork': {
                front_default: string
            }
        }
    };
}
// Backend: controller.ts
export const getItemById = async (req: Request, res: Response, next: NextFunction) => {
    // IMPORTANTE: Este 'id' que recibes ahora lo trataremos SIEMPRE como el external_id
    const { id } = req.params; 

    try {
        // 1. Buscamos en nuestra DB si es un favorito usando SOLO el external_id
        const result = await dbPool.query(
            'SELECT * FROM items WHERE external_id = $1', 
            [id]
        );
        const localData = result.rows[0];

        // 2. Vamos a la PokeAPI usando el mismo 'id' (que es el de la pokedex)
        const response = await axios.get<PokeApiPokemon>(`${POKE_API_BASE_URL}/${id}`);
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
    } catch (error) {
        // Si la PokeAPI no lo encuentra o hay otro error
        next(error);
    }
};
export const createItem = async (req: Request, res: Response, next: NextFunction) => {
    const { pokemonId } = req.body; // El usuario enviará el ID que quiere guardar
    if (!pokemonId || typeof pokemonId !== 'number') {
        return res.status(400).json({ message: 'Debe proporcionar un pokemonId numérico válido.' });
    }

    try {
        // NUEVO: Verificar si ya existe en nuestra DB usando el external_id
        const existing = await dbPool.query('SELECT id FROM items WHERE external_id = $1', [pokemonId]);
        if (existing.rowCount && existing.rowCount > 0) {
            return res.status(400).json({ message: 'Este Pokémon ya está en tu base de datos' });
        }
        // 1. Consumir la API
        const pokemon = await fetchPokemonData(pokemonId);

        // 2. Persistir en la base de datos (PostgreSQL)
        const query = `
      INSERT INTO items (external_id, name, image_url, type)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
        const values = [pokemon.external_id, pokemon.name, pokemon.image_url, pokemon.type];

        const result = await dbPool.query(query, values);

        res.status(201).json({
            message: 'Pokemon saved successfully',
            data: result.rows[0]
        });
    } catch (error) {
        next(error);
    }
};

export const updateItem = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, type } = req.body;
    try {
        const result = await dbPool.query(
            'UPDATE items SET name = $1, type = $2 WHERE id = $3 RETURNING *',
            [name, type, id]
        );
        if (result.rowCount === 0) return res.status(404).json({ message: 'No encontrado' });
        res.json({ message: 'Actualizado!', data: result.rows[0] });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar', error });
    }
};

export const deleteItem = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const result = await dbPool.query('DELETE FROM items WHERE id = $1 RETURNING *', [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'No se encontró el Pokémon con ese ID.' });
        }

        res.json({ message: 'Pokémon eliminado correctamente' });
    } catch (error: unknown) {
        // Tipamos el error de forma segura
        const dbError = error as DatabaseError;

        // Si el ID es inválido para la base de datos (ej: muy grande o mal formato)
        if (dbError.code === '22P02' || dbError.code === '22003') {
            return res.status(404).json({ message: 'Pokémon no encontrado (ID inválido).' });
        }

        next(dbError);
    }
};

export const searchItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.query;

        // Si el test envía ?name=pika, debemos asegurarnos de procesarlo
        if (!name || typeof name !== 'string') {
            return res.status(400).json({ message: 'El parámetro name es requerido y debe ser texto.' });
        }

        const query = 'SELECT * FROM items WHERE name ILIKE $1';
        const result = await dbPool.query(query, [`%${name}%`]);

        res.status(200).json(result.rows);
    } catch (error: unknown) {
        next(error);
    }
};

// En tu controller de backend
export const getExternalPokemons = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { limit = 151, offset = 0 } = req.query;
        // Importante: No uses params.id aquí, usa la URL de PokeAPI directamente
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};