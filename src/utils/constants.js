// Constantes globales de la aplicación

export const FAVORITE_LABELS = {
  ADD: "Añadir a favoritos",
  REMOVE: "Eliminar de favoritos"
};

export const ANIMATIONS = {
  card: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    hover: { y: -8, transition: { duration: 0.2 } }
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
