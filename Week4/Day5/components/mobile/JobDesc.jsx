import React, { useRef } from "react";
// CUSTOM COMPONENTS IMPORT
import NewAndFeatured from "./NewAndFeatured";
import JobFilters from "./JobFilters";

function JobDesc({ data }) {
  // HANDLE JOB FILTERING
  const borderCont = useRef();
  // COMPONENT RENDERING
  if (!data) return;

  return (
    <div
      ref={borderCont}
      className="m-2 bg-white shadow-xl h-auto pb-2 rounded-xl font-mainFont mb-14 min-w-[270px]"
    >
      {/* place image */}
      <div className="h-[4rem]">
        <img className="h-full relative bottom-8 left-5" src={data.logo}></img>
      </div>
      {/* company + extra */}
      <div className="h-auto flex items-center pl-4 text-darkCyan font-bold">
        {/* company name */}
        <p className="text-sm">{data.company}</p>
        <NewAndFeatured data={data} borderCont={borderCont}></NewAndFeatured>
      </div>
      {/* JOB */}
      <div className="text-veryDarkGrayishCyan font-bold pl-4 pt-2 hover:text-darkCyan hover:cursor-pointer">
        <p>{data.position}</p>
      </div>
      {/* JOB DESC (DATE,LOCATION,ETC..) */}
      <div className="flex space-x-2 items-center text-darkGrayishCyan pl-4 text-sm h-[30px]">
        <p>{data.postedAt}</p>
        <span className="text-xl text-center pb-2">.</span>
        <p>{data.contract}</p>
        <span className="text-xl text-center pb-2">.</span>
        <p>{data.location}</p>
      </div>
      <div className="flex justify-center">
        <span className="block h-[1px] bg-darkGrayishCyan w-[90%] mt-4 mb-4"></span>
      </div>
      {/* FILTERS */}
      <JobFilters data={data}></JobFilters>
    </div>
  );
}
export default JobDesc;
