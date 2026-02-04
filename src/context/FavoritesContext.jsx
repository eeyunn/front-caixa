import { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useLocalStorage('favorites', []);

  const addFavorite = (character) => {
    setFavorites((prev) => {
      // Prevents adding if already exists (extra safety)
      if (prev.find((fav) => fav.id === character.id)) return prev;
      return [...prev, character];
    });
  };

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== id));
  };

  const isFavorite = (id) => {
    return favorites.some((fav) => fav.id === id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

FavoritesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFavorites = () => useContext(FavoritesContext);
