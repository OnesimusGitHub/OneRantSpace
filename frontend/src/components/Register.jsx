import React, { Fragment, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    username: ""
  });

  const [isRegistered, setIsRegistered] = useState(false);

  const { email, password, username } = inputs;

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { email, password, username };
      const response = await fetch(
        "http://localhost:3000/api/auth/register",
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
        setIsRegistered(true);
        toast.success("Registered Successfully");
      } else {
        setAuth(false);
        toast.error(parseRes.message || "Registration failed");
      }
    } catch (err) {
      console.error(err.message);
      toast.error("Registration failed");
    }
  };

  if (isRegistered) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Fragment>
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Register</h1>
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
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Username"
            onChange={e => onChange(e)}
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button 
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition duration-200"
          >
            Register
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        </p>
      </div>
      <ToastContainer />
    </Fragment>
  );
};

export default Register;