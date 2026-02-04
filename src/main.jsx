import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider, QueryCache } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import toast from 'react-hot-toast'
import ErrorBoundary from '@/components/ErrorBoundary'
import './index.css'
import App from './App.jsx'

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      // Global error handler for queries
      console.error('Global Query Error:', error);
      toast.error(`Error de conexión: ${error.message}`);
    }
  }),
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1, 
      refetchOnWindowFocus: false, // Better DX for development
    },
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
          <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>,
)
