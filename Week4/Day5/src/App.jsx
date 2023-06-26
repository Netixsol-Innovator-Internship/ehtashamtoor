import React, { useEffect, useState, createContext } from "react";
// mobile components
import Header from "../components/mobile/Header";
import JobBox from "../components/mobile/JobBox";
import FilterBox from "../components/mobile/FilterBox";
// desktop components
import DesktopHeader from "../components/desktop/DesktopHeader";
import DesktopFilters from "../components/desktop/DesktopFilters";
import DesktopJobBox from "../components/desktop/DesktopJobBox";
import Data from "./data.json";

export const FilterContext = createContext();
export const IdArrayContext = createContext();

function App() {
  // DATA FETCHING
  const [data, setData] = useState(Data);
  // CONTEXTS
  const [filters, setFilters] = useState([]);
  const [idArray, setIdArray] = useState([]);
  // WINDOW WIDTH
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });
  if (windowWidth < 700)
    return (
      <FilterContext.Provider value={[filters, setFilters]}>
        <IdArrayContext.Provider value={[idArray, setIdArray]}>
          <div className="bg-lightGrayishCyan h-full">
            <Header></Header>
            <FilterBox data={data}></FilterBox>
            <div className="flex-col flex bg-lightGrayishCyan">
              <JobBox dataArr={data}></JobBox>
            </div>
          </div>
        </IdArrayContext.Provider>
      </FilterContext.Provider>
    );

  if (windowWidth > 700)
    return (
      <FilterContext.Provider value={[filters, setFilters]}>
        <IdArrayContext.Provider value={[idArray, setIdArray]}>
          <div className="bg-lightGrayishCyan h-full">
            <DesktopHeader></DesktopHeader>
            <DesktopFilters data={data}></DesktopFilters>
            <div className="flex flex-col bg-lightGrayishCyan">
              <DesktopJobBox dataArr={data}></DesktopJobBox>
            </div>
          </div>
        </IdArrayContext.Provider>
      </FilterContext.Provider>
    );
}

export default App;
