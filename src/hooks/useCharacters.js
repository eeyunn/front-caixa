import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getCharacters, getLocationsByName, getMultipleCharacters } from '@/api/rickAndMorty';
import { useDebounce } from './useDebounce';
import { API_CONFIG } from '@/utils/constants';

// Helper function to handle the complex fetching logic
const fetchCharactersData = async ({ page, filters }) => {
  const activeFilters = Object.fromEntries(
    Object.entries(filters).filter((entry) => entry[1])
  );

  // Scenario A: Location Filter (Client-side logic)
  if (activeFilters.location) {
    let locData;
    try {
      locData = await getLocationsByName(activeFilters.location);
    } catch (locError) {
      if (locError.response?.status === 404) {
        return { results: [], info: {} };
      }
      throw new Error(`Error buscando ubicaciones: ${locError.message}`);
    }

    const uniqueResidentUrls = [...new Set(locData.results.flatMap(loc => loc.residents))];
    const { MAX_FETCH_LIMIT, ITEMS_PER_PAGE } = API_CONFIG;

    let idsToFetch = uniqueResidentUrls
      .slice(0, MAX_FETCH_LIMIT)
      .map(url => {
        const parts = url.split('/');
        return parts[parts.length - 1] || parts[parts.length - 2];
      })
      .filter(id => id && !isNaN(id));

    if (idsToFetch.length === 0) {
      return { results: [], info: {} };
    }

    let allChars;
    try {
      allChars = await getMultipleCharacters(idsToFetch);
    } catch (charError) {
       throw new Error(`Error obteniendo detalles de personajes: ${charError.message}`);
    }

    let filteredChars = allChars;
    if (activeFilters.name) {
      filteredChars = filteredChars.filter(c => c.name.toLowerCase().includes(activeFilters.name.toLowerCase()));
    }
    if (activeFilters.species) {
      filteredChars = filteredChars.filter(c => c.species.toLowerCase().includes(activeFilters.species.toLowerCase()));
    }

    // Client-side pagination
    const filteredTotal = filteredChars.length;
    const totalPages = Math.ceil(filteredTotal / ITEMS_PER_PAGE);
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const pageChars = filteredChars.slice(start, end);

    return {
      results: pageChars,
      info: {
        pages: totalPages,
        count: filteredTotal,
        next: page < totalPages ? 'next-available' : null,
        prev: page > 1 ? 'prev-available' : null
      }
    };
  } 
  
  // Scenario B: Standard API Fetch
  try {
    const data = await getCharacters(page, activeFilters);
    return data;
  } catch (err) {
    if (err.response && err.response.status === 404) {
      return { results: [], info: { pages: 0, count: 0 } };
    }
    throw err;
  }
};

export const useCharacters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // State initialization from URL
  const [page, setPage] = useState(() => Number(searchParams.get('page')) || 1);
  const [filters, setFilters] = useState(() => ({
    name: searchParams.get('name') || '',
    species: searchParams.get('species') || '',
    type: searchParams.get('type') || '',
    location: searchParams.get('location') || '',
  }));

  const debouncedFilters = useDebounce(filters, 600);
  const prevFiltersRef = useRef(debouncedFilters);

  // URL <-> State Sync
  useEffect(() => {
    const currentParams = Object.fromEntries(searchParams.entries());
    const urlPage = Number(currentParams.page) || 1;
    if (urlPage !== page) setPage(urlPage);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    const params = { page: page.toString() };
    Object.entries(debouncedFilters).forEach(([key, value]) => {
      if (value) params[key] = value;
    });
    setSearchParams(params, { replace: true });
  }, [page, debouncedFilters, setSearchParams]);

  // Reset page when filters change
  useEffect(() => {
    const prevFilters = prevFiltersRef.current;
    if (JSON.stringify(prevFilters) !== JSON.stringify(debouncedFilters)) {
      prevFiltersRef.current = debouncedFilters;
      setPage(1);
    }
  }, [debouncedFilters]);

  // React Query Implementation
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['characters', page, debouncedFilters],
    queryFn: () => fetchCharactersData({ page, filters: debouncedFilters }),
    placeholderData: keepPreviousData, // Keeps previous list while fetching new page (better UX)
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return { 
    characters: data?.results || [], 
    info: data?.info || {}, 
    loading: isLoading, 
    error: isError ? (error.message || 'Error desconocido') : null, 
    page, 
    setPage, 
    filters, 
    updateFilter 
  };
};
