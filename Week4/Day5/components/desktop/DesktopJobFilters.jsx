import React, { useContext } from "react";
// CUSTOM COMPONENT IMPORTS
import DesktopLevel from "./DesktopLevel";
import DesktopLanguages from "./DesktopLanguages";
import DesktopTools from "./DesktopTools";
// CONTEXT IMPORTS
import { FilterContext } from "../../src/App";


function DesktopJobFilters({ data }) {
  const [filters, setFilters] = useContext(FilterContext);
  // console.log(data);
  const roleFilters = () => {
    if (filters.includes(data.role)) return;
    setFilters([...filters, data.role]);
  };
  return (
    <div className="w-auto flex justify-end items-center">
      <div className="w-auto h-1/3  flex items-center space-x-3 mr-3">
        {/* ROLE CONTAINER */}
        <button
          className="bg-filterGrayishCyan text-darkCyan flex justify-center items-center min-h-[30px] max-h-[35px] rounded-md w-auto hover:text-white hover:bg-darkCyan p-2"
          onClick={roleFilters}
        >
          <p className="text-xs sm:text-base">{data.role}</p>
        </button>
        {/* LEVEL */}
        <DesktopLevel typeLevel={data.level}></DesktopLevel>
        {/* LANGUAGE CONTAINERS */}
        <DesktopLanguages typeLang={data.languages[0]}></DesktopLanguages>
        <DesktopLanguages typeLang={data.languages[1]}></DesktopLanguages>
        <DesktopLanguages typeLang={data.languages[2]}></DesktopLanguages>
        {/* TOOLS CONTAINERS */}
        <DesktopTools typeTool={data.tools[0]}></DesktopTools>
        <DesktopTools typeTool={data.tools[1]}></DesktopTools>
      </div>
    </div>
  );
}

export default DesktopJobFilters;
