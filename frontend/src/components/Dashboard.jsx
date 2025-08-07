import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = ({ setAuth }) => {
  const [user, setUser] = useState({
    username: "",
    email: ""
  });
  const [loading, setLoading] = useState(true);

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/dashboard", { 
        method: "GET", 
        headers: { 
          jwt_token: localStorage.getItem("jwt_token") 
        }
      });

      const parseData = await res.json();
      
      if (parseData.success) {
        setUser({
          username: parseData.user.username,
          email: parseData.user.email
        });
      } else {
        toast.error("Failed to load profile");
        logout();
      }
    } catch (err) {
      console.error(err.message);
      toast.error("Error loading profile");
      logout();
    } finally {
      setLoading(false);
    }
  };

  const logout = async e => {
    if (e) e.preventDefault();
    try {
      localStorage.removeItem("jwt_token");     
      setAuth(false);
      toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <div className="mb-6">
          <h2 className="text-xl mb-2">Welcome, {user.username}!</h2>
          <p className="text-gray-600">Email: {user.email}</p>
        </div>
        
        <div className="space-y-4">
          <button 
            onClick={logout} 
            className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Dashboard;