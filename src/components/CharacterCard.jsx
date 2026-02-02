import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useFavorites } from '../context/FavoritesContext';
import { translateStatus } from '../utils/translations';
import styles from './CharacterCard.module.css';

const CharacterCard = ({ character, index = 0 }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorite = isFavorite(character.id);

  const toggleFavorite = (e) => {
    e.preventDefault(); 
    if (favorite) {
      removeFavorite(character.id);
      toast.error(`Eliminado ${character.name} de favoritos`);
    } else {
      addFavorite(character);
      toast.success(`¡Añadido ${character.name} a favoritos!`);
    }
  };

  return (
    <Motion.div 
      className={styles.card}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        ease: "easeOut",
        delay: index * 0.1 
      }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
    >
      <Link to={`/character/${character.id}`} className={styles.link}>
        <div className={styles.imageContainer}>
          <Motion.img 
            src={character.image} 
            alt={character.name} 
            className={styles.image} 
            loading="lazy"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className={styles.content}>
          <div className={styles.header}>
            <h3 className={styles.name}>{character.name}</h3>
            <Motion.button 
              onClick={toggleFavorite} 
              className={styles.favBtn}  
              title={favorite ? "Eliminar de favoritos" : "Añadir a favoritos"}
              aria-label={favorite ? "Eliminar de favoritos" : "Añadir a favoritos"}
              whileTap={{ scale: 0.8 }}
              whileHover={{ scale: 1.2 }}
            >
              {favorite ? '❤️' : '🤍'}
            </Motion.button>
          </div>
          <p className={styles.text}>
            <span className={styles.label}>Origen:</span> {character.origin.name}
          </p>
          <p className={styles.text}>
             <span className={styles.label}>Estado:</span> {translateStatus(character.status)}
          </p>
        </div>
      </Link>
    </Motion.div>
  );
};

CharacterCard.propTypes = {
  character: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    origin: PropTypes.shape({
      name: PropTypes.string,
    }),
    status: PropTypes.string,
  }).isRequired,
  index: PropTypes.number,
};

export default CharacterCard;
