import React, { useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bigImage from "../Pics/dark-academia-final.jpg";
import logo from "../Pics/Book-icon.png";
import { register } from "../api/auth";

const Register = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { mutate } = useMutation({
    mutationKey: ["Register"],
    mutationFn: () => register(userInfo),
    onSuccess: () => {
      setUser(true);
      navigate("/book-collection");
      toast.success("Registration successful!");
      setIsLoading(false);
    },
    onError: () => {
      toast.error("Registration failed. Please check your details.");
      setIsLoading(false);
    },
  });

  const handleChange = (e) => {
    setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (userInfo.password !== userInfo.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    setIsLoading(true);
    mutate();
  };

  const logout = () => {
    toast.info("Logging out...");
    localStorage.removeItem("token");
    setUser(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-charcoal-gray text-white font-serif">
      <ToastContainer />
      <main className="flex flex-col items-center justify-center text-center p-6 w-full">
        <div className="flex items-center justify-center space-x-6 max-w-7xl w-full">
          <div className="w-1/2">
            <img src={bigImage} alt="Library" className="w-full h-auto" />
          </div>
          <div className="w-1/2 flex flex-col items-center justify-center p-6">
            <h2 className="text-3xl mb-5 text-white">Register</h2>
            <p className="mb-5 text-white">
              Already have an account?{" "}
              <Link to="/login" className="text-forest-green underline">
                Login here
              </Link>
            </p>
            <form onSubmit={handleFormSubmit} className="w-full max-w-md">
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block mb-2 text-white text-left"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={userInfo.username}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-forest-green rounded-md focus:outline-none focus:border-forest-green bg-charcoal-gray text-white"
                  required
                />
              </div>
              <div className="mb-4 relative">
                <label
                  htmlFor="password"
                  className="block mb-2 text-white text-left"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={userInfo.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-forest-green rounded-md focus:outline-none focus:border-forest-green bg-charcoal-gray text-white"
                  required
                />
              </div>
              <div className="mb-4 relative">
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-white text-left"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={userInfo.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-forest-green rounded-md focus:outline-none focus:border-forest-green bg-charcoal-gray text-white"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-forest-green text-white rounded-md hover:bg-green-700 focus:outline-none flex items-center justify-center"
              >
                {isLoading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4zm2 5.291A7.964 7.964 0 0112 20a8 8 0 010-16v8H6v5.291z"
                    ></path>
                  </svg>
                ) : (
                  "Register"
                )}
              </button>
            </form>
          </div>
        </div>
      </main>
      <div className="text-center text-gray-400 text-sm mt-2 mb-4">
        © 2024 Aya's Library. All rights reserved.
      </div>
    </div>
  );
};

export default Register;
