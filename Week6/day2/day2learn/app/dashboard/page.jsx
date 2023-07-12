"use client";

import React from "react";

const DashboardPage = () => {
  const hanldeSubmit = (e) => {
    e.preventDefault();
    console.log("into handlesubmit");
  };

  return (
    <div>
      <h1>Dashboard here</h1>
      <form onSubmit={hanldeSubmit}>
        <input type="text" className="text-black" />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default DashboardPage;
