# PROYECTO POKEAPP - PRUEBA TECNICA

Este proyecto es una solucion full-stack para la gestion de Pokemon, enfocada en la calidad del codigo y el rendimiento de las pruebas unitarias.

## 1. ESTRUCTURA DE CARPETAS
Siguiendo los requerimientos del documento de arquitectura:

* frontend/: Aplicacion React con TypeScript y Vite.
* backend/: API REST desarrollada en Node.js y Express.
* database/: Scripts SQL y documentacion del esquema.
* docs/: Especificaciones tecnicas y documentacion de la API.

---

## 2. REQUISITOS E INSTALACION

### Requisitos del Sistema
* Node.js v18 o superior [cite: 2026-01-15].
* Gestor de paquetes npm [cite: 2026-01-15].

### Configuracion del Backend
1. Navegar a la carpeta: cd backend.
2. Instalar dependencias: npm install [cite: 2026-01-15].
3. Configurar variables de entorno en el archivo .env.
4. Iniciar servidor: npm run dev.

### Configuracion del Frontend
1. Navegar a la carpeta: cd frontend.
2. Instalar dependencias: npm install [cite: 2026-01-15].
3. Crear archivo .env con: VITE_API_URL=http://localhost:3000 [cite: 2026-01-15].
4. Iniciar aplicacion: npm run dev [cite: 2026-01-20].

---

## 3. PRUEBAS UNITARIAS (TESTING)
Se han implementado pruebas para los componentes criticos del frontend utilizando Vitest [cite: 2026-01-20].

* Comando de ejecucion: npx vitest run [cite: 2026-01-20].
* Optimizacion: Se utilizaron mocks manuales para los iconos de Material UI para mejorar la velocidad de carga en sistemas Windows [cite: 2026-01-20].

---

## 4. ESTANDARES DE CALIDAD
* Tipado Estricto: Se ha prohibido el uso de 'any' en todo el codigo [cite: 2026-01-15].
* Nomenclatura: Variables y funciones en ingles; documentacion en español [cite: 2026-01-15, 2026-01-19].
* Manejo de Errores: Implementacion de validaciones con 'instanceof Error' [cite: 2026-01-15].