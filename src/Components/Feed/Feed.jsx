// import { fetchImages } from "../../services/fetchImages";
// // import { useQuery } from "@tanstack/react-query";
// import { useInfiniteQuery } from "@tanstack/react-query";
// import { fetchSearchImages }  from '../../services/fetchSearchImages';
// import { useEffect, useState, useRef } from "react";
// import { useSearch }          from '../../context/SearchContext';
// import {useNavigate} from 'react-router-dom';
// import PageLoader from "../PageLoader/PageLoader";
// // import { Button } from "../Button/Button";
// // import { FixedSizeList as List } from "react-window";
// import { Virtuoso } from "react-virtuoso";

// function Feed() {
  
//   // const [page, setPage] = useState(1);

//   // const { data, isLoading } = useQuery({
//   //   queryKey: ["images", page],
//   //   queryFn: () => fetchImages(page),
//   //   retry: 2,
//   //   retryDelay: 1000,
//   // });
//   let navigate = useNavigate();

//     // Read search state from context
//   const { searchQuery, debouncedFilters } = useSearch();


// // True when user has typed a search — drives everything below
//   const isSearchMode = searchQuery.trim().length > 0;

//   const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
//     // KEY CONCEPT: queryKey changes → React Query auto-resets + refetches
//     // Browse mode:  ['images']
//     // Search mode:  ['search', 'mountains', { color:'blue', ... }]
//     { 
//       queryKey: isSearchMode
//       ? ['search', searchQuery, debouncedFilters]
//       : ['images'],
      
      
//        // Switch fetch function based on mode
//     queryFn: ({ pageParam = 1, signal }) =>
//       isSearchMode
//         ? fetchSearchImages(searchQuery, pageParam, debouncedFilters, signal)
//         : fetchImages(pageParam, signal),

//       initialPageParam: 1,
//       getNextPageParam: (lastPage, allPages) => {
//         return lastPage.length == 0 ? undefined : allPages.length + 1;
//       },
//       retry: 2,
//       retryDelay: 1000,
//       staleTime: 1000 * 60 * 5,
//       gcTime: 1000 * 60 * 10,
//     }
//   )

//   // const sentinel = useRef(null)
//   const images = data?.pages.flat() ?? [];

//   // useEffect(()=>{
//   //   const observer= new IntersectionObserver ((entries)=>{
//   //     entries.forEach((entry)=>{
//   //       if(entry.isIntersecting && hasNextPage && !isFetchingNextPage){
//   //         fetchNextPage()
//   //       };
//   //     });

//   //   });
//   //   if(sentinel.current){
//   //     observer.observe(sentinel.current)
//   //   }
//   //   return ()=>observer.disconnect()
//   // },[hasNextPage, isFetchingNextPage, fetchNextPage])

//   // useEffect(() => {
//   //   if (images) {
//   //     console.log(images);
//   //   }
//   // }, [images]);

//   if (isLoading) {
//     return <PageLoader />;
//   }

//    // ── Empty search results ──────────────────────────────────────
//   if (isSearchMode && images.length === 0 && !isLoading) {
//     return (
//       <div className="flex flex-col items-center justify-center mt-20 gap-2 text-gray-400">
//         <span className="text-4xl">🔍</span>
//         <p className="text-lg font-medium">No photos found for "{searchQuery}"</p>
//         <p className="text-sm">Try a different keyword or remove filters</p>
//       </div>
//     );
//   }


//  // ── Click photo → detail page ────────────────────────────────
//   function handleOnClick(id){
//     console.log(id);
//     navigate(`/photos`,{state:{id}})
//   }
    


//   return (
//     <>

//      {/* Search result count — only in search mode */}
//       {isSearchMode && (
//         <p className="text-center text-sm text-gray-400 py-2">
//           Showing results for <strong>"{searchQuery}"</strong>
//         </p>
//       )}


//       <Virtuoso
//         // style={{ height: "600px" }}
//         useWindowScroll
//         data={images}
//         endReached={() => {
//           if (hasNextPage && !isFetchingNextPage) {
//             fetchNextPage();
//           }
//         }}
//         itemContent={(index, img) => (
//           <div  className="flex justify-center py-3">
//             <div onClick={()=>handleOnClick(img.id)} className="w-[300px] rounded-[25px] overflow-hidden shadow-md bg-white cursor-pointer hover:shadow-xl transition-shadow">

//               <img
//                 src={img.urls.small}
//                 alt={img.alt_description || "image"}
//                 loading="lazy"
//                 className="w-full h-[150px] object-cover"
//               />

//               <div className="p-3 flex flex-col gap-1 text-left">
//                 <p className="text-sm font-semibold line-clamp-2">
//                   {img.alt_description}
//                 </p>

//                 <p className="text-xs text-gray-600">
//                   {img.user.username}
//                 </p>

//                 <p className="text-xs text-gray-500 line-clamp-2">
//                   {img.user.bio}
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}
//       />


//       {isFetchingNextPage && (
//         <p className="text-center mt-4">Loading more...</p>
//       )}







//       {/* {isFetchingNextPage && (
//       <p className="text-center mt-4">Loading more...</p>
//     )} */}

//       {!hasNextPage && images.length > 0 && (
//         <p className="text-center mt-4 text-gray-500">
//           No more images!
//         </p>
//       )}

//       {/* Buttons centered */}
//       {/* <div className="flex justify-center gap-4 mt-6">
//         <Button
//           disabled={page === 1}
//           buttonType="button"
//           onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
//           buttonText="← Prev"
//         />

//         <Button
//           buttonType="button"
//           onClick={() => setPage((prev) => prev + 1)}
//           buttonText="Next →"
//         />
//       </div> */}
//     </>
//   );
// }

// export default Feed;



// orchestration component:
// Components/Feed/Feed.jsx — Orchestrator
// Wires hook + helpers + UI. Owns navigation handler only.

import { useNavigate }                            from "react-router-dom";
import { Virtuoso }                               from "react-virtuoso";
import { useSearch }                              from "../../context/SearchContext";
import { useImageFeed }                           from "../../hooks/useImageFeed";
// import { flattenPages }                           from "./Feedfunction";
import { FeedStyles }                             from "./Feedstyles";
import { EmptySearchState, SearchBanner, PhotoCard } from "./Feedui";
import PageLoader                                 from "../PageLoader/PageLoader";

function Feed() {
  const navigate = useNavigate();
  const { searchQuery, debouncedFilters } = useSearch();

  // 1. Data
  const { images, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, isSearchMode } =
    useImageFeed(searchQuery, debouncedFilters);

  // const images = flattenPages(data);

  // 2. Guard states
  if (isLoading) return <PageLoader />;
  if (isSearchMode && images.length === 0) {
    return <EmptySearchState searchQuery={searchQuery} />;
  }

  // 3. Handler
  function handleCardClick(id) {
    navigate("/photos", { state: { id } });
  }

  // 4. Render
  return (
    <>
      {isSearchMode && <SearchBanner searchQuery={searchQuery} />}

      <Virtuoso
        useWindowScroll
        data={images}
        endReached={() => {
          if (hasNextPage && !isFetchingNextPage) fetchNextPage();
        }}
        itemContent={(_index, img) => (
          <PhotoCard img={img} onClick={() => handleCardClick(img.id)} />
        )}
      />

      {isFetchingNextPage && (
        <p className={FeedStyles.loadingMore}>Loading more...</p>
      )}

      {!hasNextPage && images.length > 0 && (
        <p className={FeedStyles.noMore}>No more images!</p>
      )}
    </>
  );
}

export default Feed;