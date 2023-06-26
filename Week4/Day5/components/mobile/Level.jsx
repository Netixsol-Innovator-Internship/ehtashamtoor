import React, { useContext, useEffect, useRef } from "react";
// CONTEXT IMPORTS
import { FilterContext } from "../../src/App";
// EXTRA IMPORTS
import PropTypes from "prop-types";

function Level({ typeLevel }) {
  const [filters, setFilters] = useContext(FilterContext);
  const levelFilters = () => {
    if (filters.includes(typeLevel)) return;
    setFilters([...filters, typeLevel]);
  };
  const mainCont = useRef();
  useEffect(() => {
    if (typeLevel == "Midweight") {
      mainCont.current.classList.remove("w-1/4");
      mainCont.current.classList.add("w-1/3");
    }
  });

  return (
    <button
      onClick={levelFilters}
      ref={mainCont}
      className="bg-filterGrayishCyan flex justify-center items-center min-h-[30px] max-h-[35px] rounded-md w-1/4 hover:text-white hover:bg-darkCyan"
    >
      <p className="text-xs sm:text-base">{typeLevel}</p>
    </button>
  );
}

Level.propTypes = {
  typeLevel: PropTypes.string.isRequired,
};

export default Level;
