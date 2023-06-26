import React, { useContext, useRef, useEffect } from "react";
// CONTEXTS
import { FilterContext } from "../../src/App";
import { IdArrayContext } from "../../src/App";
// OUTSIDE SCOPE VARIABLES
const dataObj = {};

function DesktopFilters({ data }) {
  // CONTEXT VARIABLES
  const [idArray, setIdArray] = useContext(IdArrayContext);
  const [filters, setFilters] = useContext(FilterContext);
  const small = ["CSS", "Ruby", "HTML", "Sass", "RoR", "Vue"];
  const med = ["React", "Senior", "Python", "Junior", "Django", "Backend"];
  const lg = ["JavaScript", "Midweight", "Fullstack", "Frontend"];
  const filtersCont = useRef();
  // HANDLE THE WIDTH OF DIFF SIZED FILTERS
  useEffect(() => {
    let dataObjIndex = 0;
    for (let i = 0; i < data.length; i++) {
      const dataArr = [];
      dataArr.push(data[i].id);
      dataArr.push(data[i].role);
      dataArr.push(data[i].level);
      dataArr.push(...data[i].languages);
      dataArr.push(...data[i].tools);
      dataObj[dataObjIndex] = dataArr;
      dataObjIndex += 1;
    }

    // function to get the ids of the selected courses
    setIdArray(checkForJobs());
  }, [filters]);
  // HANDLE DELETE FILTERS
  const deleteFilters = (e) => {
    const parent = e.currentTarget.parentElement;
    const newFilters = [...filters];
    parent.remove();
    const filter = parent.children[0].children[0].innerHTML;
    // console.log(filter);
    newFilters.splice(newFilters.indexOf(filter), 1);
    setFilters(newFilters);
  };
  // HANDLE CLEAR FILTERS
  const clearFilters = () => {
    setFilters([]);
  };
  // HANDLE JOB FILTERING
  function checkForJobs() {
    let idArr = [];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < filters.length; j++) {
        const bool = dataObj[i].includes(filters[j]);
        if (bool) idArr.push(dataObj[i][0]);
      }
    }
    // console.log(idArr);
    return idArr;
  }
  // function to render all applied filters
  const AllFilters = () => {
    const allFilters = filters.map((item, index) => (
      <div
        className="flex bg-filterGrayishCyan rounded-md text-darkCyan justify-end"
        key={index}
      >
        <div className="w-3/4 flex items-center justify-center">
          <p className="h-4/5">{item}</p>
        </div>
        <button
          onClick={deleteFilters}
          className="bg-darkCyan hover:bg-veryDarkGrayishCyan w-[28px] flex items-center justify-center rounded-tr-md rounded-br-md justify-self-end"
        >
          <img src="../../src/assets/icon-remove.svg"></img>
        </button>
      </div>
    ));
    return (
      <div
        ref={filtersCont}
        className="flex flex-wrap w-3/4 items-center gap-x-4 gap-y-2 mx-auto font-mainFont"
      >
        {allFilters}
      </div>
    );
  };
  return (
    <div className="flex w-3/4 h-[100px] shadow-xl relative bottom-14 bg-white mx-auto max-w-[1300px]">
      <AllFilters></AllFilters>
      <button
        onClick={clearFilters}
        className="font-mainFont text-darkGrayishCyan h-1/3 self-center col-start-3 row-span-2 row-start-1 flex items-center justify-end mr-4 hover:text-darkCyan hover:underline"
      >
        <p>Clear</p>
      </button>
    </div>
  );
}

export default DesktopFilters;
