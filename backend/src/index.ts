import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { dbPool } from './config/database';
import itemRoutes from './routes/item.routes'; // <-- 1. Importar rutas
import { errorHandler } from './middlewares/error.middleware';
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(cors()); 
app.use(express.json());

app.use('/api/items', itemRoutes);
app.use(errorHandler);
// Endpoint de salud para probar la conexión a la DB
app.get('/health', async (_req: Request, res: Response) => {
  try {
    const result = await dbPool.query('SELECT NOW()');
    res.json({ 
      status: 'server is running', 
      dbTime: result.rows[0].now 
    });
  } catch (error) {
    res.status(500).json({ status: 'database connection error', error });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


export default app; // O export { app };