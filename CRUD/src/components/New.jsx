import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const New = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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

    if (!name || !email || !branch) {
      setError("Fill the Above Form ");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/newuser", {
        name,
        email,
        branch,
      });
      console.log(response);
      setSuccess("User created successfully");
      setName("");
      setEmail("");
      setBranch("");
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#7E22CE] to-[#22D3EE] 
    before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(90deg,transparent_50px,#ffb4b8_50px,#ffb4b8_52px,transparent_52px),linear-gradient(#e1e1e1_0.1em,transparent_0.1em)] before:bg-[100%_30px] before:opacity-30">

      {/* Rotating Blurry Gradient Layer 1 */}
      <div className="absolute top-1/2 left-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg,#ff9aa2,#ffb7b2,#ffdac1,#e2f0cb,#a2e4ff,#c9afff,#ffb7b2,#ff9aa2)] 
      -translate-x-1/2 -translate-y-1/2 animate-rotate blur-[50px] opacity-80"></div>

      {/* Rotating Blurry Gradient Layer 2 (Reverse Direction) */}
      <div className="absolute top-1/2 left-1/2 w-[180%] h-[180%] bg-[conic-gradient(from_0deg,#ff9aa2,#ffb7b2,#ffdac1,#e2f0cb,#a2e4ff,#c9afff,#ffb7b2,#ff9aa2)] 
      -translate-x-1/2 -translate-y-1/2 animate-rotate-reverse blur-[50px] opacity-60"></div>

      {/* Your Content Here */}
      <div className="relative z-10 text-white text-3xl font-bold"></div>

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
        className="bg-gray-400 backdrop-blur-lg text-black p-8 rounded-xl shadow-xl w-96 space-y-5 border border-white/20"
      >
        <h2 className="text-3xl font-bold text-center mb-4">New Student</h2>

        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
           className="w-full p-2 mt-1 border rounded-lg bg-black text-white placeholder-white focus:bg-white focus:text-black focus:outline-none transition duration-500"
            placeholder="Enter your name"
          />
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
           className="w-full p-2 mt-1 border rounded-lg bg-black text-white placeholder-white focus:bg-white focus:text-black focus:outline-none transition duration-500"
            placeholder="Enter your email"
          />
        </div>

        {/* Branch Field */}
        <div>
  <label className="block text-sm font-medium">Branch</label>
  <input
    type="text"
    value={branch}
    onChange={(e) => setBranch(e.target.value)}
    className="w-full p-2 mt-1 border rounded-lg bg-black text-white placeholder-white focus:bg-white focus:text-black focus:outline-none transition duration-500"
    placeholder="Enter your branch"
  />
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
