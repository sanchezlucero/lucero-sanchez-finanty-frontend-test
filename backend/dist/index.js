"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database");
const item_routes_1 = __importDefault(require("./routes/item.routes")); // <-- 1. Importar rutas
const error_middleware_1 = require("./middlewares/error.middleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/items', item_routes_1.default);
app.use(error_middleware_1.errorHandler);
// Endpoint de salud para probar la conexión a la DB
app.get('/health', async (_req, res) => {
    try {
        const result = await database_1.dbPool.query('SELECT NOW()');
        res.json({
            status: 'server is running',
            dbTime: result.rows[0].now
        });
    }
    catch (error) {
        res.status(500).json({ status: 'database connection error', error });
    }
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
exports.default = app; // O export { app };
