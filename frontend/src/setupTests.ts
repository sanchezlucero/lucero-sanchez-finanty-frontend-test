// src/setupTests.ts
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import React from 'react';

// Interfaz ligera para las props [cite: 2026-01-15]
interface IconProps {
  [key: string]: unknown;
}

vi.mock('@mui/icons-material', () => ({
  // Solo los iconos que usas en tus componentes
  Search: (props: IconProps) => React.createElement('div', { ...props, 'data-testid': 'search-icon' }),
  Favorite: (props: IconProps) => React.createElement('div', { ...props, 'data-testid': 'favorite-icon' }),
  FavoriteBorder: (props: IconProps) => React.createElement('div', { ...props, 'data-testid': 'favorite-border-icon' }),
  Visibility: (props: IconProps) => React.createElement('div', { ...props, 'data-testid': 'visibility-icon' }),
}));