import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Mark = () => {
  const { id, semester } = useParams();
  const [subject, setSubject] = useState("");
  const [marks, setMarks] = useState("");
  const [Grade, setGrade] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (category) => (e) => {
    e.preventDefault();

    if (!subject || !marks) {
      setError("Please fill in all fields.");
      return;
    }

    if (isNaN(marks) || marks < 0 || marks > 100) {
      setError("Marks must be a number between 0 and 100.");
      return;
    }

    setError("");

    const marksValue = parseFloat(marks);

    const data = {
      subject,
      marks: marksValue,
      ...(category === "sem" && { Grade }),
      category,
    };

    axios
      .post(`http://localhost:3000/subjects/${id}/sem${semester}`, data)
      .then((res) => {
        console.log(res);
        setSubject("");
        setMarks("");
        setGrade("");
      })
      .catch((err) => {
        console.error("API error:", err);
        setError("Failed to submit data. Please try again.");
      });
  };

  return (
    <div className="container mx-auto p-4 min-h-screen bg-gradient-to-r from-purple-300 via-blue-300 to-indigo-300 flex justify-center items-center">
      <div className="relative bg-gray-900 backdrop-blur-lg shadow-xl rounded-2xl p-6 w-full max-w-md border border-white/20">
        <h1 className="text-3xl font-extrabold text-white text-center mb-6">
          Enter Marks
        </h1>

        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

        <form className="space-y-4 ">
          <div>
            <label className="block text-white font-medium">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="mt-1 block w-full p-3 bg-white/20 text-white border border-white/30 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter subject"
            />
          </div>

          <div>
            <label className="block text-white font-medium">Marks</label>
            <input
              type="number"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
              className="mt-1 block w-full p-3 bg-white/20 text-white border border-white/30 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter marks (0-100)"
              min="0"
              max="100"
            />
          </div>

          <div>
            <label className="block text-white font-medium">Grade</label>
            <input
              type="text"
              value={Grade}
              onChange={(e) => setGrade(e.target.value)}
              className="mt-1 block w-full p-3 bg-white/20 text-white border border-white/30 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter Grade"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <button
              type="button"
              className="bg-red-500 text-white py-2 rounded-lg shadow-md transition-all hover:bg-red-600 hover:shadow-red-400/50"
              onClick={handleSubmit("cat1")}
            >
              CAT1
            </button>
            <button
              type="button"
              className="bg-yellow-500 text-white py-2 rounded-lg shadow-md transition-all hover:bg-yellow-600 hover:shadow-yellow-400/50"
              onClick={handleSubmit("cat2")}
            >
              CAT2
            </button>
            <button
              type="button"
              className="bg-green-500 text-white py-2 rounded-lg shadow-md transition-all hover:bg-green-600 hover:shadow-green-400/50"
              onClick={handleSubmit("model")}
            >
              MODEL
            </button>
            <button
              type="button"
              className="bg-blue-500 text-white py-2 rounded-lg shadow-md transition-all hover:bg-blue-600 hover:shadow-blue-400/50"
              onClick={handleSubmit("sem")}
            >
              SEM
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Mark;