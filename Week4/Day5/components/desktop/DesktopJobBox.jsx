import React, { useContext, useEffect, useState } from "react";
import DesktopJobDesc from "./DesktopJobDesc";
// CONTEXT IMPORTS
import { IdArrayContext } from "../../src/App";
import { FilterContext } from "../../src/App";
import Data from "../../src/data.json";

function DesktopJobBox({ dataArr }) {
  // CONTEXT VARIABLES
  const [idArray, setIdArray] = useContext(IdArrayContext);
  const [filters, setFilters] = useContext(FilterContext);
  // DATA FETCHING
  const [data, setData] = useState(Data);
  // HANDLE JOB FILTERING
  useEffect(() => {
    const jobCont = document.getElementById("jobCont");
    if (!data) return;
    if (idArray.length == 0) {
      for (let i = 0; i < jobCont.children.length; i++) {
        jobCont.children[i].classList.remove("hidden");
      }
      return;
    }
    // CHECK HOW MANY TIMES FILTERS ARE PRESENT IN THE JOB DESC
    let occArray = [];
    function getOcurrence(array, value) {
      let count = 0;
      array.forEach((v) => v === value && count++);
      return count;
    }
    for (let i = 0; i < 10; i++) {
      occArray.push(getOcurrence(idArray, i + 1));
    }
    // console.log(occArray);
    createArrays(occArray);
  });
  // CHECK WHICH JOB HAS FILTERS
  function createArrays(occArr) {
    let showArr = [];
    let hideArr = [];
    console.log(filters);
    for (let j = 0; j < 10; j++) {
      if (occArr[j] == filters.length) showArr.push(j + 1);
      if (occArr[j] !== filters.length) hideArr.push(j + 1);
      showAndHide(showArr, hideArr);
    }
    // console.log(showArr, hideArr);
  }
  // SHOW/HIDE JOBS
  function showAndHide(showArr, hideArr) {
    const jobCont = document.getElementById("jobCont");
    for (let x = 0; x < 10; x++) {
      if (showArr.includes(x + 1))
        jobCont.children[x].classList.remove("hidden");
      if (hideArr.includes(x + 1)) jobCont.children[x].classList.add("hidden");
    }
  }
  return (
    <section id="jobCont" className="w-full flex flex-col items-center mt-12">
      {dataArr.map((course, index) => {
        return <DesktopJobDesc data={data[index]} key={index}></DesktopJobDesc>;
      })}
    </section>
  );
}

export default DesktopJobBox;
