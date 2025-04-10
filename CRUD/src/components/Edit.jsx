import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Edit = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [rollno, setRollno] = useState("");
  const [branch, setBranch] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/getuser/" + id)
      .then((res) => {
        setName(res.data.name);
        setRollno(res.data.rollno);
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
    if (!name || !rollno || !branch) {
      setError("Failed to update user details. Please try again.");
      return;
    }
    axios
      .put("http://localhost:3000/edited/" + id, { name, rollno, branch })
      .then(() => {
        setSuccess("User details updated successfully!");
      })
      .catch(() => {
        setError("Failed to update user details. Please try again.");
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 relative bg-[#DCE1E6]">
      {/* Background Blur Effect */}
      <div className="absolute inset-0 bg-[#1F2937]/50 backdrop-blur-md"></div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute top-16 sm:top-20 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md shadow-md text-[8px] font-bold sm:text-base max-w-[90%]"
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
            className="absolute top-16 sm:top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md shadow-md text-[8px] font-bold sm:text-base max-w-[90%]"
          >
            {success}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-md space-y-4 border border-gray-300"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-3 sm:mb-4">
          Edit User
        </h2>
        
        <p className="text-xs sm:text-sm text-gray-600 text-center mb-4 sm:mb-6">
          Update the user details below. Ensure all fields are filled accurately to avoid errors.
        </p>

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
              name ? "top-[-10px] text-[10px] sm:text-[12px] text-[#3498db]" : "top-2 sm:top-3 text-sm sm:text-base text-gray-500"
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
              rollno ? "top-[-10px] text-[10px] sm:text-[12px] text-[#3498db]" : "top-2 sm:top-3 text-sm sm:text-base text-gray-500"
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
              branch ? "top-[-10px] text-[10px] sm:text-[12px] text-[#3498db]" : "top-2 sm:top-3 text-sm sm:text-base text-gray-500"
            } bg-white px-1`}
          >
            Branch
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-400 text-black p-2 sm:p-3 rounded-lg font-bold mt-4 sm:mt-6 shadow-lg hover:scale-105 transition-transform text-sm sm:text-base"
        >
          Update User
        </button>
      </motion.form>
    </div>
  );
};

export default Edit;