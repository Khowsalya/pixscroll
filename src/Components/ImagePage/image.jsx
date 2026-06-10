{/* Cards - single column centered */ }

export function img() {
  return (
    <>
      <div className="flex flex-col items-center gap-6 mt-6">
        {images?.map((img) => (
          <div
            key={img.id} // ✅ correct key placement
            className="w-[300px] rounded-[25px] overflow-hidden shadow-md bg-white"
          >
            {/* Image */}
            <img
              src={img.urls.small}
              alt={img.alt_description}
              className="w-full h-[150px] object-cover"
            />

            {/* Content */}
            <div className="p-3 flex flex-col gap-1 text-left">
              <p className="text-sm font-semibold line-clamp-2">
                {img.alt_description}
              </p>

              <p className="text-xs text-gray-600">
                {img.user.username}
              </p>

              <p className="text-xs text-gray-500 line-clamp-2">
                {img.user.bio}
              </p>
            </div>
          </div>
        ))}
      </div>





      <div ref={sentinel} style={{ height: "10px" }} /> */
    </>
  )
}