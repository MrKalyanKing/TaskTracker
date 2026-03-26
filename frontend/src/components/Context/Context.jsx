import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const CreateContext = ({ children }) => {
  // const url = "https://tasktracker-lueu.onrender.com/api";/
  const url="http://localhost:8000/api"
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);


  const checkAuth = async () => {
    try {
      await axios.get(`${url}/user/getuser`, {
        withCredentials: true,
      });

      setIsAuthenticated(true);
    } catch (err) {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const logout = async () => {
    try {
      await axios.post(`${url}/user/logout`, {}, {
        withCredentials: true,
      });

      setIsAuthenticated(false);
      toast.success("Logged out successfully!");
    } catch (err) {
      console.log(err.message);
      toast.error("Logout failed!");
    }
  };

  return (
    <AppContext.Provider value={{ url, isAuthenticated, setIsAuthenticated, logout, loading }}>
      {children}
    </AppContext.Provider>
  );
};