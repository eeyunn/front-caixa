import { useState, useEffect } from 'react';

/**
 * Hook personalizado para persistir estado en localStorage
 * @param {string} key - Clave para guardar en localStorage
 * @param {any} initialValue - Valor inicial si no hay nada en localStorage
 * @returns [storedValue, setValue]
 */
export function useLocalStorage(key, initialValue) {
  // 1. Inicializar el estado (lazy initialization)
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // 2. Envolver el setter para actualizar estado y localStorage a la vez
  const setValue = (value) => {
    try {
      // Permitir que value sea una función (como useState)
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  // 3. Sincronizar cambios externos (opcional, por si se modifica localStorage en otra pestaña)
  // Nota: Para una implementación simple dentro de la misma app, el setValue es suficiente.

  return [storedValue, setValue];
}
