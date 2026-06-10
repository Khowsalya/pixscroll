import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QueryClientProvider,QueryClient } from '@tanstack/react-query'
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import { SearchProvider } from './context/SearchContext'

// React Query cache limits
// staleTime: data stays fresh for 5 mins (no background refetch)
// gcTime:    unused cache cleared after 10 mins (saves memory)

const queryClient = new QueryClient({defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime:    1000 * 60 * 10,
    }
  }
});

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
         {/* SearchProvider must be inside BrowserRouter so NavBar can use useNavigate */}
        <SearchProvider>
    <App />
    </SearchProvider>
    </QueryClientProvider>
    </BrowserRouter>
  
)
