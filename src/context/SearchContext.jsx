import { createContext, useContext, useState, useRef, useEffect} from 'react';

// 1. Create the context
const SearchContext = createContext(null);

// 2. Provider — wrap your app with this
export function SearchProvider({ children }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        color: '',
        orientation: '',
        order_by: 'relevant',
        content_filter: 'low',
    });
 // Feed uses debouncedFilters in its queryKey, not raw filters
  // This means changing color + orientation quickly = only 1 API call

  const [debouncedFilters, setDebouncedFilters] = useState(filters);
  const filterTimerRef = useRef(null);


  useEffect(() => {
    // Every time filters change, wait 300ms before updating debouncedFilters
    clearTimeout(filterTimerRef.current);
    filterTimerRef.current = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 300);
    return () => clearTimeout(filterTimerRef.current);
  }, [filters]);


    // Helper to update a single filter key
    function updateFilter(key, value) {
        setFilters(prev => ({ ...prev, [key]: value }));
    }

    // Clear search and reset filters
    function clearSearch() {
        setSearchQuery('');
        setFilters({
            color: '',
            orientation: '',
            order_by: 'relevant',
            content_filter: 'low',
        });

        setDebouncedFilters({
      color: '',
      orientation: '',
      order_by: 'relevant',
      content_filter: 'low',
    });
    }

    return (
        <SearchContext.Provider value={{
            searchQuery,
            setSearchQuery,
            filters, // NavBar uses this for the select values (instant)
            debouncedFilters, // Feed uses this for queryKey (debounced)
            updateFilter,
            clearSearch,
        }}>
            {children}
        </SearchContext.Provider>
    );
}

// 3. Custom hook — import and call this in NavBar and Feed
export function useSearch() {
    const ctx = useContext(SearchContext);
    if (!ctx) throw new Error('useSearch must be used inside <SearchProvider>');
    return ctx;
}