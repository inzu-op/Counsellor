import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Edit = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [branch, setBranch] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/getuser/" + id)
      .then((res) => {
        setName(res.data.name);
        setEmail(res.data.email);
        setBranch(res.data.branch);
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 1500);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess("");
        navigate("/dashboard");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !branch) {
      setError("Failed to update user details.Please try again.");
      return;
    }
    axios
      .put("http://localhost:3000/edited/" + id, { name, email, branch })
      .then(() => {
        setSuccess("User details updated successfully!");
      })
      .catch(() => {
        setError("Failed to update user details. Please try again.");
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen text-black relative bg-[#DCE1E6]">
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute top-[70px] left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-20 py-3 rounded-md shadow-md"
          >
            {error}
          </motion.div>
        )}
        {success && (
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-[70px] left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-20 py-3 rounded-md shadow-md"
          >
            {success}
          </motion.div>
        )}
      </AnimatePresence>
      <form
  onSubmit={handleSubmit}
  className="bg-[#1F2937] text-white p-6 rounded-lg shadow-2xl w-96 space-y-4 border border-white/20 backdrop-blur-md"
>
        <h2 className="text-3xl font-bold text-center text-white">Edit User</h2>

        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mt-1 border rounded-lg bg-white/20 text-white placeholder-white/80 focus:ring-2 focus:ring-purple-400 outline-none"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Gmail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mt-1 border rounded-lg bg-white/20 text-white placeholder-white/80 focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Enter your Gmail"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Branch</label>
          <input
            type="text"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="w-full p-2 mt-1 border rounded-lg bg-white/20 text-white placeholder-white/80 focus:ring-2 focus:ring-teal-400 outline-none"
            placeholder="Enter your Branch"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-400 text-black p-2 rounded-lg font-bold mt-6 shadow-lg hover:scale-105 transition-transform"
        >
          Submit
        </button>
      </form>

    </div>
  );
};

export default Edit;
