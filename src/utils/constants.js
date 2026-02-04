export const FAVORITE_LABELS = {
  ADD: "Añadir a favoritos",
  REMOVE: "Eliminar de favoritos"
};

export const API_CONFIG = {
  ITEMS_PER_PAGE: 20,
  MAX_FETCH_LIMIT: 250
};

export const ANIMATIONS = {
  card: {
    hidden: { opacity: 0, y: 30 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: "easeOut", 
        delay: index * 0.1 
      }
    })
  },
  image: {
    hover: { scale: 1.05 },
    transition: { duration: 0.3 }
  },
  button: {
    tap: { scale: 0.8 },
    hover: { scale: 1.2 }
  }
};
