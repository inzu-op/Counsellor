import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";

const New = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [rollno, setRollno] = useState("");
  const [branch, setBranch] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 1500);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(""), 1500);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      name,
      rollno: Number(rollno), // Convert rollno to number
      branch,
    };

    console.log("Sending Data:", userData); // Debugging

    try {
      const res = await axios.post("http://localhost:3000/newuser", userData);
      console.log("Response:", res.data);
      setSuccess("Student added successfully!");
      setName("");
      setRollno("");
      setBranch("");
    } catch (error) {
      console.error("Error:", error.response?.data);
      setError("Failed to add student. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#7E22CE] to-[#22D3EE]">
      {/* Rotating Blurry Gradient Layers */}
      <div className="absolute top-1/2 left-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg,#ff9aa2,#ffb7b2,#ffdac1,#e2f0cb,#a2e4ff,#c9afff,#ffb7b2,#ff9aa2)] -translate-x-1/2 -translate-y-1/2 animate-rotate blur-[50px] opacity-80"></div>
      <div className="absolute top-1/2 left-1/2 w-[180%] h-[180%] bg-[conic-gradient(from_0deg,#ff9aa2,#ffb7b2,#ffdac1,#e2f0cb,#a2e4ff,#c9afff,#ffb7b2,#ff9aa2)] -translate-x-1/2 -translate-y-1/2 animate-rotate-reverse blur-[50px] opacity-60"></div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[70px] left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-8 py-3 rounded-md shadow-md"
          >
            {error}
          </motion.div>
        )}
        {success && (
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[70px] left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-8 py-3 rounded-md shadow-md"
          >
            {success}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white backdrop-blur-lg text-black p-8 rounded-xl shadow-xl w-96 space-y-5 border border-white/20"
      >
        <h2 className="text-3xl font-bold text-center mb-4">New Student</h2>

        {/* Description */}
        <p className="text-sm text-gray-600 text-center mb-6">
          Welcome! Please fill in the details below to register a students  . Ensure all fields are
          filled accurately to avoid errors.
        </p>

        {/* Name Field */}
        <div className="relative">
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="peer mt-1 block w-full px-4 py-3 border border-gray-300 font-poppins rounded-lg shadow-sm placeholder:text-transparent text-black outline-none focus:outline focus:outline-[#3498db] focus:border-[#3498db] transition-all"
            placeholder="Name"
            required
          />
          <label
            htmlFor="name"
            className={`absolute left-5 text-sm font-poppins transition-all duration-200 pointer-events-none ${
              name ? "top-[-10px] text-[12px] text-[#3498db]" : "top-4 text-base text-[#7f8c8d]"
            } bg-white px-1`}
          >
            Full Name
          </label>
        </div>

        {/* Roll Number Field */}
        <div className="relative">
          <input
            id="rollno"
            type="number"
            value={rollno}
            onChange={(e) => setRollno(e.target.value)}
            className="peer mt-1 block w-full px-4 py-3 border border-gray-300 font-poppins rounded-lg shadow-sm placeholder:text-transparent text-black outline-none focus:outline focus:outline-[#3498db] focus:border-[#3498db] transition-all"
            placeholder="Roll No"
            required
          />
          <label
            htmlFor="rollno"
            className={`absolute left-5 text-sm font-poppins transition-all duration-200 pointer-events-none ${
              rollno ? "top-[-10px] text-[12px] text-[#3498db]" : "top-4 text-base text-[#7f8c8d]"
            } bg-white px-1`}
          >
            Roll No
          </label>
        </div>

        {/* Branch Field */}
        <div className="relative">
          <input
            id="branch"
            type="text"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="peer mt-1 block w-full px-4 py-3 border border-gray-300 font-poppins rounded-lg shadow-sm placeholder:text-transparent text-black outline-none focus:outline focus:outline-[#3498db] focus:border-[#3498db] transition-all"
            placeholder="Branch"
            required
          />
          <label
            htmlFor="branch"
            className={`absolute left-5 text-sm font-poppins transition-all duration-200 pointer-events-none ${
              branch ? "top-[-10px] text-[12px] text-[#3498db]" : "top-4 text-base text-[#7f8c8d]"
            } bg-white px-1`}
          >
            Branch
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-green-400 text-black p-2 rounded-lg font-bold mt-4 shadow-lg hover:scale-105 transition-transform"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default New;