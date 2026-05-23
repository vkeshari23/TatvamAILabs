import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import api from "../api/api";

function Signup() {
  const navigate = useNavigate();

  const [data, setData] =
    useState({
      name: "",
      email: "",
      password: "",
      cpassword: "",
    });

  const [errors, setErrors] =
    useState({});

  const handleChange = (e) => {
    setData({...data,[e.target.name]:e.target.value})

    setErrors({...errors,[e.target.name]: ""})
  };

  const validate = () => {
    let newErrors = {}

    if (!data.name.trim()) {
      newErrors.name ="Name is required";
    }

    if (!data.email.trim()) {
      newErrors.email ="Email is required";
    }

    if (!data.password.trim()) {
      newErrors.password ="Password is required";
    }

    if (!data.cpassword.trim()) {
      newErrors.cpassword ="Confirm Password is required";
    }

    else if (data.password !==data.cpassword) {
      newErrors.cpassword ="Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      await api.post("/auth/signup",data)
      navigate("/");
    } catch (error) {
      console.log(error);

      alert("Signup Failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow w-[350px]"
      >
        <h1 className="text-3xl font-bold mb-5 text-center">
          Signup
        </h1>

        {/* name */}
        <div className="mb-3">
          <label className="font-medium">
            Name
            <span className="text-red-500">*</span>
          </label>

          <input type="text" name="name" value={data.name} onChange={handleChange} placeholder="Enter Name"
            className="w-full border p-2 rounded mt-1"
          />

          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.name}
            </p>
          )}
        </div>

        {/* email */}
        <div className="mb-3">
          <label className="font-medium">
            Email
            <span className="text-red-500">*</span>
          </label>

          <input type="email" name="email" value={data.email} onChange={handleChange} placeholder="Enter Email"
            className="w-full border p-2 rounded mt-1"
          />

          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email}
            </p>
          )}
        </div>

        {/* password */}
        <div className="mb-3">
          <label className="font-medium">
            Password
            <span className="text-red-500">* </span>
          </label>

          <input
            type="password" name="password" value={data.password} onChange={handleChange} placeholder="Enter Password"
            className="w-full border p-2 rounded mt-1"
          />

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label className="font-medium">
            Confirm Password
            <span className="text-red-500">*</span>
          </label>

          <input type="password" name="cpassword" value={data.cpassword} onChange={handleChange} placeholder="Confirm Password"
            className="w-full border p-2 rounded mt-1"
          />

          {errors.cpassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.cpassword}
            </p>
          )}
        </div>
        
        <button className="bg-black text-white w-full py-2 rounded">
          Signup
        </button>

        {/* Login Link */}
        <p className="mt-4 text-center">
          Already have account?

          <Link
            to="/"
            className="text-blue-500 ml-1"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;