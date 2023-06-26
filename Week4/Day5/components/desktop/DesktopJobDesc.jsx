import React, { useContext, useRef } from "react";
// CUSTOM COMPONENTS IMPORTS
import DesktopJobFilters from "./DesktopJobFilters";
import DesktopNewAndFeatured from "./DesktopNewAndFeatured";

function DesktopJobDesc({ data }) {
  // HANDLE JOB FILTERING
  const borderCont = useRef();
  // COMPONENT RENDERING
  if (!data) return;
  return (
    <div
      ref={borderCont}
      className="w-3/4 gap-10 px-5 py-2 bg-white shadow-xl h-auto rounded-xl font-mainFont mb-14 flex md:justify-between flex-col lg:flex-row items-stretch"
    >
      {/* IMAGE */}
      <div className="flex">
        <div className="w-[7rem] flex items-center p-2">
          <img src={data.logo} alt="profilePic"></img>
        </div>
        {/* COMPANY + EXTRA */}
        <div className="flex justify-center items-center w-auto">
          <div className="flex flex-col">
            {/* COMPANY NAME */}
            <div className="flex space-x-3">
              <p className="text-darkCyan">{data.company}</p>
              {/* NEW AND FEATURED */}
              <DesktopNewAndFeatured data={data} borderCont={borderCont} />
            </div>
            {/* JOB */}
            <div className="hover:text-darkCyan hover:cursor-pointer pt-3 text-lg">
              <p>{data.role}</p>
            </div>
            {/* JOB DESC (DATA,LOCATION,ETC.) */}
            <div className="flex space-x-2 items-center text-darkGrayishCyan text-sm h-[30px]">
              <p>{data.postedAt}</p>
              <span className="text-xl text-center pb-2">.</span>
              <p>{data.contract}</p>
              <span className="text-xl text-center pb-2">.</span>
              <p>{data.location}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Filters to apply filters*/}
      <DesktopJobFilters data={data}></DesktopJobFilters>
    </div>
  );
}
export default DesktopJobDesc;
