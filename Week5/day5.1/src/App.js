import "./App.css";
import { useState, useRef, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Todoapp from "./components/Todoapp";
import Login from "./components/Login";
import { Route, Routes, useNavigate } from "react-router-dom";
import Register from "./components/Register";
import { useAuth } from "./context/AuthContext";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  const { user } = useAuth();
  console.log(user);
  const navigate = useNavigate();

  useEffect(() => {
    // if (user == null) navigate("/login");
  }, []);
  return (
    <div className="">
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Todoapp />
            </ProtectedRoutes>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      <Toaster position="bottom-center" />
    </div>
  );
}
export default App;
