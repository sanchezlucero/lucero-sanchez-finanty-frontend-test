"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbPool = void 0;
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({
    path: path_1.default.resolve(__dirname, '../../.env'),
    override: true
});
// Verificamos qué está llegando exactamente
const connectionString = process.env.DATABASE_URL;
console.log('CONECTANDO A:', connectionString);
exports.dbPool = new pg_1.Pool({
    connectionString: connectionString,
    // Añadimos esto para forzar que cierre conexiones inactivas rápido
    idleTimeoutMillis: 1000,
    connectionTimeoutMillis: 2000,
});
