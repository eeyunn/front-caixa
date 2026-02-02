import { useState, useEffect } from 'react';
import { getCharacters } from '../api/rickAndMorty';

export const useCharacters = (initialFilters = {}) => {
  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Only include filters that have values
        const activeFilters = Object.fromEntries(
          Object.entries(filters).filter((entry) => entry[1])
        );
        
        const data = await getCharacters(page, activeFilters);
        setCharacters(data.results);
        setInfo(data.info);
      } catch (err) {
        setError(err.response?.status === 404 ? 'No se encontraron personajes' : 'Error al obtener datos');
        setCharacters([]);
        setInfo({});
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
        fetchData(); 
    }, 300); // Simple debounce

    return () => clearTimeout(timeoutId);

  }, [filters, page]);

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1); // Reset to page 1 on filter change
  };

  return { 
    characters, 
    info, 
    loading, 
    error, 
    page, 
    setPage, 
    filters, 
    updateFilter 
  };
};
