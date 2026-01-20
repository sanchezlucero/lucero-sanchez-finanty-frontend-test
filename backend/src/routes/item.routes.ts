import { Router } from 'express';
import { createItem, deleteItem, getExternalPokemons, getItemById, getItems, searchItems, updateItem } from '../controllers/item.controller';

const router = Router();

// Definimos que cuando alguien haga POST a la raíz, se ejecute createItem
router.get('/', getItems);
router.post('/', createItem);
router.get('/external', getExternalPokemons); // <--- DEBE ESTAR AQUÍ ARRIBA
router.get('/test-proxy', getExternalPokemons); // Cambia /external por /test-proxy
router.get('/search', searchItems);

// 2. RUTAS DINÁMICAS (Con parámetros variables :id)
router.get('/:id', getItemById);               // <--- DESPUÉS DE LAS FIJAS
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

export default router;
