import { useCharacters } from '../hooks/useCharacters';
import CharacterCard from '../components/CharacterCard';
import FilterBar from '../components/FilterBar';
import SkeletonCard from '../components/SkeletonCard';
import styles from './Home.module.css';

const Home = () => {
  const { 
    characters, 
    loading, 
    error, 
    page, 
    setPage, 
    filters, 
    updateFilter,
    info
  } = useCharacters();

  return (
    <div className={styles.container}>
      {/* Search Header */}
      <section className={styles.intro}>
        <h1 className={styles.title}>El Hub de Rick y Morty</h1>
        <FilterBar filters={filters} onFilterChange={updateFilter} />
      </section>

      {error && <div className={styles.error} role="alert">{error}</div>}

      <div className={styles.grid}>
        {loading 
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : characters.map((char, index) => <CharacterCard key={char.id} character={char} index={index} />)
        }
      </div>
      
      {!loading && characters.length === 0 && !error && (
         <div className={styles.empty}>No se encontraron personajes con esos criterios.</div>
      )}

      {/* Pagination only if we have data */}
      {!loading && characters.length > 0 && (
         <div className={styles.pagination}>
            <button 
              disabled={page === 1} 
              onClick={() => {
                setPage(p => p - 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={styles.pageBtn}
            >
              Anterior
            </button>
            <span className={styles.pageInfo}>
                Página {page} {info?.pages ? `de ${info.pages}` : ''}
            </span>
            <button 
              disabled={!info?.next} 
              onClick={() => {
                  setPage(p => p + 1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
               className={styles.pageBtn}
            >
              Siguiente
            </button>
          </div>
      )}
    </div>
  );
};

export default Home;
