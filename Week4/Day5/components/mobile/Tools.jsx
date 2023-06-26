import React, { useContext, useEffect, useRef } from "react";
// CONTEXT IMPORTS
import { FilterContext } from "../../src/App";
// EXTRA IMPORTS
import PropTypes from "prop-types";

function Tools({ typeTool }) {
  // HANDLE FILTERS
  const [filters, setFilters] = useContext(FilterContext);
  const toolFilters = () => {
    if (filters.includes(typeTool)) return;
    setFilters([...filters, typeTool]);
  };
  // HANDLE COMP
  const small = ["Ruby", "Sass", "RoR", "Vue"];
  const mainCont = useRef();
  useEffect(() => {
    if (small.includes(typeTool)) smallComp();
  });

  function smallComp() {
    mainCont.current.classList.remove("w-1/4");
    mainCont.current.classList.add("w-1/5");
  }

  if (!typeTool) return;
  return (
    <button
      onClick={toolFilters}
      ref={mainCont}
      className="bg-filterGrayishCyan flex justify-center items-center min-h-[30px] max-h-[35px] rounded-md w-1/4 hover:text-white hover:bg-darkCyan"
    >
      <p className="text-xs sm:text-base">{typeTool}</p>
    </button>
  );
}

Tools.propTypes = {
  typeTool: PropTypes.string.isRequired,
};

export default Tools;
