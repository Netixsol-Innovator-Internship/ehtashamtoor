import React, { useContext, useRef, useEffect } from "react";
// CONTEXT IMPORTS
import { FilterContext } from "../../src/App";

function DesktopLanguages({ typeLang }) {
  // HANDLE FILTERS
  const [filters, setFilters] = useContext(FilterContext);
  const langFilters = () => {
    if (filters.includes(typeLang)) return;
    setFilters([...filters, typeLang]);
  };

  

  if (!typeLang) return;
  return (
    <button
      onClick={langFilters}
      className="bg-filterGrayishCyan text-darkCyan flex justify-center items-center min-h-[30px] max-h-[35px] rounded-md w-auto hover:bg-darkCyan hover:text-white p-2"
    >
      <p className="text-xs sm:text-base">{typeLang}</p>
    </button>
  );
}

export default DesktopLanguages;
