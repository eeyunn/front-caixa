import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useFavorites } from '../context/FavoritesContext';
import { FAVORITE_LABELS, ANIMATIONS } from '../utils/constants';
import styles from './CharacterCard.module.css';

const CharacterCard = ({ character, index = 0 }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorite = isFavorite(character.id);
  const actionLabel = favorite ? FAVORITE_LABELS.REMOVE : FAVORITE_LABELS.ADD;

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
      initial={ANIMATIONS.card.initial}
      animate={ANIMATIONS.card.animate}
      whileHover={ANIMATIONS.card.hover}
      transition={{ 
        duration: 0.5, 
        ease: "easeOut",
        delay: index * 0.1 
      }}
    >
      <Link to={`/character/${character.id}`} className={styles.link}>
        <div className={styles.imageContainer}>
          <Motion.img 
            src={character.image} 
            alt={character.name} 
            className={styles.image} 
            loading="lazy"
            whileHover={ANIMATIONS.image.hover}
            transition={ANIMATIONS.image.transition}
          />
        </div>
        <div className={styles.content}>
          <div className={styles.header}>
            <h3 className={styles.name}>{character.name}</h3>
            <Motion.button 
              onClick={toggleFavorite} 
              className={styles.favBtn}  
              title={actionLabel}
              aria-label={actionLabel}
              whileTap={ANIMATIONS.button.tap}
              whileHover={ANIMATIONS.button.hover}
            >
              {favorite ? '❤️' : '🤍'}
            </Motion.button>
          </div>
          <p className={styles.text}>
            <span className={styles.label}>Ubicación:</span> {character.location.name}
          </p>
          <p className={styles.text}>
             <span className={styles.label}>Estado:</span> {character.status}
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
    location: PropTypes.shape({
      name: PropTypes.string,
    }),
    status: PropTypes.string,
  }).isRequired,
  index: PropTypes.number,
};

export default CharacterCard;
