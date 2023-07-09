import "./App.css";
import { useState, useRef, useLayoutEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Todoapp from "./components/Todoapp";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import Register from "./components/Register";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Todoapp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      <Toaster position="bottom-center" />
    </div>
  );
}
export default App;