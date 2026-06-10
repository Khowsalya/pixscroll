
    // import {useQuery} from "@tanstack/react-query";
    // import { fetchAnImage } from "../../services/fetchAnImage";
    // import { useEffect,useState } from "react";
    // import parse from 'html-react-parser';
    // import PageLoader from "../PageLoader/PageLoader";
    // import Button from "../Button/Button";
    // import { useNavigate } from "react-router-dom";


    // function IndividualFeed({id}){
        
    //     console.log("photo id",id);
    //     const navigate = useNavigate();
    //     const [isRedirecting, setIsRedirecting] = useState(false);
    //     function handleViewStats(){
    //       setIsRedirecting(true);

    //       setTimeout(()=>{
    //         navigate(`/photos/statistics`,{state:{id}})
    //       },300)
    //     }
    //     const {data, isLoading, isError} = useQuery({
    //         queryKey: ["photos",id],
    //         queryFn:()=>fetchAnImage(id),
    //         retry: 2,
    //         retryDelay: 1000,
    //         staleTime: 1000 * 60 * 5,
    //         gcTime: 1000 * 60 * 10,
    //     });
    //     useEffect(()=>{
    //         if(data){
    //             console.log("data",data);
    //         }
    //     }, [data]);

    //     if (isLoading) return <PageLoader />;
    // if (!data) return <span className="flex justify-center mt-10">No data found</span>;
    // if (isError) return <span className="flex justify-center mt-10">Error fetching data</span>;

    // return (
    //     <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] gap-4 p-4 md:h-screen md:overflow-hidden bg-gray-50">

    //   {/* Left column — photographer info */}
    //   <div className="order-2 md:order-1 bg-white rounded-[25px] border border-gray-100 p-5 flex flex-col gap-3 md:h-screen md:overflow-y-auto">
    //     <p className="text-[11px] uppercase tracking-widest text-gray-400">Photographer</p>

    //     <div className="flex items-center gap-3">
    //       <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-sm font-medium text-teal-700 shrink-0">
    //         {data?.user?.username?.[0]?.toUpperCase()}
    //       </div>
    //       <div>
    //         <p className="text-sm font-medium text-gray-900">{data?.user?.name}</p>
    //         <p className="text-xs text-gray-500">@{data?.user?.username}</p>
    //       </div>
    //     </div>

    //     <div className="border-t border-gray-100 pt-3 flex flex-col gap-3">
    //       <div>
    //         <p className="text-[11px] uppercase tracking-wide text-gray-400 mb-0.5">Instagram</p>
    //         <p className="text-sm font-medium text-gray-800">
    //           {data?.user?.instagram_username
    //             ? `@${data.user.instagram_username}`
    //             : "Not available"}
    //         </p>
    //       </div>
    //       <div>
    //         <p className="text-[11px] uppercase tracking-wide text-gray-400 mb-0.5">Location</p>
    //         <p className="text-sm font-medium text-gray-800">
    //           {data?.location?.city ?? "Unknown"}
    //         </p>
    //       </div>
    //       <div>
    //         <p className="text-[11px] uppercase tracking-wide text-gray-400 mb-0.5">Country</p>
    //         <p className="text-sm font-medium text-gray-800">
    //           {data?.location?.country ?? "Unknown"}
    //         </p>
    //       </div>
    //       <div>
    //         <p className="text-[11px] uppercase tracking-wide text-gray-400 mb-0.5">Bio</p>
    //         <p className="text-sm text-gray-600 leading-relaxed">
    //           {data?.user?.bio ?? "No bio available"}
    //         </p>
    //       </div>
    //       <div>
    //         <p className="text-[11px] uppercase tracking-wide text-gray-400 mb-0.5">Total photos</p>
    //         <p className="text-sm font-medium text-gray-800">
    //           {data?.user?.total_photos ?? "—"}
    //         </p>
    //       </div>
    //       <div>
    //         <p className="text-[11px] uppercase tracking-wide text-gray-400 mb-0.5">Total likes</p>
    //         <p className="text-sm font-medium text-gray-800">
    //           {data?.user?.total_likes ?? "—"}
    //         </p>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Center column — image (dominant) */}
    //   <div className="order-1 md:order-2 bg-white rounded-[25px] border border-gray-100 overflow-hidden flex flex-col md:h-screen md:overflow-y-auto">
    //     <img
    //       src={data?.urls?.regular}
    //       alt={data?.alt_description}
    //       className="w-full h-56 md:h-80 object-cover"
    //     />
    //     <div className="p-5 flex-1">
    //       <p className="text-base font-medium text-gray-900 mb-2">
    //         {data?.description ?? data?.alt_description ?? "No description"}
    //       </p>
    //       <p className="text-sm text-gray-500 leading-relaxed">
    //         {data?.alt_description}
    //       </p>

    //       <div className="border-t border-gray-100 pt-4 mt-4 flex flex-col gap-3">
    //         <div>
    //           <p className="text-[11px] uppercase tracking-wide text-gray-400 mb-0.5">Likes</p>
    //           <p className="text-sm font-medium text-gray-800">{data?.likes ?? "—"}</p>
    //         </div>
    //         <div>
    //           <p className="text-[11px] uppercase tracking-wide text-gray-400 mb-0.5">Published</p>
    //           <p className="text-sm font-medium text-gray-800">
    //             {data?.created_at
    //               ? new Date(data.created_at).toLocaleDateString("en-US", {
    //                   year: "numeric",
    //                   month: "long",
    //                   day: "numeric",
    //                 })
    //               : "—"}
    //           </p>
    //         </div>
    //         <div>
    //           <p className="text-[11px] uppercase tracking-wide text-gray-400 mb-0.5">Dimensions</p>
    //           <p className="text-sm font-medium text-gray-800">
    //             {data?.width && data?.height
    //               ? `${data.width} × ${data.height}`
    //               : "—"}
    //           </p>
              
    //         </div>
    //         <div>
    //           <Button buttonText={isRedirecting ? "Loading Stats..." : "View Statistics"} 
    //         onClick={handleViewStats} 
    //           disabled={isRedirecting} 
    //           />
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Right column — camera details */}
    //   <div className="order-3 md:order-3 bg-white rounded-[25px] border border-gray-100 p-5 flex flex-col gap-3 md:h-screen md:overflow-y-auto">
    //     <p className="text-[11px] uppercase tracking-widest text-gray-400">Camera details</p>

    //     <div className="flex flex-col gap-3">
    //       {[
    //           { label: "Make",          value: data?.exif?.make },
    //           { label: "Model",         value: data?.exif?.model },
    //           { label: "Aperture",      value: data?.exif?.aperture?.toString() },
    //           { label: "Shutter speed", value: data?.exif?.exposure_time?.toString() },
    //           { label: "ISO",           value: data?.exif?.iso?.toString() },
    //         { label: "Focal length",  value: data?.exif?.focal_length?.toString() },
    //       ].map(({ label, value }) => (
    //         <div key={label} className="border-b border-gray-50 pb-3 last:border-0">
    //           <p className="text-[11px] uppercase tracking-wide text-gray-400 mb-0.5">{label}</p>
    //           <p className="text-sm font-medium text-gray-800">{value ?? "Unknown"}</p>
    //         </div>
    //       ))}
    //     </div>

    //     <div className="border-t border-gray-100 pt-3 flex flex-col gap-3">
    //       <p className="text-[11px] uppercase tracking-widest text-gray-400">Tags</p>
    //       <div className="flex flex-wrap gap-2">
    //         {data?.tags?.length > 0
    //           ? data.tags.map((tag) => (
    //               <span
    //                 key={tag.title}
    //                 className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full"
    //               >
    //                 {tag.title}
    //               </span>
    //             ))
    //           : <p className="text-sm text-gray-400">No tags</p>
    //         }
    //       </div>
    //     </div>
    //   </div>

    // </div>
    // )
        
    // }

    // export default IndividualFeed;

    // orchestartion component:
    // Components/Feed/IndividualFeed.jsx — Orchestrator
// Wires hook + helpers + UI. Owns navigation handler and redirect state.

import { useState }                                             from "react";
import { useNavigate }                                          from "react-router-dom";
import { UseIndividualImage }                                   from "../../hooks/UseIndividualImage";
import { formatPublishedDate, formatDimensions, buildExifRows } from "./Individualfeedfunction";
import { PhotographerPanel, ImagePanel, CameraPanel }           from "./Individualfeedui";
import { IndividualFeedStyles }                                 from "./Individualfeedstyles";
import PageLoader                                               from "../PageLoader/PageLoader";

function IndividualFeed({ id }) {
  const navigate = useNavigate();
  const [isRedirecting, setIsRedirecting] = useState(false);

  // 1. Data
  const { data, isLoading, isError } = UseIndividualImage(id);

  // 2. Guard states
  if (isLoading) return <PageLoader />;
  if (!data)     return <span className={IndividualFeedStyles.guardCenter}>No data found</span>;
  if (isError)   return <span className={IndividualFeedStyles.guardCenter}>Error fetching data</span>;

  // 3. Derive display values via pure helpers
  const formattedDate = formatPublishedDate(data.created_at);
  const dimensions    = formatDimensions(data.width, data.height);
  const exifRows      = buildExifRows(data.exif);

  // 4. Handler
  function handleViewStats() {
    setIsRedirecting(true);
    setTimeout(() => navigate("/photos/statistics", { state: { id } }), 300);
  }

  // 5. Render
  return (
    <div className={IndividualFeedStyles.pageGrid}>
      <PhotographerPanel data={data} />

      <ImagePanel
        data={data}
        isRedirecting={isRedirecting}
        onViewStats={handleViewStats}
        formattedDate={formattedDate}
        dimensions={dimensions}
      />

      <CameraPanel exifRows={exifRows} tags={data.tags} />
    </div>
  );
}

export default IndividualFeed;