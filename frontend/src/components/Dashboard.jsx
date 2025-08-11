import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import AdminRantSection from '../sections/AdminRantSection';

const Dashboard = ({ setAuth }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: ""
  });
  const [loading, setLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const getProfile = async () => {
    try {
      const baseURL = import.meta.env.PROD ? "" : "http://localhost:3000";
      const res = await fetch(`${baseURL}/api/auth/dashboard`, { 
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

  const logout = async () => {
    try {
      localStorage.removeItem("jwt_token");     
      setAuth(false);
      toast.success("Logout successfully");
      navigate("/login"); // Redirect to login page
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    logout();
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
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
    <section className="relative c-space top-12 px-3 sm:px-5">
      <div className="w-full mx-auto relative z-10">
        {/* Mobile-first layout */}
        <div className="flex flex-col space-y-4 sm:space-y-6 mb-8 sm:mb-12">
          {/* Header */}
          <h1 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">Dashboard</h1>
          
          {/* User info - mobile optimized */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-2 text-white break-words">
              Welcome, {user.username}!
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 break-all">
              Email: {user.email}
            </p>
          </div>
          
          {/* Logout button */}
          <div className="flex justify-center sm:justify-start">
            <button 
              onClick={handleLogoutClick} 
              className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg text-center rounded-lg cursor-pointer bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white transition-all duration-200 hover:-translate-y-1"
            >
              Logout
            </button>
          </div>
        </div>
    
      
      {/* Logout Confirmation Modal - Mobile optimized */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-2xl">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Confirm Logout</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={confirmLogout}
                className="flex-1 bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 transition duration-200 font-medium"
              >
                Yes, Logout
              </button>
              <button
                onClick={cancelLogout}
                className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-400 transition duration-200 font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <AdminRantSection />







      <ToastContainer />
    </div>
   </section> 
  );
};

export default Dashboard;