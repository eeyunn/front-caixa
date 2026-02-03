import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { FavoritesProvider, useFavorites } from './FavoritesContext';

describe('FavoritesContext', () => {
  beforeEach(() => {
    // Limpiamos localStorage antes de cada test para asegurar aislamiento
    localStorage.clear();
  });

  // Wrapper necesario para proveer el contexto a nuestros hooks durante el test
  const wrapper = ({ children }) => <FavoritesProvider>{children}</FavoritesProvider>;

  it('debe iniciar con lista de favoritos vacía si no hay nada en localStorage', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });
    expect(result.current.favorites).toEqual([]);
  });

  it('debe añadir un personaje a favoritos', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });
    const character = { id: 1, name: 'Rick Sanchez' };

    act(() => {
      result.current.addFavorite(character);
    });

    expect(result.current.favorites).toHaveLength(1);
    expect(result.current.favorites[0]).toEqual(character);
    expect(result.current.isFavorite(1)).toBe(true);
  });

  it('no debe duplicar personajes si se añade el mismo dos veces', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });
    const character = { id: 1, name: 'Rick Sanchez' };

    act(() => {
      result.current.addFavorite(character);
      result.current.addFavorite(character); // Intentamos añadir de nuevo
    });

    expect(result.current.favorites).toHaveLength(1);
  });

  it('debe eliminar un personaje de favoritos', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });
    const char1 = { id: 1, name: 'Rick' };
    const char2 = { id: 2, name: 'Morty' };

    // Añadimos dos
    act(() => {
      result.current.addFavorite(char1);
      result.current.addFavorite(char2);
    });

    expect(result.current.favorites).toHaveLength(2);

    // Eliminamos uno
    act(() => {
      result.current.removeFavorite(1);
    });

    expect(result.current.favorites).toHaveLength(1);
    expect(result.current.isFavorite(1)).toBe(false);
    expect(result.current.isFavorite(2)).toBe(true);
  });

  it('debe inicializarse con datos si existen en localStorage', () => {
    const storedData = [{ id: 99, name: 'Summer' }];
    localStorage.setItem('favorites', JSON.stringify(storedData));

    const { result } = renderHook(() => useFavorites(), { wrapper });

    expect(result.current.favorites).toHaveLength(1);
    expect(result.current.favorites[0].name).toBe('Summer');
  });

  it('debe persistir los cambios en localStorage automáticamente', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });
    const char = { id: 10, name: 'Beth' };

    act(() => {
      result.current.addFavorite(char);
    });

    // Verificamos directamente el localStorage del "navegador" (jsdom)
    const stored = JSON.parse(localStorage.getItem('favorites'));
    expect(stored).toHaveLength(1);
    expect(stored[0].name).toBe('Beth');
  });
});
