import { Request, Response, NextFunction } from 'express';

// Definimos una interfaz para errores con código de base de datos
interface DatabaseError extends Error {
    statusCode?: number;
    code?: string;
}

export const errorHandler = (err: DatabaseError, _req: Request, res: Response, _next: NextFunction) => {
    console.error(`[Error Log]: ${err.message}`); 
    
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message
    });
};