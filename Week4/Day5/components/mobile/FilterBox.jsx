import React, { useContext, useEffect, useRef } from "react";

// CONTEXTS
import { FilterContext } from "../../src/App";
import { IdArrayContext } from "../../src/App";

const dataObj = {};

function FilterBox({ data }) {
  // CONTEXT VARIABLES
  const [idArray, setIdArray] = useContext(IdArrayContext);
  const [filters, setFilters] = useContext(FilterContext);

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

    setIdArray(checkForJobs());
  }, [filters]);
  // HANDLE DELETE FILTERS
  const deleteFilters = (e) => {
    const parent = e.currentTarget.parentElement;
    const newFilters = [...filters];
    parent.remove();
    const filter =
      e.currentTarget.parentElement.children[0].children[0].innerHTML;
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
    return idArr;
  }
  // HANDLE FILTERS RENDERING
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
          onClick={(e) => {
            deleteFilters(e);
          }}
          className="bg-darkCyan w-[28px] flex items-center justify-center rounded-tr-md rounded-br-md justify-self-end"
        >
          <img src="../../src/assets/icon-remove.svg"></img>
        </button>
      </div>
    ));
    return (
      <div className="flex flex-wrap w-3/4 items-center gap-x-4 gap-y-2 mx-auto font-mainFont">
        {allFilters}
      </div>
    );
  };
  return (
    <div className="flex w-3/4 h-[130px] shadow-xl relative bottom-16 bg-white mx-auto max-w-[390px]">
      <AllFilters></AllFilters>
      <button
        onClick={(e) => {
          clearFilters(e);
        }}
        className="font-mainFont text-darkGrayishCyan h-1/3 self-center col-start-3 row-span-2 row-start-1 flex items-center justify-end mr-4 hover:text-darkCyan hover:underline"
      >
        <p>Clear</p>
      </button>
    </div>
  );
}

export default FilterBox;
