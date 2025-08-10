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
    <section className="relative flex items-center c-space 
    top-12 " >
    <div className="w-full mx-auto relative z-10">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <div className="mb-6 text-center">
          <h2 className="text-xl mb-2">Welcome, {user.username}!</h2>
          <p className="text-gray-600">Email: {user.email}</p>
        </div>
        
        <div className="space-y-4">
          <button 
            onClick={handleLogoutClick} 
            className="px-6 py-2 text-lg text-center rounded-md cursor-pointer bg-radial from-lavender to-royal hover-animation"
          >
            Logout
          </button>
        </div>


      </div>
    
      
      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Confirm Logout</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
            <div className="flex space-x-4">
              <button
                onClick={confirmLogout}
                className="flex-1 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200"
              >
                Yes, Logout
              </button>
              <button
                onClick={cancelLogout}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition duration-200"
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