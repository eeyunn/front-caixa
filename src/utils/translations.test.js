import { describe, it, expect } from 'vitest';
import { translateStatus, translateSpecies, translateGender } from './translations';

describe('Funciones de Traducción', () => {
  
  describe('translateStatus', () => {
    it('debería traducir "Alive" a "Vivo"', () => {
      expect(translateStatus('Alive')).toBe('Vivo');
    });

    it('debería traducir "Dead" a "Muerto"', () => {
      expect(translateStatus('Dead')).toBe('Muerto');
    });

    it('debería devolver el valor original si no existe en el mapa', () => {
      expect(translateStatus('Complicated')).toBe('Complicated');
    });
  });

  describe('translateSpecies', () => {
    it('debería traducir "Human" a "Humano"', () => {
      expect(translateSpecies('Human')).toBe('Humano');
    });
    
    it('debería traducir "Alien" a "Alienígena"', () => {
      expect(translateSpecies('Alien')).toBe('Alienígena');
    });
  });

  describe('translateGender', () => {
    it('debería traducir "Female" a "Femenino"', () => {
      expect(translateGender('Female')).toBe('Femenino');
    });
  });

});
