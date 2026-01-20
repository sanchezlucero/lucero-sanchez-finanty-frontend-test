export interface PokemonType {
    name: string;
    url: string;
}
export interface PokemonStat {
    base_stat: number;
    stat: { name: string };
}
export interface PokemonAbility {
    ability: { name: string };
    is_hidden: boolean;
}

export interface Pokemon {
    id: number;
    name: string;
    imageUrl: string;
    types: PokemonType[];
    description?: string;
    isFavorite: boolean;
    stats?: PokemonStat[];
    weight?: number;
    height?: number;
    abilities?: PokemonAbility[];
}

export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: { name: string; url: string }[];
}

// Lo que devuelve el detalle de un pokemon individual (/pokemon/id)
export interface PokemonDetailResponse {
    id: number;
    name: string;
    sprites: {
        other: {
            'official-artwork': {
                front_default: string;
            };
        };
    };
    types: {
        type: {
            name: string;
        };
    }[];
}

export interface Pagination {
    total: number;
    page: number;
    totalPages: number;
    limit: number;
}
export interface BackendResponse {
    status: string;
    data: Array<{
        id: number;
        external_id: number;
        name: string;
        image_url: string;
        type: string;
    }>;
    pagination?: Pagination; // Si no usas el tipado de paginación aún, puedes definirlo luego
}

export interface PokemonDatabaseRow {
    id: number;
    external_id: number;
    name: string;
    image_url: string;
    type: string | null;
    created_at?: string;
}

export interface SavedPokemonsResponse {
    status: string;
    pagination: {
        totalItems: number;
        currentPage: number;
        totalPages: number;
    };
    data: PokemonDatabaseRow[]; // Aquí usamos la interfaz
}