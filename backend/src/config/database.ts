import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ 
  path: path.resolve(__dirname, '../../.env'),
  override: true 
});

// Verificamos qué está llegando exactamente
const connectionString = process.env.DATABASE_URL;
console.log('CONECTANDO A:', connectionString);

export const dbPool = new Pool({
  connectionString: connectionString,
  // Añadimos esto para forzar que cierre conexiones inactivas rápido
  idleTimeoutMillis: 1000,
  connectionTimeoutMillis: 2000,
});