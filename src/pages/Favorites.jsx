import { Link } from 'react-router-dom';
import { useFavorites } from '@/context/FavoritesContext';
import CharacterCard from '@/components/CharacterCard';
import styles from './Favorites.module.css';

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.topBar}>
          <Link to="/" className={styles.backBtn}>← Volver al Inicio</Link>
        </div>
        <h1 className={styles.title}>Mi Colección</h1>
        <p className={styles.subtitle}>
          {favorites.length} {favorites.length === 1 ? 'personaje' : 'personajes'} guardado(s)
        </p>
      </header>

      {favorites.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>💔</div>
          <p>Aún no hay favoritos.</p>
          <Link to="/" className={styles.browseBtn}>Explorar Personajes</Link>
        </div>
      ) : (
        <div className={styles.grid}>
          {favorites.map((char, index) => (
            <CharacterCard key={char.id} character={char} index={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
