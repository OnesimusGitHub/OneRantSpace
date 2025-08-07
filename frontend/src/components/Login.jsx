import React, { Fragment, useState } from "react";
import { Link, Navigate } from "react-router-dom"; 
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { email, password } = inputs;

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch(
        "http://localhost:3000/api/auth/login", 
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );

      const parseRes = await response.json();

      if (parseRes.token) { 
        localStorage.setItem("jwt_token", parseRes.token); 
        setAuth(true);
        setIsLoggedIn(true);
        toast.success("Logged in Successfully");
      } else {
        setAuth(false);
        toast.error(parseRes.message || "Login failed");
      }
    } catch (err) {
      console.error(err.message);
      toast.error("Login failed");
    }
  };


  if (isLoggedIn) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Fragment>
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <form onSubmit={onSubmitForm}>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={e => onChange(e)}
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={e => onChange(e)}
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button 
            type="submit"
            className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600 transition duration-200"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-4">
          Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
        </p>
      </div>
      <ToastContainer />
    </Fragment>
  );
};

export default Login;