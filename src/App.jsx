import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { FavoritesProvider } from './context/FavoritesContext';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const CharacterDetail = lazy(() => import('./pages/CharacterDetail'));
const Favorites = lazy(() => import('./pages/Favorites'));

const LoadingFallback = () => (
  <div style={{ padding: '2rem', textAlign: 'center', color: '#718096' }}>
    Cargando portal...
  </div>
);

function App() {
  return (
    <FavoritesProvider>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="character/:id" element={<CharacterDetail />} />
          </Route>
        </Routes>
      </Suspense>
    </FavoritesProvider>
  );
}

export default App;
