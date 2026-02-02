// Diccionarios para traducir los valores de la API

const statusMap = {
  Alive: 'Vivo',
  Dead: 'Muerto',
  unknown: 'Desconocido',
};

const genderMap = {
  Female: 'Femenino',
  Male: 'Masculino',
  Genderless: 'Sin género',
  unknown: 'Desconocido',
};

const speciesMap = {
  Human: 'Humano',
  Alien: 'Alienígena',
  Humanoid: 'Humanoide',
  Robot: 'Robot',
  'Mythological Creature': 'Criatura Mitológica',
  Animal: 'Animal',
  Cronenberg: 'Cronenberg',
  Disease: 'Enfermedad',
  Poopybutthole: 'Poopybutthole',
  unknown: 'Desconocido',
};

export const translateStatus = (status) => statusMap[status] || status;
export const translateGender = (gender) => genderMap[gender] || gender;
export const translateSpecies = (species) => speciesMap[species] || species;
export const translateType = (type) => type || 'Desconocido';
