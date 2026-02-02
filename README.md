# Rick & Morty App - Frontend Technical Test

Aplicación de exploración de personajes utilizando la API de Rick and Morty, desarrollada con React moderno, optimizada para rendimiento y completamente localizada al español.

![Unit Tests](https://img.shields.io/badge/tests-passing-brightgreen)
![E2E Tests](https://img.shields.io/badge/cypress-passing-success)
![React](https://img.shields.io/badge/react-v19.0.0-blue)
![Vite](https://img.shields.io/badge/vite-v6.0.0-purple)

## 🚀 Características Destacadas

Esta aplicación va más allá de un simple consumo de API, implementando patrones de arquitectura escalables y UX avanzada:

- **Arquitectura Modular y SOLID**: Separación clara de responsabilidades (Servicios, Contexto, Hooks, UI).
- **Gestión de Estado**: Uso de `Context API` para funcionalidades globales como "Favoritos" con persistencia en LocalStorage.
- **Optimización de Rendimiento**:
  - `Lazy Loading` en rutas para reducir el bundle inicial.
  - Carga diferida de imágenes.
- **Experiencia de Usuario (UX)**:
  - **Localización Completa (i18n)**: Traducción no solo de la UI, sino de los **datos de la API** (Status: *Alive* -> *Vivo*).
  - **Feedback Visual**: Skeletons durante la carga y notificaciones (Toasts) para acciones del usuario.
  - **Animaciones**: Micro-interacciones fluidas utilizando `Framer Motion`.
  - **Manejo de Errores**: `Error Boundary` global para prevenir pantallas blancas en fallos críticos.
- **Calidad de Código**: 
  - Tests **Unitarios** y de **Integración** con Vitest y React Testing Library.
  - Tests **End-to-End (E2E)** con Cypress para validar flujos críticos de usuario.

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

   # End-to-End (Cypress)
   npm run test:e2e
   ```

4. **Construir para Producción:**
   ```bash
   npm run build
   ```

## ✅ Decisiones de Diseño

- **¿Por qué CSS Modules?**: Para demostrar dominio de CSS nativo y evitar el peso extra de librerías de componentes (MUI/Bootstrap) que a menudo dificultan la personalización, manteniendo los estilos encapsulados.
- **¿Por qué Context vs Redux?**: Para el alcance de esta aplicación (gestionar favoritos), Context API junto con `useReducer` o estados simples es suficiente y evita la complejidad innecesaria de Redux.
- **Traducción de Datos**: Se implementó una capa de utilidad (`translations.js`) para mapear los valores en inglés de la API a español, mejorando la experiencia del usuario final hispanohablante.
