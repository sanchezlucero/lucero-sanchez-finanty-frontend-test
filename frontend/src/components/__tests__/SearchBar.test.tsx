// src/components/__tests__/SearchBar.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, describe, vi } from 'vitest';
import { SearchBar } from '../SearchBar';

describe('SearchBar', () => {
  test('debe llamar a la función onChange cuando el usuario escribe', () => {
    // Creamos la función mock [cite: 2026-01-15]
    const mockOnChange = vi.fn();
    
    render(
      <SearchBar 
        value="" 
        onChange={mockOnChange} 
        placeholder="Nombre del Pokémon..." 
      />
    );

    // Buscamos por el placeholder exacto que tienes en tu código
    const input = screen.getByPlaceholderText(/nombre del pokémon/i);
    
    // Simulamos la escritura [cite: 2026-01-15]
    fireEvent.change(input, { target: { value: 'Pikachu' } });

    // Verificamos que onChange se llamó con 'Pikachu' [cite: 2026-01-15]
    expect(mockOnChange).toHaveBeenCalledWith('Pikachu');
  });
});