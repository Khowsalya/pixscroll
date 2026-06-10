// Components/NavBar/style.js
// Single source of truth for every Tailwind / DaisyUI className in NavBar.

export const navStyles = {
  // ── Outer wrapper ──────────────────────────────────────────
  outerWrapper: "navbar bg-base-100 shadow-sm",
  logoBtn: "btn btn-ghost text-xl cursor-pointer",
  rightGroup: "flex gap-2 items-center",

  // ── Search wrapper ─────────────────────────────────────────
  searchWrapper: "relative",
  inputRow: "relative flex items-center",
  input: "input input-bordered w-40 md:w-72 pr-8",
  clearBtn:
    "absolute right-2 text-gray-400 hover:text-gray-600 text-lg leading-none",

  // ── Suggestion dropdown ────────────────────────────────────
  dropdown:
    "absolute top-full mt-1 left-0 right-0 z-50 bg-base-100 border border-base-300 rounded-xl shadow-lg list-none p-1 max-h-80 overflow-y-auto",
  dropdownHistHdr: "flex items-center justify-between px-3 py-1",
  dropdownSectionLbl: "text-xs text-gray-400 uppercase tracking-wider",
  dropdownClearAll:
    "text-xs text-gray-400 hover:text-red-400 transition-colors",
  dropdownDivider: "border-t border-base-200 mt-1 pt-1 px-3 pb-0.5",
  dropdownItemActive:
    "px-3 py-2 text-sm rounded-lg cursor-pointer flex items-center gap-2 transition-colors bg-base-200",
  dropdownItemIdle:
    "px-3 py-2 text-sm rounded-lg cursor-pointer flex items-center gap-2 transition-colors hover:bg-base-200",
  dropdownThumb: "w-8 h-8 rounded object-cover shrink-0",
  dropdownIconWrap:
    "text-gray-400 text-xs shrink-0 w-8 flex items-center justify-center",
  dropdownDeleteBtn:
    "text-gray-300 hover:text-red-400 text-base leading-none shrink-0 px-1 transition-colors",
  dropdownRawLabel: "text-xs text-gray-400",

  // ── Avatar dropdown ────────────────────────────────────────
  avatarWrapper: "dropdown dropdown-end",
  avatarBtn: "btn btn-ghost btn-circle avatar",
  avatarImgWrap: "w-10 rounded-full",
  avatarMenu:
    "menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow",

  // ── Filter bar ─────────────────────────────────────────────
  filterBar:
    "flex gap-2 px-4 py-2 flex-wrap bg-base-100 border-t border-base-200 shadow-sm items-center",
  filterSelect: "select select-sm select-bordered",
  filterQueryRow: "flex items-center gap-2 ml-auto",
  filterQueryText: "text-sm text-gray-500",
  filterClearBtn: "btn btn-xs btn-ghost text-gray-400",
};
