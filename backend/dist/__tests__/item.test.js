"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const database_1 = require("../config/database");
describe('Endpoints de Items', () => {
    // Cerramos la conexión a la DB después de que TODAS las pruebas terminen
    afterAll(async () => {
        await database_1.dbPool.end();
    });
    describe('GET /api/items', () => {
        it('should return 200 and a list of items', async () => {
            const response = await (0, supertest_1.default)(index_1.default).get('/api/items?page=1&limit=5');
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('status', 'success');
            expect(Array.isArray(response.body.data)).toBe(true);
        });
        it('should have pagination properties', async () => {
            const response = await (0, supertest_1.default)(index_1.default).get('/api/items');
            expect(response.body).toHaveProperty('pagination');
        });
    });
    describe('POST /api/items', () => {
        it('should return 400 if pokemonId is invalid', async () => {
            const response = await (0, supertest_1.default)(index_1.default)
                .post('/api/items')
                .send({ pokemonId: "invalid" });
            expect(response.status).toBe(400);
        });
    });
    describe('GET /api/items/search', () => {
        it('should return 200 and filtered items by name', async () => {
            // Este test pasará si en tu item.routes.ts pusiste /search antes de /:id
            const response = await (0, supertest_1.default)(index_1.default).get('/api/items/search?name=pika');
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });
    });
    describe('GET /api/items/:id', () => {
        it('should return 200 and the item data if it exists', async () => {
            const listResponse = await (0, supertest_1.default)(index_1.default).get('/api/items');
            if (listResponse.body.data.length > 0) {
                const existingId = listResponse.body.data[0].id;
                const response = await (0, supertest_1.default)(index_1.default).get(`/api/items/${existingId}`);
                expect(response.status).toBe(200);
                expect(response.body).toHaveProperty('name');
            }
        });
        it('should return 404 for a non-existent numeric ID', async () => {
            const response = await (0, supertest_1.default)(index_1.default).get('/api/items/888888');
            expect(response.status).toBe(404);
        });
    });
    describe('DELETE /api/items/:id', () => {
        it('should return 404 if item does not exist', async () => {
            const response = await (0, supertest_1.default)(index_1.default).delete('/api/items/999999');
            expect(response.status).toBe(404);
        });
    });
});
