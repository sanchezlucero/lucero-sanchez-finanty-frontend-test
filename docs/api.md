# DOCUMENTACION DE LA API - POKEAPP (BACKEND)

Esta guia detalla los endpoints disponibles para la gestion de Pokemon, integrando datos locales (PostgreSQL) y externos (PokeAPI).

## BASE URL
`http://localhost:3000/api/items` (o la ruta definida en tu server.ts).

---

## 1. OBTENER LISTADO LOCAL (PAGINADO)
Obtiene los Pokemon guardados en la base de datos local con soporte para paginacion.

* **Endpoint**: `GET /`
* **Query Params**: 
  * `page`: Numero de pagina (default: 1).
  * `limit`: Cantidad por pagina (default: 10).
* **Respuesta**:
  ```json
  {
    "status": "success",
    "pagination": { "totalItems": 50, "currentPage": 1, "totalPages": 5 },
    "data": [...]
  }