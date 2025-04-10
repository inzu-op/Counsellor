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
      rollno: Number(rollno),
      branch,
    };

    try {
      const res = await axios.post("http://localhost:3000/newuser", userData);
      setSuccess("Student added successfully!");
      setName("");
      setRollno("");
      setBranch("");
    } catch (error) {
      setError("Failed to add student. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#7E22CE] to-[#22D3EE]">
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
            className="absolute top-16 sm:top-20 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md shadow-md text-sm sm:text-base max-w-[90%]"
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
            className="absolute top-16 sm:top-20 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md shadow-md  sm:text-base max-w-[90%] text-[8px] font-bold md:text-[15px]"
          >
            {success}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white/90 backdrop-blur-lg text-black p-6 sm:p-8 rounded-xl shadow-xl w-full max-w-md space-y-4 border border-white/20"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3 sm:mb-4">
          New Student
        </h2>

        {/* Description */}
        <p className="text-xs sm:text-sm text-gray-600 text-center mb-4 sm:mb-6">
          Welcome! Please fill in the details below to register a student. Ensure all fields are
          filled accurately to avoid errors.
        </p>

        {/* Name Field */}
        <div className="relative">
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="peer mt-1 block w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg shadow-sm placeholder:text-transparent text-black outline-none focus:outline focus:outline-[#3498db] focus:border-[#3498db] transition-all text-sm sm:text-base"
            placeholder="Name"
            required
          />
          <label
            htmlFor="name"
            className={`absolute left-3 text-xs sm:text-sm transition-all duration-200 pointer-events-none ${
              name ? "top-[-10px] text-[10px] sm:text-[12px] text-[#3498db]" : "top-2 sm:top-3 text-sm sm:text-base text-[#7f8c8d]"
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
            className="peer mt-1 block w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg shadow-sm placeholder:text-transparent text-black outline-none focus:outline focus:outline-[#3498db] focus:border-[#3498db] transition-all text-sm sm:text-base"
            placeholder="Roll No"
            required
          />
          <label
            htmlFor="rollno"
            className={`absolute left-3 text-xs sm:text-sm transition-all duration-200 pointer-events-none ${
              rollno ? "top-[-10px] text-[10px] sm:text-[12px] text-[#3498db]" : "top-2 sm:top-3 text-sm sm:text-base text-[#7f8c8d]"
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
            className="peer mt-1 block w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg shadow-sm placeholder:text-transparent text-black outline-none focus:outline focus:outline-[#3498db] focus:border-[#3498db] transition-all text-sm sm:text-base"
            placeholder="Branch"
            required
          />
          <label
            htmlFor="branch"
            className={`absolute left-3 text-xs sm:text-sm transition-all duration-200 pointer-events-none ${
              branch ? "top-[-10px] text-[10px] sm:text-[12px] text-[#3498db]" : "top-2 sm:top-3 text-sm sm:text-base text-[#7f8c8d]"
            } bg-white px-1`}
          >
            Branch
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-green-400 hover:bg-green-500 text-black p-2 sm:p-3 rounded-lg font-bold mt-4 sm:mt-6 shadow-lg hover:scale-105 transition-transform text-sm sm:text-base"
        >
          Submit
        </button>
      </motion.form>
    </div>
  );
};

export default New;