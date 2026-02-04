import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useFavorites } from '@/context/FavoritesContext';
import { FAVORITE_LABELS } from '@/utils/constants';
import styles from './CharacterCard.module.css';

const CharacterCard = ({ character, index = 0 }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const [imgSrc, setImgSrc] = useState(character.image);
  const [imgError, setImgError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const location = useLocation();
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

  const handleImageError = () => {
    if (retryCount < 3) {
      const timeout = 1000 * (retryCount + 1);
      console.warn(`[Image Retry] ${character.name} attempt ${retryCount + 1}. Retrying in ${timeout}ms...`);
      
      setTimeout(() => {
        setRetryCount(prev => prev + 1);
        setImgSrc(`${character.image}?retry=${retryCount + 1}-${Date.now()}`);
        setIsLoading(true);
      }, timeout);
    } else {
      setIsLoading(false);
      setImgError(true);
    }
  };

  return (
    <div 
      className={styles.card}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <Link 
        to={`/character/${character.id}`} 
        state={{ search: location.search }}
        className={styles.link}
      >
        <div className={styles.imageContainer}>
          {isLoading && !imgError && (
            <div className={styles.skeletonLoader} />
          )}
          
          {imgError ? (
            <div className={styles.imageFallback}>
              <span>NO IMAGE</span>
            </div>
          ) : (
            <img 
              src={imgSrc} 
              alt={character.name} 
              className={`${styles.image} ${!isLoading ? styles.imageLoaded : ''}`}
              loading="lazy"
              onLoad={() => setIsLoading(false)}
              onError={handleImageError}
            />
          )}
        </div>
        <div className={styles.content}>
          <div className={styles.header}>
            <h3 className={styles.name}>{character.name}</h3>
            <button 
              onClick={toggleFavorite} 
              className={styles.favBtn}  
              title={actionLabel}
              aria-label={actionLabel}
            >
              {favorite ? '❤️' : '🤍'}
            </button>
          </div>
          <p className={styles.text}>
             <span className={styles.label}>Ubicación:</span> {character.location.name}
          </p>
          <p className={styles.text}>
             <span className={styles.label}>Estado:</span> {character.status}
          </p>
        </div>
      </Link>
    </div>
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
