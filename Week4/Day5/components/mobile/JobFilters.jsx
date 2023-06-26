import React, { useContext, useEffect, useRef } from "react";
import PropTypes from "prop-types";
// CUSTOM COMPONENTS IMPORT;
import Languages from "./Languages";
import Level from "./Level";
import Tools from "./Tools";
// CONTEXTS IMPORTS
import { FilterContext } from "../../src/App";
function JobFilters({ data }) {
  const [filters, setFilters] = useContext(FilterContext);
  const roleFilters = () => {
    if (filters.includes(data.role)) return;
    setFilters([...filters, data.role]);
  };
  return (
    <div className="flex text-darkCyan font-bold pl-4">
      <div className="flex flex-wrap gap-x-4 gap-y-4">
        {/* ROLE CONTAINER */}
        <button
          onClick={roleFilters}
          className="bg-filterGrayishCyan flex justify-center items-center rounded-md w-auto hover:text-white hover:bg-darkCyan"
        >
          <p className="text-xs sm:text-base">{data.role}</p>
        </button>
        {/* LEVEL CONTAINER */}
        <Level typeLevel={data.level}></Level>
        {/* LANGUAGE CONTAINERS */}
        <Languages typeLang={data.languages[0]}></Languages>
        <Languages typeLang={data.languages[1]}></Languages>
        <Languages typeLang={data.languages[2]}></Languages>
        {/* TOOL CONTAINERS */}
        <Tools typeTool={data.tools[0]}></Tools>
        <Tools typeTool={data.tools[1]}></Tools>
      </div>
    </div>
  );
}

JobFilters.propTypes = {
  data: PropTypes.object.isRequired,
};
export default JobFilters;
