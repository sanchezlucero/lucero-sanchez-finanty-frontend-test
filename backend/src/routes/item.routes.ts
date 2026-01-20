import { Router } from 'express';
import { createItem, deleteItem, getItemById, getItems, searchItems, updateItem } from '../controllers/item.controller';

const router = Router();

// Definimos que cuando alguien haga POST a la raíz, se ejecute createItem
router.get('/', getItems);
router.post('/', createItem);
router.put('/:id', updateItem);
router.get('/search', searchItems);
router.get('/:id', getItemById);
router.delete('/:id', deleteItem);

export default router;
