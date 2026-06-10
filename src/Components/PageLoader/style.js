// Components/PageLoader/style.js

export const pageLoaderStyles = {
  wrapper: "h-[100vh] flex justify-center items-start",
};

/** ContentLoader rect definitions — kept here so they're easy to tweak visually. */
export const LOADER_RECTS = [
  { x: "10", y: "10", rx: "5", ry: "5", width: "260", height: "140" },
  { x: "280", y: "10", rx: "5", ry: "5", width: "260", height: "280" },
  { x: "550", y: "10", rx: "5", ry: "5", width: "260", height: "140" },
  { x: "10", y: "160", rx: "5", ry: "5", width: "260", height: "280" },
  { x: "280", y: "300", rx: "5", ry: "5", width: "260", height: "140" },
  { x: "550", y: "160", rx: "5", ry: "5", width: "260", height: "280" },
];
