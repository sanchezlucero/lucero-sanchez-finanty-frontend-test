"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const item_controller_1 = require("../controllers/item.controller");
const router = (0, express_1.Router)();
// Definimos que cuando alguien haga POST a la raíz, se ejecute createItem
router.get('/', item_controller_1.getItems);
router.post('/', item_controller_1.createItem);
router.get('/external', item_controller_1.getExternalPokemons); // <--- DEBE ESTAR AQUÍ ARRIBA
router.get('/test-proxy', item_controller_1.getExternalPokemons); // Cambia /external por /test-proxy
router.get('/search', item_controller_1.searchItems);
// 2. RUTAS DINÁMICAS (Con parámetros variables :id)
router.get('/:id', item_controller_1.getItemById); // <--- DESPUÉS DE LAS FIJAS
router.put('/:id', item_controller_1.updateItem);
router.delete('/:id', item_controller_1.deleteItem);
exports.default = router;
