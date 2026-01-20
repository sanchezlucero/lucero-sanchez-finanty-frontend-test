# Frontend - PokeApp Client

Esta es la aplicacion cliente desarrollada con **React 18** y **TypeScript**, utilizando **Vite** como herramienta de construccion [cite: 2026-01-15, 2026-01-20].

##  Tecnologias Principales
- **React 18**: Biblioteca principal de UI [cite: 2026-01-15].
- **TypeScript**: Tipado estricto para garantizar la robustez del codigo [cite: 2026-01-15].
- **Material UI**: Sistema de componentes y diseño [cite: 2026-01-20].
- **Vitest**: Framework de pruebas unitarias de alto rendimiento [cite: 2026-01-20].

## Scripts Disponibles

Dentro de esta carpeta, puedes ejecutar:

### `npm run dev`
Inicia el servidor de desarrollo en local [cite: 2026-01-20].

### `npx vitest run`
Ejecuta la suite de pruebas unitarias [cite: 2026-01-20].
*Nota: Se han implementado mocks para los iconos de Material UI para optimizar la velocidad en Windows [cite: 2026-01-20].*

### `npm run build`
Crea la version de produccion optimizada en la carpeta `dist/` [cite: 2026-01-20].

## Detalle de Pruebas
Se han cubierto los siguientes escenarios:
- Renderizado correcto de componentes (`PokemonCard`, `SearchBar`) [cite: 2026-01-20].
- Interaccion con botones (ej: boton de Visibilidad) [cite: 2026-01-20].
- Formateo correcto de IDs de Pokemon (ej: #001) [cite: 2026-01-19].

---
*Este proyecto sigue el estandar de nombres en ingles para variables y funciones [cite: 2026-01-15].*