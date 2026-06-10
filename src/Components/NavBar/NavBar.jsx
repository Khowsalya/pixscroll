// // npm install fuse.js  ← run this first
// import { useState, useRef, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Fuse from 'fuse.js';
// import { useSearch } from '../../context/SearchContext';
// import { fetchTopics } from '../../services/fetchTopics';

// // ─────────────────────────────────────────────────────────────
// // Static fallback keywords — used if Topics API fails
// // ─────────────────────────────────────────────────────────────
// const KEYWORDS = [
//   'abstract', 'animals', 'architecture', 'beach', 'black and white',
//   'buildings', 'city', 'dark', 'flowers', 'food', 'forest', 'landscape',
//   'mountains', 'nature', 'ocean', 'people', 'portrait', 'sky', 'space',
//   'street', 'sunset', 'travel', 'urban', 'vintage', 'wildlife',
//   'fashion', 'fitness', 'minimal', 'night', 'rain', 'snow',
//   'technology', 'texture', 'water', 'wedding',
// ];

// const FUSE_OPTIONS = {
//   threshold: 0.4,
//   distance: 100,
//   minMatchCharLength: 1,
//   keys: ['title'], // search inside { title, thumb } objects
// };

// // Color filter options
// const COLORS = [
//   'black_and_white', 'black', 'white', 'yellow', 'orange',
//   'red', 'purple', 'magenta', 'green', 'teal', 'blue',
// ];

// // ─────────────────────────────────────────────────────────────
// // localStorage helpers — past search history
// // ─────────────────────────────────────────────────────────────
// const HISTORY_KEY = 'unsplash_search_history';
// const MAX_HISTORY = 10;

// function getHistory() {
//   try {
//     return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
//   } catch {
//     return [];
//   }
// }

// function saveToHistory(query) {
//   const q = query.trim();
//   if (!q || q.length < 2) return;
//   const history = getHistory();
//   const updated = [q, ...history.filter(s => s !== q)].slice(0, MAX_HISTORY);
//   localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
// }

// function removeFromHistory(query) {
//   const updated = getHistory().filter(s => s !== query);
//   localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
// }

// function clearAllHistory() {
//   localStorage.removeItem(HISTORY_KEY);
// }

// // ─────────────────────────────────────────────────────────────
// // NavBar
// // ─────────────────────────────────────────────────────────────
// function NavBar() {
//   const navigate  = useNavigate();
//   const { searchQuery, setSearchQuery, filters, updateFilter, clearSearch } = useSearch();

//   const [inputVal, setInputVal]       = useState('');
//   const [suggestions, setSuggestions] = useState([]);
//   const [showDrop, setShowDrop]       = useState(false);
//   const [activeIdx, setActiveIdx]     = useState(-1);
//   const [topicsReady, setTopicsReady] = useState(false);

//   // Fuse instance lives in a ref so we can rebuild it after topics load
//   // Initial Fuse built from static KEYWORDS shaped as { title }
//   const fuseRef = useRef(
//     new Fuse(KEYWORDS.map(k => ({ title: k, thumb: null })), FUSE_OPTIONS)
//   );

//   const debounceRef = useRef(null);

//   // ── Fetch topics once on mount ──────────────────────────────
//   useEffect(() => {
//     fetchTopics().then(topics => {
//       if (topics.length > 0) {
//         // Merge API topics with static fallback — deduplicate by title
//         const staticShaped = KEYWORDS.map(k => ({ title: k, thumb: null }));
//         const merged = [
//           ...topics,
//           ...staticShaped.filter(
//             s => !topics.find(t => t.title === s.title)
//           ),
//         ];
//         // Rebuild Fuse with the full merged list
//         fuseRef.current = new Fuse(merged, FUSE_OPTIONS);
//         setTopicsReady(true);
//       }
//     });
//   }, []);

//   // ── Build merged suggestion list ─────────────────────────────
//   // Priority: 1. history  2. topic matches  3. raw fallback
//   function buildSuggestions(q) {
//     const trimmed = q.trim().toLowerCase();

//     if (!trimmed) {
//       // Empty input → show last 6 recent searches
//       const recent = getHistory()
//         .slice(0, 6)
//         .map(s => ({ text: s, type: 'history', thumb: null }));
//       setSuggestions(recent);
//       setShowDrop(recent.length > 0);
//       return;
//     }

//     // 1. History matches — exact substring, max 3
//     const historyMatches = getHistory()
//       .filter(s => s.toLowerCase().includes(trimmed))
//       .slice(0, 3)
//       .map(s => ({ text: s, type: 'history', thumb: null }));

//     // 2. Fuse.js topic matches — fuzzy, max 5, no duplicates with history
//     const fuseMatches = fuseRef.current
//       .search(trimmed)
//       .map(r => ({ text: r.item.title, thumb: r.item.thumb }))
//       .filter(k => !historyMatches.find(h => h.text === k.text))
//       .slice(0, 5)
//       .map(s => ({ ...s, type: 'keyword' }));

//     // 3. Raw fallback — only if nothing matched at all
//     const noMatches = historyMatches.length === 0 && fuseMatches.length === 0;
//     const rawFallback = noMatches
//       ? [{ text: trimmed, type: 'raw', thumb: null }]
//       : [];

//     const all = [...historyMatches, ...fuseMatches, ...rawFallback];
//     setSuggestions(all);
//     setShowDrop(all.length > 0);
//   }

//   // ── Input change ─────────────────────────────────────────────
//   function handleInput(e) {
//     const val = e.target.value;
//     setInputVal(val);
//     setActiveIdx(-1);
//     buildSuggestions(val);

//     // Debounce API search by 500ms
//     clearTimeout(debounceRef.current);
//     debounceRef.current = setTimeout(() => {
//       setSearchQuery(val.trim());
//     }, 500);
//   }

//   // ── Pick a suggestion ─────────────────────────────────────────
//   function pickSuggestion(text) {
//     setInputVal(text);
//     setSuggestions([]);
//     setShowDrop(false);
//     setActiveIdx(-1);
//     clearTimeout(debounceRef.current);
//     saveToHistory(text);
//     setSearchQuery(text);
//     navigate('/');
//   }

//   // ── Keyboard navigation ───────────────────────────────────────
//   function handleKeyDown(e) {
//     if (e.key === 'ArrowDown') {
//       e.preventDefault();
//       setActiveIdx(i => Math.min(i + 1, suggestions.length - 1));
//     } else if (e.key === 'ArrowUp') {
//       e.preventDefault();
//       setActiveIdx(i => Math.max(i - 1, -1));
//     } else if (e.key === 'Enter') {
//       e.preventDefault();
//       if (activeIdx >= 0 && suggestions[activeIdx]) {
//         pickSuggestion(suggestions[activeIdx].text);
//       } else {
//         const q = inputVal.trim();
//         if (q.length>=2) {
//           saveToHistory(q);
//           clearTimeout(debounceRef.current);
//           setSearchQuery(q);
//           setShowDrop(false);
//           navigate('/');
//         }
//       }
//       setActiveIdx(-1);
//     } else if (e.key === 'Escape') {
//       setShowDrop(false);
//       setActiveIdx(-1);
//     }
//   }

//   // ── Delete one history item ──────────────────────────────────
//   function handleDeleteHistory(e, text) {
//     e.stopPropagation();
//     e.preventDefault();
//     removeFromHistory(text);
//     buildSuggestions(inputVal);
//   }

//   // ── Clear all history ────────────────────────────────────────
//   function handleClearAllHistory(e) {
//     e.stopPropagation();
//     e.preventDefault();
//     clearAllHistory();
//     setSuggestions([]);
//     setShowDrop(false);
//   }

//   // ── Clear everything ─────────────────────────────────────────
//   function handleClear() {
//     setInputVal('');
//     setSuggestions([]);
//     setShowDrop(false);
//     setActiveIdx(-1);
//     clearTimeout(debounceRef.current);
//     clearSearch();
//   }

//   // ── Close on outside click ────────────────────────────────────
//   useEffect(() => {
//     function onOutsideClick(e) {
//       if (!e.target.closest('#search-wrapper')) {
//         setShowDrop(false);
//         setActiveIdx(-1);
//       }
//     }
//     document.addEventListener('mousedown', onOutsideClick);
//     return () => document.removeEventListener('mousedown', onOutsideClick);
//   }, []);

//   const isSearchActive     = searchQuery.trim().length > 0;
//   const hasHistoryItems    = suggestions.some(s => s.type === 'history');
//   const hasKeywordItems    = suggestions.some(s => s.type === 'keyword');
//   const showDivider        = hasHistoryItems && hasKeywordItems;

//   return (
//     <div>
//       {/* ── Main navbar row ───────────────────────────────────── */}
//       <div className="navbar bg-base-100 shadow-sm">
//         <div className="flex-1">
//           <a
//             onClick={() => navigate('/')}
//             className="btn btn-ghost text-xl cursor-pointer"
//           >
//             daisyUI
//           </a>
//         </div>

//         <div className="flex gap-2 items-center">

//           {/* ── Search wrapper ──────────────────────────────────── */}
//           <div id="search-wrapper" className="relative">

//             {/* Input + clear button */}
//             <div className="relative flex items-center">
//               <input
//                 type="text"
//                 value={inputVal}
//                 onChange={handleInput}
//                 onKeyDown={handleKeyDown}
//                 onFocus={() => buildSuggestions(inputVal)}
//                 placeholder="Search photos..."
//                 autoComplete="off"
//                 className="input input-bordered w-40 md:w-72 pr-8"
//               />
//               {inputVal && (
//                 <button
//                   onMouseDown={handleClear}
//                   className="absolute right-2 text-gray-400 hover:text-gray-600
//                     text-lg leading-none"
//                   type="button"
//                   aria-label="Clear search"
//                 >
//                   ×
//                 </button>
//               )}
//             </div>

//             {/* ── Dropdown ──────────────────────────────────────── */}
//             {showDrop && suggestions.length > 0 && (
//               <ul className="absolute top-full mt-1 left-0 right-0 z-50
//                 bg-base-100 border border-base-300 rounded-xl shadow-lg
//                 list-none p-1 max-h-80 overflow-y-auto"
//               >

//                 {/* Recent searches header */}
//                 {hasHistoryItems && (
//                   <li className="flex items-center justify-between px-3 py-1">
//                     <span className="text-xs text-gray-400 uppercase tracking-wider">
//                       Recent searches
//                     </span>
//                     <button
//                       onMouseDown={handleClearAllHistory}
//                       className="text-xs text-gray-400 hover:text-red-400
//                         transition-colors"
//                     >
//                       Clear all
//                     </button>
//                   </li>
//                 )}

//                 {suggestions.map((s, i) => (
//                   <li key={i}>

//                     {/* Divider + "Topics" label between history and keywords */}
//                     {showDivider &&
//                      s.type === 'keyword' &&
//                      suggestions[i - 1]?.type === 'history' && (
//                       <div className="border-t border-base-200 mt-1 pt-1 px-3 pb-0.5">
//                         <span className="text-xs text-gray-400 uppercase tracking-wider">
//                           {topicsReady ? 'Unsplash topics' : 'Suggestions'}
//                         </span>
//                       </div>
//                     )}

//                     <div
//                       onMouseDown={() => pickSuggestion(s.text)}
//                       className={`px-3 py-2 text-sm rounded-lg cursor-pointer
//                         flex items-center gap-2 transition-colors
//                         ${activeIdx === i ? 'bg-base-200' : 'hover:bg-base-200'}`}
//                     >
//                       {/* Thumbnail for topic items, icon for others */}
//                       {s.type === 'keyword' && s.thumb ? (
//                         <img
//                           src={s.thumb}
//                           alt={s.text}
//                           className="w-8 h-8 rounded object-cover shrink-0"
//                         />
//                       ) : (
//                         <span className="text-gray-400 text-xs shrink-0 w-8
//                           flex items-center justify-center">
//                           {s.type === 'history' ? '🕐'
//                             : s.type === 'raw' ? '🔎'
//                             : '🔍'}
//                         </span>
//                       )}

//                       <span className="flex-1">{s.text}</span>

//                       {/* × delete — history items only */}
//                       {s.type === 'history' && (
//                         <button
//                           onMouseDown={(e) => handleDeleteHistory(e, s.text)}
//                           className="text-gray-300 hover:text-red-400 text-base
//                             leading-none shrink-0 px-1 transition-colors"
//                           aria-label={`Remove "${s.text}" from history`}
//                         >
//                           ×
//                         </button>
//                       )}

//                       {/* "Search" label for raw fallback */}
//                       {s.type === 'raw' && (
//                         <span className="text-xs text-gray-400">
//                           Search
//                         </span>
//                       )}
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>

//           {/* ── Avatar dropdown (unchanged) ─────────────────────── */}
//           <div className="dropdown dropdown-end">
//             <div tabIndex={0} role="button"
//               className="btn btn-ghost btn-circle avatar">
//               <div className="w-10 rounded-full">
//                 <img
//                   alt="avatar"
//                   src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
//                 />
//               </div>
//             </div>
//             <ul
//               tabIndex="-1"
//               className="menu menu-sm dropdown-content bg-base-100
//                 rounded-box z-50 mt-3 w-52 p-2 shadow"
//             >
//               <li>
//                 <a className="justify-between">
//                   Profile <span className="badge">New</span>
//                 </a>
//               </li>
//               <li><a>Settings</a></li>
//               <li><a>Logout</a></li>
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* ── Filter bar — only when search is active ───────────── */}
//       {isSearchActive && (
//         <div className="flex gap-2 px-4 py-2 flex-wrap bg-base-100
//           border-t border-base-200 shadow-sm items-center"
//         >
//           {/* Color */}
//           <select
//             className="select select-sm select-bordered"
//             value={filters.color}
//             onChange={e => updateFilter('color', e.target.value)}
//           >
//             <option value="">Any color</option>
//             {COLORS.map(c => (
//               <option key={c} value={c}>{c.replace(/_/g, ' ')}</option>
//             ))}
//           </select>

//           {/* Orientation */}
//           <select
//             className="select select-sm select-bordered"
//             value={filters.orientation}
//             onChange={e => updateFilter('orientation', e.target.value)}
//           >
//             <option value="">Any orientation</option>
//             <option value="landscape">Landscape</option>
//             <option value="portrait">Portrait</option>
//             <option value="squarish">Square</option>
//           </select>

//           {/* Sort */}
//           <select
//             className="select select-sm select-bordered"
//             value={filters.order_by}
//             onChange={e => updateFilter('order_by', e.target.value)}
//           >
//             <option value="relevant">Most relevant</option>
//             <option value="latest">Latest</option>
//           </select>

//           {/* Safety */}
//           <select
//             className="select select-sm select-bordered"
//             value={filters.content_filter}
//             onChange={e => updateFilter('content_filter', e.target.value)}
//           >
//             <option value="low">Standard</option>
//             <option value="high">Safe mode</option>
//           </select>

//           {/* Active query + clear */}
//           <div className="flex items-center gap-2 ml-auto">
//             <span className="text-sm text-gray-500">
//               "<strong>{searchQuery}</strong>"
//             </span>
//             <button
//               onClick={handleClear}
//               className="btn btn-xs btn-ghost text-gray-400"
//             >
//               Clear ×
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default NavBar;

// orchestration component:
// Components/NavBar/NavBar.jsx — Orchestrator
// Responsibility: own all state + handlers; delegate every pixel to ui.jsx.

import { useState, useRef, useEffect }                    from "react";
import { useNavigate }                                    from "react-router-dom";
import Fuse                                               from "fuse.js";
import { useSearch }                                      from "../../context/SearchContext";
import { fetchTopics }                                    from "../../services/fetchTopics";
import {
  KEYWORDS, FUSE_OPTIONS,
  getHistory, saveToHistory, removeFromHistory, clearAllHistory,
  buildSuggestions, mergeTopicsWithKeywords,
} from "./function";
import { navStyles }                                      from "./style";
import { SearchInput, SuggestionDropdown, AvatarMenu, FilterBar } from "./ui";

function NavBar() {
  const navigate  = useNavigate();
  const { searchQuery, setSearchQuery, filters, updateFilter, clearSearch } = useSearch();

  const [inputVal,    setInputVal]    = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDrop,    setShowDrop]    = useState(false);
  const [activeIdx,   setActiveIdx]   = useState(-1);
  const [topicsReady, setTopicsReady] = useState(false);

  // Fuse instance lives in a ref so we can rebuild after topics load
  const fuseRef     = useRef(new Fuse(KEYWORDS.map((k) => ({ title: k, thumb: null })), FUSE_OPTIONS));
  const debounceRef = useRef(null);

  // ── Load Unsplash topics once on mount ────────────────────
  useEffect(() => {
    fetchTopics().then((topics) => {
      if (topics.length > 0) {
        fuseRef.current = new Fuse(mergeTopicsWithKeywords(topics), FUSE_OPTIONS);
        setTopicsReady(true);
      }
    });
  }, []);

  // ── Close dropdown on outside click ──────────────────────
  useEffect(() => {
    function onOutsideClick(e) {
      if (!e.target.closest("#search-wrapper")) {
        setShowDrop(false);
        setActiveIdx(-1);
      }
    }
    document.addEventListener("mousedown", onOutsideClick);
    return () => document.removeEventListener("mousedown", onOutsideClick);
  }, []);

  // ── Shared: recompute suggestions + update state ──────────
  function refreshSuggestions(val) {
    const list = buildSuggestions(val, fuseRef.current);
    setSuggestions(list);
    setShowDrop(list.length > 0);
  } 

  // ── Input change ──────────────────────────────────────────
  function handleInput(e) {
    const val = e.target.value;
    setInputVal(val);
    setActiveIdx(-1);
    refreshSuggestions(val);
    // Debounce context update by 500 ms
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setSearchQuery(val.trim()), 500);
  }

  // ── Pick a suggestion ─────────────────────────────────────
  function pickSuggestion(text) {
    setInputVal(text);
    setSuggestions([]);
    setShowDrop(false);
    setActiveIdx(-1);
    clearTimeout(debounceRef.current);
    saveToHistory(text);
    setSearchQuery(text);
    navigate("/");
  }

  // ── Keyboard navigation ───────────────────────────────────
  function handleKeyDown(e) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIdx >= 0 && suggestions[activeIdx]) {
        pickSuggestion(suggestions[activeIdx].text);
      } else {
        const q = inputVal.trim();
        if (q.length >= 2) {
          saveToHistory(q);
          clearTimeout(debounceRef.current);
          setSearchQuery(q);
          setShowDrop(false);
          navigate("/");
        }
      }
      setActiveIdx(-1);
    } else if (e.key === "Escape") {
      setShowDrop(false);
      setActiveIdx(-1);
    }
  }

  // ── Delete one history item ───────────────────────────────
  function handleDeleteHistory(e, text) {
    e.stopPropagation();
    e.preventDefault();
    removeFromHistory(text);
    refreshSuggestions(inputVal);
  }

  // ── Clear all history ─────────────────────────────────────
  function handleClearAllHistory(e) {
    e.stopPropagation();
    e.preventDefault();
    clearAllHistory();
    setSuggestions([]);
    setShowDrop(false);
  }

  // ── Clear everything ──────────────────────────────────────
  function handleClear() {
    setInputVal("");
    setSuggestions([]);
    setShowDrop(false);
    setActiveIdx(-1);
    clearTimeout(debounceRef.current);
    clearSearch();
  }

  const isSearchActive = searchQuery.trim().length > 0;

  return (
    <div>
      {/* ── Main navbar row ─────────────────────────────────── */}
      <div className={navStyles.outerWrapper}>
        <div className="flex-1">
          <a onClick={() => navigate("/")} className={navStyles.logoBtn}>
            daisyUI
          </a>
        </div>

        <div className={navStyles.rightGroup}>
          {/* Search wrapper — id needed for outside-click detection */}
          <div id="search-wrapper" className={navStyles.searchWrapper}>
            <SearchInput
              value={inputVal}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              onFocus={() => refreshSuggestions(inputVal)}
              onClear={handleClear}
            />

            {showDrop && (
              <SuggestionDropdown
                suggestions={suggestions}
                activeIdx={activeIdx}
                topicsReady={topicsReady}
                onPick={pickSuggestion}
                onDeleteHistory={handleDeleteHistory}
                onClearAllHistory={handleClearAllHistory}
              />
            )}
          </div>

          <AvatarMenu />
        </div>
      </div>

      {/* ── Filter bar — only while a search is active ────── */}
      {isSearchActive && (
        <FilterBar
          filters={filters}
          searchQuery={searchQuery}
          onFilterChange={updateFilter}
          onClear={handleClear}
        />
      )}
    </div>
  );
}

export default NavBar;