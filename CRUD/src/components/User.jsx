import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const User = () => {
  const navigate = useNavigate();
  const [data, setdata] = useState([]);
  const [search, setSearch] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get("https://a-8-rgdf.onrender.com/dashboard")
      .then((res) => {
        setdata(res.data);
      })
      .catch((err) => {
        console.log("Error fetching dashboard:", err.response?.data || err.message);
        navigate("/Login");
      });
  }, []);

  const filteredData = data.filter((row) => {
    const searchTerm = search.toLowerCase();
    return (
      (row.name && row.name.toLowerCase().includes(searchTerm)) ||
      (row.rollno && row.rollno.toString().includes(searchTerm)) ||
      (row.branch && row.branch.toLowerCase().includes(searchTerm))
    )
  });

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3000/delete/" + id)
      .then((result) => {
        console.log(result);
        setdata(data.filter((row) => row._id !== id));
        setShowConfirm(false);
      })
      .catch((err) => console.log(err));
  };

  const openConfirmModal = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const closeConfirmModal = () => {
    setShowConfirm(false);
  };

  return (
    <div className="p-4 min-h-screen flex flex-col items-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      <h1 className="text-2xl sm:text-4xl font-extrabold mb-6 bg-clip-text bg-gradient-to-r text-yellow-200">
        Student Table
      </h1>
     <div className="flex justify-centre items-center">
      <div className="w-[600px] max-w-2xl px-4 ">
        <input
          type="text"
          placeholder="Search..."
          className="w-full border p-1 rounded-md md:p-2 bg-white/20 text-white text-[13px] md:text-[16px] placeholder-gray-300 focus:ring-2 focus:ring-yellow-100 transition"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="">
        <Link
          to="/new"
          className="rounded px-4 py-2 bg-[#E7CFDD]  text-black font-md"
        >
          Add Student
        </Link>
      </div>
     </div>
  

      {showConfirm && (
        <motion.div
          className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="bg-white p-4 md:p-8 rounded-lg shadow-lg w-full max-w-xs sm:w-96 h-48 text-center "
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-black font-semibold mt-4 text-sm md:text-md">
              Are you sure you want to delete this user?
            </p>
            <div className="flex justify-around mt-16 md:mt-10">
              <button
                onClick={closeConfirmModal}
                className="bg-gray-500 text-white px-3 md:px-3 py-2 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-700"
              >
                Confirm
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      <div className="w-full overflow-x-auto px-4 mt-10">
        <table className="min-w-full bg-white/10 backdrop-blur-lg shadow-lg border border-white/30 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-white/20 text-white">
              <th className="py-3 text-[11px] px-2 md:text-[16px] sm:px-6 border-b border-white/30 text-center ">Rollno</th>
              <th className="py-3 px-2 text-[10px] md:text-[16px] sm:px-6 border-b border-white/30 text-center">Name</th>
              <th className="py-3 px-2  text-[10px] md:text-[16px] sm:px-6 border-b border-white/30 text-center">Branch</th>
              <th className="py-3 px-2 text-[10px] md:text-[16px] sm:px-6 border-b border-white/30 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/30">
            {filteredData.length > 0 ? (
              filteredData.map((row) => (
                <tr key={row._id} className="hover:bg-white/20 transition">
                  <td className="py-3 px-2 text-[10px] md:text-[16px] sm:px-6 border-b border-white/30 text-center">{row.rollno}</td>
                  <td className="py-3 px-2 text-[10px] md:text-[16px] sm:px-6 border-b border-white/30 text-center">{row.name}</td>
                  <td className="py-3 px-2 text-[10px] md:text-[16px] sm:px-6 border-b border-white/30 text-center">{row.branch}</td>
                  <td className="py-4 px-2 text-[10px] md:text-[16px] sm:px-6 border-b border-white/30 flex flex-wrap justify-center gap-2">
                    <Link
                      to={`/edit/${row._id}`}
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition text-[11px] sm:text-base"
                    >
                      Edit
                    </Link>
                    <Link
                      to={`/Statistic/${row._id}/${encodeURIComponent(row.name)}`}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition text-[11px] sm:text-base"
                    >
                      Statistic
                    </Link>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-[11px] sm:text-base"
                      onClick={() => openConfirmModal(row._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-3 px-6 text-center text-white/80 font-medium">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
