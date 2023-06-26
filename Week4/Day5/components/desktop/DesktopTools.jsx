import React, { useEffect, useContext, useRef } from "react";
// CONTEXT IMPORTS
import { FilterContext } from "../../src/App";

function DesktopTools({ typeTool }) {
  // HANDLE FILTERS
  const [filters, setFilters] = useContext(FilterContext);
  const toolFilters = () => {
    if (filters.includes(typeTool)) return;
    setFilters([...filters, typeTool]);
  };
  const mainCont = useRef();
  // HANDLE COMP
  // const small = ["Ruby", "Sass", "RoR", "Vue"];
  // useEffect(() => {
  //   if (small.includes(typeTool)) smallComp();
  // });

  // function smallComp() {
  //   mainCont.current.classList.remove("w-1/4");
  //   mainCont.current.classList.add("w-1/5");
  // }

  if (!typeTool) return;
  return (
    <button
      onClick={toolFilters}
      ref={mainCont}
      className="bg-filterGrayishCyan text-darkCyan flex justify-center items-center min-h-[30px] max-h-[35px] rounded-md w-1/4 hover:text-white hover:bg-darkCyan p-2"
    >
      <p className="text-xs sm:text-base">{typeTool}</p>
    </button>
  );
}

export default DesktopTools;
