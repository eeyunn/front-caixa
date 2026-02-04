import PropTypes from 'prop-types';
import styles from './FilterBar.module.css';

const FilterBar = ({ filters, onFilterChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.group}>
        <label htmlFor="nameFilter" className={styles.label}>Nombre</label>
        <input
          id="nameFilter"
          type="text"
          name="name"
          placeholder="Buscar por nombre..."
          value={filters.name || ''}
          onChange={handleChange}
          className={styles.input}
        />
      </div>
    
       <div className={styles.group}>
        <label htmlFor="speciesFilter" className={styles.label}>Especie</label>
        <input
          id="speciesFilter"
          type="text"
          name="species"
          placeholder="Especie (ej. Alien)..."
          value={filters.species || ''}
          onChange={handleChange}
          className={styles.input}
        />
      </div>

      <div className={styles.group}>
        <label htmlFor="locationFilter" className={styles.label}>Localización</label>
        <input
          id="locationFilter"
          type="text"
          name="location"
          placeholder="Planeta (ej. Earth)..."
          value={filters.location || ''}
          onChange={handleChange}
          className={styles.input}
        />
      </div>
    </div>
  );
};

FilterBar.propTypes = {
  filters: PropTypes.object.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default FilterBar;
