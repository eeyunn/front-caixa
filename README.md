# Rick and Morty 🌌

Bienvenido al explorador definitivo del multiverso, desarrollado como prueba técnica moderna para demostrar prácticas avanzadas en el ecosistema React.

![Status](https://img.shields.io/badge/Status-Complete-success)
![React](https://img.shields.io/badge/React-18-blue)
![Vite](https://img.shields.io/badge/Vite-6.0-purple)
![React Query](https://img.shields.io/badge/TanStack%20Query-v5-ff4154)

## 🚀 Características Principales

Esta aplicación va más allá de un simple "fetch & display". Implementa una arquitectura robusta pensada para escalabilidad y mantenibilidad.

*   **Gestión de Estado de Servidor (Server State):** Implementado con **@tanstack/react-query**.
    *   Caché automática (Stale-while-revalidate).
    *   Paginación optimizada sin "flickering" (parpadeos) gracias a `placeholderData`.
    *   Gestión centralizada de errores y reintentos automáticos.
*   **Arquitectura Limpia:**
    *   **Separación de responsabilidades:** La capa de API (`/api`) es pura y sin estado. Los Hooks (`/hooks`) conectan la vista con los datos.
    *   **Custom Hooks:** Como `useLocalStorage` para persistencia de datos y `useCharacters` para lógica de negocio.
    *   **Alias de Rutas:** Importaciones limpias usando `@/` en lugar de `../../`.
*   **Gestión de Favoritos:**
    *   Sistema de favoritos persistente usando `localStorage`.
    *   Context API para distribución global del estado.
*   **UX/UI Moderna:**
    *   Diseño responsivo con CSS Modules.
    *   Animaciones fluidas con **Framer Motion**.
    *   Skeletons de carga para mejorar la percepción de velocidad.
    *   Feedback al usuario mediante **React Hot Toast**.
*   **Filtrado Avanzado:**
    *   Búsqueda híbrida: Filtra por nombre (API) y por ubicación (Cliente/Servidor).

## 🛠️ Stack Tecnológico

*   **Core:** React 18, React Router DOM v6.
*   **Build Tool:** Vite.
*   **Data Fetching:** TanStack Query (React Query) + Axios.
*   **Estilos:** CSS Modules (Scoping local) + Variables CSS globales.
*   **Testing:** Vitest + React Testing Library.
*   **Dev Experience:** ESLint, Prettier, React Query DevTools.

## 📦 Instalación y Ejecución

1.  **Clonar el repositorio:**
    ```bash
    git clone <url-del-repo>
    cd front-caixa
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Modo Desarrollo:**
    Arranca el servidor local con Hot Reload.
    ```bash
    npm run dev
    ```
    *Abre [http://localhost:5173](http://localhost:5173) en tu navegador.*

4.  **Tests:**
    *   Unitarios: `npm run test`

5.  **Producción:**
    Genera los archivos optimizados para despliegue.
    ```bash
    npm run build
    npm run preview
    ```

## 📂 Estructura del Proyecto

```
src/
├── api/             # Capa de comunicación HTTP (Axios)
├── assets/          # Imágenes y recursos estáticos
├── components/      # Componentes reutilizables (Card, Loader, ErrorBoundary)
├── context/         # Estado global (FavoritesContext)
├── hooks/           # Lógica encapsulada (useCharacters, useLocalStorage)
├── pages/           # Vistas principales (Home, Detail, Favorites)
├── utils/           # Constantes y funciones de ayuda
├── App.jsx          # Configuración de rutas
├── main.jsx         # Punto de entrada y Providers (QueryClient, Context)
└── index.css        # Estilos globales y reseteo
```

## ✨ Funcionalidades "Next Level"

1.  **React Query DevTools:** Incluido en modo desarrollo para inspeccionar la caché en tiempo real.
2.  **Manejo de Errores Global:** Configurado en el `QueryClient` para interceptar fallos de red y notificar al usuario automáticamente.
3.  **Persistencia Abstracta:** El hook `useLocalStorage` permite guardar cualquier dato de forma segura y tipada en el navegador.

## 🔮 Mejoras Futuras (Roadmap)

Si dispusiera de más tiempo para iterar sobre el producto, estas serían mis prioridades para elevar la calidad del proyecto:

### Mejoras Técnicas
1.  **Migración a TypeScript:** Para añadir seguridad de tipos estática, especialmente útil en las respuestas de la API y las props de componentes.
2.  **Testing E2E:** Implementar **Cypress** o **Playwright** para asegurar flujos críticos de usuario (navegación, filtros, favoritos).
3.  **Testing de Integración:** Añadir **MSW (Mock Service Worker)** para simular la API a nivel de red en los tests.
4.  **Virtualización:** Implementar `react-window` si las listas de residentes llegaran a crecer enormemente.
5.  **CI/CD:** Configurar GitHub Actions para ejecutar linter y tests automáticamente.

### Mejoras Funcionales
1.  **Filtros Combinados:** Permitir filtrar simultáneamente por estado (Vivo/Muerto), género y especie, aprovechando al máximo la API.
2.  **Modo Oscuro/Claro:** Implementar un `ThemeContext` para manejar preferencias de sistema.
3.  **Comparador de Personajes:** Una vista para comparar stats entre dos personajes favoritos.
4.  **Historial de Búsqueda:** Guardar las últimas búsquedas del usuario usando el hook `useLocalStorage`.
