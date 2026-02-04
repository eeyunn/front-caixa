import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getLocationByUrl, getMultipleCharacters } from '../api/rickAndMorty';
import styles from './ResidentsList.module.css';

const ResidentsList = ({ locationUrl, currentCharacterId }) => {
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!locationUrl) return;

    const fetchResidents = async () => {
      setLoading(true);
      try {
        const locData = await getLocationByUrl(locationUrl);
        
        // Limit to 10 residents
        const allResidentUrls = locData.residents || [];
        // Filter out current char ID could be tricky with just URLs but let's just fetch first.
        
        if (allResidentUrls.length === 0) {
            setResidents([]);
            return;
        }

        const residentUrls = allResidentUrls.slice(0, 10);
        const getIds = (url) => url.split('/').pop();
        const ids = residentUrls.map(getIds);
        
        if(ids.length === 0) {
             setResidents([]);
             return;
        }

        const residentsData = await getMultipleCharacters(ids);
        
        // Filter out the current character from the "other residents" list
        const filtered = residentsData.filter(r => r.id !== currentCharacterId);
        setResidents(filtered);

      } catch (err) {
        console.error("Error fetching residents", err);
        setError("Error al cargar los residentes.");
      } finally {
        setLoading(false);
      }
    };

    fetchResidents();
  }, [locationUrl, currentCharacterId]);

  if (!locationUrl) return null;
  if (loading) return <div className={styles.loading}>Cargando vecinos...</div>;
  if (error) return null;

  return (
    <div className={styles.residentsSection}>
        <h3 className={styles.sectionTitle}>Vecinos</h3>
        {residents.length === 0 ? (
            <p className={styles.noResidents}>No se encontraron otros vecinos aquí.</p>
        ) : (
            <div className={styles.grid}>
                {residents.map(res => (
                    <Link key={res.id} to={`/character/${res.id}`} className={styles.residentCard}>
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
    currentCharacterId: PropTypes.number.isRequired
};

export default ResidentsList;
