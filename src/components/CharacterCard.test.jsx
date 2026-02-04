import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import CharacterCard from './CharacterCard';
import * as FavoritesContext from '../context/FavoritesContext';

// Mock simple de react-hot-toast
vi.mock('react-hot-toast', () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  }
}));

// Mock del contexto
const mockAddFavorite = vi.fn();
const mockRemoveFavorite = vi.fn();
const mockIsFavorite = vi.fn();

vi.spyOn(FavoritesContext, 'useFavorites').mockReturnValue({
  addFavorite: mockAddFavorite,
  removeFavorite: mockRemoveFavorite,
  isFavorite: mockIsFavorite,
});

const characterMock = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  origin: { name: 'Earth' },
  location: { name: 'Earth' }
};

describe('CharacterCard Component', () => {
    
    beforeEach(() => {
        vi.clearAllMocks();
    });

  it('debería renderizar la información del personaje correctamente', () => {
    // Simulamos que NO es favorito
    mockIsFavorite.mockReturnValue(false);

    render(
      <MemoryRouter>
        <CharacterCard character={characterMock} />
      </MemoryRouter>
    );

    // Verificar nombre
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Alive')).toBeInTheDocument();
  });

  it('debería llamar a addFavorite cuando se pulsa el botón y no es favorito', () => {
    mockIsFavorite.mockReturnValue(false);

    render(
      <MemoryRouter>
        <CharacterCard character={characterMock} />
      </MemoryRouter>
    );

    const btn = screen.getByTitle('Añadir a favoritos');
    fireEvent.click(btn);

    expect(mockAddFavorite).toHaveBeenCalledWith(characterMock);
  });

  it('debería llamar a removeFavorite cuando se pulsa el botón y YA es favorito', () => {
    mockIsFavorite.mockReturnValue(true);

    render(
      <MemoryRouter>
        <CharacterCard character={characterMock} />
      </MemoryRouter>
    );

    const btn = screen.getByTitle('Eliminar de favoritos');
    fireEvent.click(btn);

    expect(mockRemoveFavorite).toHaveBeenCalledWith(1);
  });
});
