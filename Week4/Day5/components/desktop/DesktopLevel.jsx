import React, { useContext } from "react";
// CONTEXT IMPORTS
import { FilterContext } from "../../src/App";

function DesktopLevel({ typeLevel }) {
  const [filters, setFilters] = useContext(FilterContext);
  const levelFilters = () => {
    if (filters.includes(typeLevel)) return;
    setFilters([...filters, typeLevel]);
  };
  return (
    <button
      onClick={levelFilters}
      className="bg-filterGrayishCyan flex text-darkCyan justify-center items-center min-h-[30px] max-h-[35px] rounded-md w-auto hover:text-white hover:bg-darkCyan p-2"
    >
      <p className="text-xs sm:text-base">{typeLevel}</p>
    </button>
  );
}

export default DesktopLevel;
