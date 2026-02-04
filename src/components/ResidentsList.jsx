import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { getLocationByUrl, getMultipleCharacters } from '@/api/rickAndMorty';
import styles from './ResidentsList.module.css';

const fetchResidents = async (locationUrl, currentCharacterId) => {
    if (!locationUrl) return [];

    const locData = await getLocationByUrl(locationUrl);
    const allResidentUrls = locData.residents || [];

    // Filter out the current character
    const neighborUrls = allResidentUrls.filter(url => {
        const id = Number(url.split('/').pop());
        return id !== currentCharacterId;
    });

    if (neighborUrls.length === 0) return [];

    // Random shuffle and pick 16
    const targetUrls = neighborUrls.sort(() => 0.5 - Math.random()).slice(0, 16);
    const ids = targetUrls.map(url => url.split('/').pop());

    if (ids.length === 0) return [];

    return await getMultipleCharacters(ids);
};

const ResidentsList = ({ locationUrl, currentCharacterId, parentSearch }) => {
  const { data: residents = [], isLoading, isError } = useQuery({
      queryKey: ['residents', locationUrl, currentCharacterId],
      queryFn: () => fetchResidents(locationUrl, currentCharacterId),
      enabled: !!locationUrl,
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false 
  });

  if (!locationUrl) return null;

  return (
    <div className={styles.residentsSection}>
        <h3 className={styles.sectionTitle}>Vecinos</h3>
        {isLoading ? (
             <div className={styles.loading}>Cargando vecinos...</div>
        ) : isError ? (
             <p className={styles.noResidents}>No se pudieron cargar los vecinos.</p>
        ) : residents.length === 0 ? (
            <p className={styles.noResidents}>No se encontraron otros vecinos aquí.</p>
        ) : (
            <div className={styles.grid}>
                {residents.map(res => (
                    <Link 
                        key={res.id} 
                        to={`/character/${res.id}`} 
                        state={{ search: parentSearch }} 
                        className={styles.residentCard}
                    >
                        <img src={res.image} alt={res.name} className={styles.residentImage} loading="lazy" />
                        <span className={styles.residentName}>{res.name}</span>
                    </Link>
                ))}
            </div>
        )}
      </div>
  );
};

ResidentsList.propTypes = {
    locationUrl: PropTypes.string,
    currentCharacterId: PropTypes.number.isRequired,
    parentSearch: PropTypes.string
};

export default ResidentsList;
