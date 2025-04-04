import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [showLanding, setShowLanding] = useState(false);
  const [bgBlack, setBgBlack] = useState(false);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !password) {
      setMessage({ text: "Please fill in all fields!", type: "error" });
      setTimeout(() => setMessage({ text: "", type: "" }), 2000);
      return;
    }

    axios
      .post("http://localhost:3000/login", { email, password })
      .then((result) => {
        if (result.data.Status === "success") {
          if (result.data.role === "admin") {
            setMessage({ text: "Login successful!", type: "success" });
            setTimeout(() => setBgBlack(true), 500);
            setTimeout(() => setShowLanding(true), 1000);
            setTimeout(() => navigate("/dashboard"), 6000);
          } else {
            setMessage({ text: "Sorry, you are not an admin.", type: "error" });
          }
        } else {
          setMessage({
            text: "No user Found",
            type: "error",
          });
        }
        setTimeout(() => setMessage({ text: "", type: "" }), 2000);
      })
      .catch(() => {
        setMessage({ text: "Login failed. Please check your Data.", type: "error" });
        setTimeout(() => setMessage({ text: "", type: "" }), 2000);
      });
  };

  if (showLanding) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="h-screen w-full flex flex-col justify-center items-center bg-black text-white font-poppins"
      >
        <h1 className="text-4xl font-bold">Welcome, Admin!</h1>
        <p className="text-lg mt-2">Redirecting you to the dashboard...</p>
      </motion.div>
    );
  }

  return (
    <div className={`bg-gradient-to-br from-[#3498db] to-[#2c3e50] h-screen w-full flex justify-center items-center font-poppins transition-colors duration-1000 ${bgBlack ? "bg-black" : "bg-white"}`}>
      <AnimatePresence>
        {message.text && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-10 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-md text-white shadow-lg z-50 ${
              message.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {message.text}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-md p-8 text-black rounded-xl shadow-2xl bg-white">
        <div className="text-center">
          <h1 className="text-3xl font-poppins text-[#2c3e50] font-bold mb-2">Welcome Back</h1>
          <p className="text-sm text-[#7f8c8d]">Login to continue your journey.</p>
        </div>
        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          <div className="relative">
            <input
              id="email"
              type="email"
              className="peer mt-1 block w-full px-4 py-3 border border-gray-300 font-poppins rounded-lg shadow-sm placeholder:text-transparent text-black outline-none focus:outline focus:outline-[#3498db] focus:border-[#3498db] transition-all"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label
              htmlFor="email"
              className={`absolute left-5 text-sm font-poppins transition-all duration-200 pointer-events-none ${
                email ? "top-[-10px] text-[12px] text-[#3498db]" : "top-4 text-base text-[#7f8c8d]"
              } bg-white px-1`}
            >
              Email Address
            </label>
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              id="password"
              type="password"
              className="peer mt-1 block w-full px-4 py-3 border border-gray-300 font-poppins rounded-lg shadow-sm placeholder:text-transparent text-black outline-none focus:outline focus:outline-[#3498db] focus:border-[#3498db] transition-all"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label
              htmlFor="password"
              className={`absolute left-5 text-sm font-poppins transition-all duration-200 pointer-events-none ${
                password ? "top-[-10px] text-[12px] text-[#3498db]" : "top-4 text-base text-[#7f8c8d]"
              } bg-white px-1`}
            >
              Password
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent font-poppins rounded-lg shadow-md text-sm font-medium text-white bg-[#3498db] hover:bg-[#2980b9] focus:outline-none focus:ring-2 focus:ring-[#3498db] focus:ring-opacity-50 transition-all transform hover:scale-105"
          >
            Login
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-[#7f8c8d] font-poppins">
            Don't Have an Account?{' '}
            <Link to="/" className="text-[#3498db] hover:text-[#2980b9] font-semibold underline">Sign Up Here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;