import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, describe, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { PokemonCard } from '../CardPokemon'; 
import type { Pokemon } from '../../types/pokemon';

const mockPokemon: Pokemon = {
    id: 1,
    external_id: 1, 
    name: 'bulbasaur',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
    types: [{ name: 'grass', url: '' }],
    isFavorite: false,
};

describe('PokemonCard', () => {
    test('debe mostrar el nombre y el ID formateado como #001', () => {
        render(
            <BrowserRouter>
                <PokemonCard pokemon={mockPokemon} />
            </BrowserRouter>
        );
        expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
        expect(screen.getByText(/#001/)).toBeInTheDocument();
    });

    // TEST DEL BOTÓN QUE TE PIDEN [cite: 2026-01-20]
    test('debe llamar a la función onView cuando se hace clic en el botón de visibilidad', () => {
        const mockOnView = vi.fn(); // Creamos el espía [cite: 2026-01-15]

        render(
            <BrowserRouter>
                <PokemonCard pokemon={mockPokemon} onView={mockOnView} />
            </BrowserRouter>
        );

        // Buscamos el icono de visibilidad que mockeamos en setupTests [cite: 2026-01-20]
        const viewButton = screen.getByTestId('visibility-icon');
        
        // Simulamos el clic [cite: 2026-01-15]
        fireEvent.click(viewButton);

        // Verificamos que se ejecutó la función [cite: 2026-01-15]
        expect(mockOnView).toHaveBeenCalledTimes(1);
    });
});