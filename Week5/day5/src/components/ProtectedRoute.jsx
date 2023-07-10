import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/checkauth`,
        { withCredentials: true }
      );
      if (response.data.message === "auth") {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
