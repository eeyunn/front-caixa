import axios from 'axios';

const api = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;
    
    const isRateLimit = response && response.status === 429;
    const isNetworkError = error.message === 'Network Error' || error.code === 'ERR_NETWORK';
    
    const shouldRetry = config && (isRateLimit || isNetworkError);

    if (shouldRetry) {
      config.__retryCount = config.__retryCount || 0;
      const MAX_RETRIES = 3;
      
      if (config.__retryCount < MAX_RETRIES) {
        config.__retryCount += 1;
        
        const retryAfter = response?.headers?.['retry-after'];
        const delay = retryAfter 
          ? parseInt(retryAfter, 10) * 1000 
          : 1000 * Math.pow(2, config.__retryCount - 1);

        console.warn(`[API] Retrying request... (Attempt ${config.__retryCount}/${MAX_RETRIES})`);
        
        await new Promise(resolve => setTimeout(resolve, delay));
        return api(config);
      }
    }
    return Promise.reject(error);
  }
);


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
  const response = await api.get(url);
  return response.data;
};

export const getMultipleCharacters = async (ids) => {
  const idList = Array.isArray(ids) ? ids : [ids];
  
  if (idList.length === 0) return [];

  const CHUNK_SIZE = 50; 
  const fetchedChars = [];
  
  for (let i = 0; i < idList.length; i += CHUNK_SIZE) {
    const chunk = idList.slice(i, i + CHUNK_SIZE);
    const idString = chunk.join(',');
    
    // If a chunk fails, the interceptor will retry. If total failure, it throws error.
    const response = await api.get(`/character/${idString}`);
    const data = Array.isArray(response.data) ? response.data : [response.data];
    fetchedChars.push(...data);
  }

  return fetchedChars;
};

export const getLocationsByName = async (name) => {
  const response = await api.get('/location', { params: { name } });
  return response.data;
};

export default api;
