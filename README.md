# Rick & Morty App - Frontend Technical Test

Aplicación de exploración de personajes utilizando la API de Rick and Morty, desarrollada con React moderno, optimizada para rendimiento y completamente localizada al español.

![Unit Tests](https://img.shields.io/badge/tests-passing-brightgreen)
![React](https://img.shields.io/badge/react-v19.0.0-blue)
![Vite](https://img.shields.io/badge/vite-v6.0.0-purple)

## 🚀 Características Destacadas

Esta aplicación va más allá de un simple consumo de API, implementando patrones de arquitectura escalables y UX avanzada:

- **Arquitectura Modular y SOLID**: Separación clara de responsabilidades (Servicios, Contexto, Hooks, UI).
- **Gestión de Estado**: Uso de `Context API` para funcionalidades globales como "Favoritos" con persistencia en LocalStorage.
- **Búsqueda Avanzada**: Filtrado cruzado que permite buscar personajes por **Localización** (resolviendo limitaciones de la API REST original), además de Nombre y Especie.
- **Optimización de Rendimiento**:
  - **Smart Caching Layer**: Caché en memoria personalizada y sistema de reintentos automáticos para mitigar el *Rate Limiting* de la API pública.
  - **Optimizaciones CSS**: Animaciones nativas en listas extensas para evitar overhead de JS (reemplazando librerías pesadas en renderizados masivos).
  - `Lazy Loading` en imágenes con estrategia de *backoff* para reintentos y *fallbacks* visuales robustos.
- **Experiencia de Usuario (UX)**:
  - **Propagación de Estado (Deep Linking)**: Sincronización bidireccional URL-Estado perfecta. Permite compartir búsquedas complejas y mantiene la navegación coherente al usar los botones de "Atrás/Adelante" del navegador.
  - **Feedback Visual**: Skeletons durante la carga y notificaciones (Toasts) para acciones del usuario.
  - **Manejo de Errores**: `Error Boundary` global para prevenir pantallas blancas en fallos críticos.
- **Calidad de Código**: 
  - Tests **Unitarios** y de **Integración** con Vitest y React Testing Library.

## 🛠️ Stack Tecnológico

- **Core**: React 19, Vite.
- **Routing**: React Router DOM v7.
- **Estilos**: CSS Modules (Scoped CSS) para evitar conflictos y mantener el código limpio.
- **Animaciones**: Framer Motion.
- **Utilidades**: Axios (HTTP), Proptypes (Validación), React Hot Toast.
- **Testing**: 
  - **Unit**: Vitest, JSDOM, React Testing Library.
  - **E2E**: Cypress, Start-Server-And-Test.
## 📂 Estructura del Proyecto

```bash
src/
├── api/          # Capa de servicio para llamadas a la API (Axios)
├── components/   # Componentes reutilizables (Card, Skeletons, ErrorBoundary)
├── context/      # Estado global (FavoritesContext)
├── hooks/        # Custom Hooks para lógica de negocio (useCharacters, etc.)
├── pages/        # Vistas principales (Home, Detail, Favorites)
├── utils/        # Funciones auxiliares y diccionarios de traducción
└── main.jsx      # Punto de entrada con Providers y Router
```

## 💻 Instalación y Ejecución

1. **Clonar el repositorio e instalar dependencias:**
   ```bash
   git clone <repo-url>
   cd front-caixa
   npm install
   ```

2. **Modo Desarrollo:**
   ```bash
   npm run dev
   ```

3. **Ejecutar Tests:**
   ```bash
   # Unitarios e Integración
   npm run test


4. **Construir para Producción:**
   ```bash
   npm run build
   ```

## ✅ Decisiones de Diseño

- **¿Por qué CSS Modules?**: Para demostrar dominio de CSS nativo y evitar el peso extra de librerías de componentes (MUI/Bootstrap) que a menudo dificultan la personalización, manteniendo los estilos encapsulados.
- **¿Por qué Context vs Redux?**: Para el alcance de esta aplicación (gestionar favoritos), Context API junto con `useState` es suficiente y evita la complejidad innecesaria de Redux.

