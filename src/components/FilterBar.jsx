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
        <input
          type="text"
          name="name"
          placeholder="Buscar por nombre..."
          value={filters.name || ''}
          onChange={handleChange}
          className={styles.input}
        />
      </div>
      
      <div className={styles.group}>
        <select 
          name="status" 
          value={filters.status || ''} 
          onChange={handleChange}
          className={styles.select}
        >
          <option value="">Estado (Todos)</option>
          <option value="alive">Vivo</option>
          <option value="dead">Muerto</option>
          <option value="unknown">Desconocido</option>
        </select>
      </div>

      <div className={styles.group}>
        <select 
          name="gender" 
          value={filters.gender || ''} 
          onChange={handleChange}
          className={styles.select}
        >
          <option value="">Género (Todos)</option>
          <option value="female">Mujer</option>
          <option value="male">Hombre</option>
          <option value="genderless">Sin género</option>
          <option value="unknown">Desconocido</option>
        </select>
      </div>
    
       <div className={styles.group}>
        <input
          type="text"
          name="species"
          placeholder="Especie (ej. Alien)..."
          value={filters.species || ''}
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
