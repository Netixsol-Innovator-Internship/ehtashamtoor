import React, { useRef, useEffect } from "react";

function DesktopNewAndFeatured({ data, borderCont }) {
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
    <div className="flex space-x-2">
      {/* NEW */}
      <div
        ref={newCont}
        className="uppercase bg-darkCyan text-white rounded-xl w-[70px] flex justify-center items-center"
      >
        <p className="h-[20px]">new!</p>
      </div>
      {/* FEATURED */}
      <div
        ref={featuredCont}
        className="uppercase bg-veryDarkGrayishCyan text-white rounded-xl w-[100px] flex justify-center items-center"
      >
        <p className="h-[20px]">featured</p>
      </div>
    </div>
  );
}
export default DesktopNewAndFeatured;
