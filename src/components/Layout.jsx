import { NavLink, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import styles from './Layout.module.css';

const Layout = () => {
  return (
    <div className={styles.appWrapper}>
      <Toaster 
        position="bottom-center"
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
            fontSize: '0.9rem',
          },
          success: {
            iconTheme: {
              primary: '#00b5cc',
              secondary: '#fff',
            },
          },
        }}
      />
      <nav className={styles.navbar}>
        <div className={styles.navContainer}>
          <NavLink to="/" className={styles.logo}>
            Rick & Morty <span className={styles.highlight}>Hub</span>
          </NavLink>
          <div className={styles.navLinks}>
            <NavLink 
              to="/" 
              className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
              end
            >
              Personajes
            </NavLink>
            <NavLink 
              to="/favorites" 
              className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
            >
              Mis Favoritos
            </NavLink>
          </div>
        </div>
      </nav>
      
      <main className={styles.mainContent}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <p>Prueba Técnica CaixaBank Tech {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default Layout;
