import React, { useContext, useEffect, useRef } from "react";
// CONTEXT IMPORTS
import { FilterContext } from "../../src/App";
// EXTRA IMPORTS
import PropTypes from "prop-types";

function Languages({ typeLang }) {
  // HANDLE FILTERS
  const [filters, setFilters] = useContext(FilterContext);
  const langFilters = () => {
    if (filters.includes(typeLang)) return;
    setFilters([...filters, typeLang]);
  };
  // HANDLE COMP
  const mainCont = useRef();
  const med = ["Python"];
  const small = ["HTML", "CSS", "Ruby"];
  useEffect(() => {
    small.includes(typeLang)
      ? smallComp()
      : med.includes(typeLang)
      ? mediumComp()
      : wideComp();
    if (typeLang == "CSS") {
      mainCont.current.classList.add("uppercase");
    }
  });
  function smallComp() {
    mainCont.current.classList.remove("w-1/3");
    mainCont.current.classList.add("w-1/5");
  }
  function mediumComp() {
    mainCont.current.classList.remove("w-1/3");
    mainCont.current.classList.add("w-1/4");
  }
  function wideComp() {
    return;
  }

  if (!typeLang) return;
  return (
    <button
      onClick={langFilters}
      ref={mainCont}
      className="bg-filterGrayishCyan flex justify-center items-center min-h-[30px] max-h-[35px] rounded-md w-1/3 hover:bg-darkCyan hover:text-white"
    >
      <p className="text-xs sm:text-base">{typeLang}</p>
    </button>
  );
}

Languages.propTypes = {
  typeLang: PropTypes.string.isRequired,
};
export default Languages;
