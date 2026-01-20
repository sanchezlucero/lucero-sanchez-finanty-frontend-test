export interface PokemonItem {
  id?: number;          // Autoincremental interno de tu PostgreSQL
  external_id: number;  // El "id" que viste en la foto (ej: 1)
  name: string;         // El "name" que viste (ej: "bulbasaur")
  image_url: string;    // Sacado de data.sprites.front_default
  type: string;         // Sacado de data.types[0].type.name
}