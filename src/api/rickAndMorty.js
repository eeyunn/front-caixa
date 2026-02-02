import axios from 'axios';

const api = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
});

export const getCharacters = async (page = 1, filters = {}) => {
  const params = { page, ...filters };
  const response = await api.get('/character', { params });
  return response.data;
};

export const getCharacterById = async (id) => {
  const response = await api.get(`/character/${id}`);
  return response.data;
};

export const getLocationByUrl = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

export const getMultipleCharacters = async (ids) => {
  const response = await api.get(`/character/${ids}`);
  // La API devuelve un objeto si es un solo ID, o un array si son múltiples.
  // Nos aseguramos de que siempre sea un array.
  return Array.isArray(response.data) ? response.data : [response.data];
};

export default api;
