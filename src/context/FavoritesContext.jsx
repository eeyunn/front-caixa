import { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (character) => {
    setFavorites((prev) => {
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
