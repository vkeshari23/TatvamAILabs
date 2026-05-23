import { useState } from "react";

import {Link,useNavigate} from "react-router-dom";

import api from "../api/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] =useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login",formData);

      localStorage.setItem("token",response.data.token);
      navigate("/dashboard");


    } catch (error) {
      console.log(error);
      alert("Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow w-[350px]"
      >
        <h1 className="text-3xl font-bold mb-5 text-center">
          Login
        </h1>

        <input type="email" placeholder="Email" name="email" onChange={handleChange}
          className="w-full border p-2 mb-4 rounded"
        />

        <input type="password" placeholder="Password" name="password" onChange={handleChange}
        className="w-full border p-2 mb-4 rounded"
        />

        <button className="bg-black text-white w-full py-2 rounded">
          Login
        </button>

        <p className="mt-4 text-center">
          Don't have account?

          <Link to="/signup" className="text-blue-500 ml-1">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;