import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { getCharacterById } from '../api/rickAndMorty';
import { useFavorites } from '../context/FavoritesContext';
import ResidentsList from '../components/ResidentsList';
import { FAVORITE_LABELS } from '../utils/constants';
import styles from './CharacterDetail.module.css';

const CharacterDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    const fetchFullDetails = async () => {
      try {
        setLoading(true);
        // 1. Fetch Character
        const charData = await getCharacterById(id);
        setCharacter(charData);
      } catch (error) {
        console.error("Failed to load details", error);
        toast.error("Error al cargar los detalles del personaje");
      } finally {
        setLoading(false);
      }
    };

    fetchFullDetails();
  }, [id]);

  if (loading) return <div className={styles.loading}>Cargando detalles...</div>;
  if (!character) return <div className={styles.error}>Personaje no encontrado</div>;

  const favorite = isFavorite(character.id);

  const handleToggleFavorite = () => {
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
        className={styles.container}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
    >
      <button onClick={() => navigate(-1)} className={styles.backBtn}>
        ← Volver al listado
      </button>

      <div className={styles.card}>
        <div className={styles.header}>
            <div className={styles.imageWrapper}>
                <Motion.img 
                    src={character.image} 
                    alt={character.name} 
                    className={styles.image} 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                />
            </div>
            
            <div className={styles.info}>
                <div className={styles.titleRow}>
                    <h1 className={styles.name}>{character.name}</h1>
                    <Motion.button 
                        onClick={handleToggleFavorite}
                        className={styles.favBtn}
                        title={favorite ? FAVORITE_LABELS.REMOVE : FAVORITE_LABELS.ADD}
                        aria-label={favorite ? FAVORITE_LABELS.REMOVE : FAVORITE_LABELS.ADD}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {favorite ? '❤️' : '🤍'}
                    </Motion.button>
                </div>

                <div className={styles.gridInfo}>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>Estado:</span>
                        <span className={`${styles.status} ${styles[character.status.toLowerCase()]}`}>
                            {character.status}
                        </span>
                    </div>
                     <div className={styles.infoItem}>
                        <span className={styles.label}>Especie:</span> {character.species}
                    </div>
                     <div className={styles.infoItem}>
                        <span className={styles.label}>Tipo:</span> {character.type || 'Unknown'}
                    </div>
                     <div className={styles.infoItem}>
                        <span className={styles.label}>Género:</span> {character.gender}
                    </div>
                     <div className={styles.infoItem}>
                        <span className={styles.label}>Origen:</span> {character.origin.name}
                    </div>
                     <div className={styles.infoItem}>
                        <span className={styles.label}>Ubicación:</span> {character.location.name}
                    </div>
                </div>
            </div>
        </div>
      </div>

      <ResidentsList locationUrl={character.location.url} currentCharacterId={character.id} />
    </Motion.div>
  );
};

export default CharacterDetail;
