# Esquema de Base de Datos - PokeApp

Se utiliza una tabla unica para gestionar los Pokemon marcados como favoritos.

## Tabla: `items`
* **id**: Identificador unico autoincremental (Primary Key).
* **external_id**: ID original proveniente de la PokeAPI (Unique).
* **name**: Nombre del Pokemon.
* **image_url**: Enlace a la imagen oficial del Pokemon.
* **type**: Tipo principal del Pokemon.
* **created_at**: Fecha de registro en el sistema.