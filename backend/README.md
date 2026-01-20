# BACKEND - POKEAPP API

Este servidor proporciona los servicios necesarios para la gestion de Pokemon, integrando datos de una API publica y persistencia local.

## 1. CONFIGURACION Y ARRANQUE

### Requisitos Previos
* Node.js v18 o superior instalado [cite: 2026-01-15].
* Conexion a internet para el consumo de la API externa de Pokemon.

### Pasos para iniciar
1. Instalar las dependencias necesarias:
   npm install [cite: 2026-01-15]

2. Configuracion de variables de entorno:
   Se ha incluido un archivo .env configurado con las claves de la API publica para facilitar la revision inmediata del proyecto [cite: 2026-01-15].

3. Iniciar el servidor en modo desarrollo:
   npm run dev [cite: 2026-01-20]

4. El servidor estara disponible en: http://localhost:3000 

---

## 2. ARQUITECTURA DEL LADO DEL SERVIDOR

* Lenguaje: TypeScript para asegurar un tipado estricto en los modelos de datos [cite: 2026-01-15].
* Framework: Express.js para la gestion de rutas y middleware.
* Servicios: Capa de servicios dedicada para la comunicacion con la API externa y base de datos [cite: 2026-01-15].

---

## 3. ENDPOINTS PRINCIPALES

La API esta diseñada siguiendo estandares REST. Para ver el detalle tecnico de cada ruta (parametros, cuerpos de peticion y respuestas), por favor consulte el archivo de documentacion en:
/docs/api.md

---

## 4. NOTAS TECNICAS
* Se ha evitado el uso de 'any' en el manejo de las respuestas de la API externa para mantener la integridad del sistema [cite: 2026-01-15].
* La logica de negocio se encuentra centralizada en servicios para facilitar el testing y mantenimiento futuro [cite: 2026-01-15].