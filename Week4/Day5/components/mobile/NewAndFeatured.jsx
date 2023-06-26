import React, { useEffect, useRef } from "react";
// EXTRA IMPORTS
import PropTypes from "prop-types";

function NewAndFeatured({ data, borderCont }) {
  const newCont = useRef();
  const featuredCont = useRef();

  useEffect(() => {
    data.new ? showNew() : hideNew();
    data.featured ? showFeatured() : hideFeatured();
  });
  function showNew() {
    newCont.current.classList.remove("hidden");
  }
  function showFeatured() {
    featuredCont.current.classList.remove("hidden");
    borderCont.current.classList.add("border-l-8");
    borderCont.current.classList.add("border-l-darkCyan");
  }
  function hideNew() {
    newCont.current.classList.add("hidden");
  }

  function hideFeatured() {
    featuredCont.current.classList.add("hidden");
  }

  return (
    <div className="w-[70%] mx-1 flex">
      {/* NEW */}
      <div
        ref={newCont}
        className="text-white text-[0.9rem] uppercase px-2 bg-darkCyan w-fit rounded-2xl flex justify-center items-center h-[25px] max-w-[50px]"
      >
        <p className="h-[20px]">new!</p>
      </div>
      {/* FEATURED */}
      <div
        ref={featuredCont}
        className="text-white text-[0.9rem] px-2 uppercase bg-veryDarkGrayishCyan w-fit rounded-2xl flex justify-center items-center h-[25px] maw-w-[60px] ml-2"
      >
        <p className="h-[20px]">featured</p>
      </div>
    </div>
  );
}

NewAndFeatured.propTypes = {
  data: PropTypes.object.isRequired,
  borderCont: PropTypes.object.isRequired,
};

export default NewAndFeatured;
