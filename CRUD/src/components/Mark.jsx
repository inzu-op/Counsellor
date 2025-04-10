import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Mark = () => {
  const { id, semester } = useParams();
  const [subject, setSubject] = useState("");
  const [marks, setMarks] = useState("");
  const [grade, setGrade] = useState("");
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
      ...(category === "sem" && { grade }),
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
      <div className="relative bg-white shadow-xl rounded-2xl p-4 sm:p-6 w-full max-w-md border border-gray-300 mx-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-black text-center mb-4 sm:mb-6">
          Enter Marks
        </h1>

        {error && (
          <p className="text-red-500 text-center mb-4 text-sm sm:text-base">
            {error}
          </p>
        )}

        <p className="text-black text-center mb-4 text-sm sm:text-base">
          Please fill in the details below to enter the marks for the subject.
        </p>

        <form className="space-y-3 sm:space-y-4">
          {/* Subject Input */}
          <div className="relative">
            <input
              id="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="peer mt-1 block w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg shadow-sm placeholder:text-transparent text-black outline-none focus:outline focus:outline-[#3498db] focus:border-[#3498db] transition-all text-sm sm:text-base"
              placeholder=" "
              required
            />
            <label
              htmlFor="subject"
              className={`absolute left-3 text-xs sm:text-sm transition-all duration-200 pointer-events-none ${
                subject
                  ? "top-[-10px] text-[10px] sm:text-[12px] text-[#3498db]"
                  : "top-2 sm:top-3 text-sm sm:text-base font-medium"
              } bg-white px-1`}
            >
              Subject
            </label>
          </div>

          {/* Marks Input */}
          <div className="relative">
            <input
              id="marks"
              type="number"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
              className="peer mt-1 block w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg shadow-sm placeholder:text-transparent text-black outline-none focus:outline focus:outline-[#3498db] focus:border-[#3498db] transition-all text-sm sm:text-base"
              placeholder=" "
              min="0"
              max="100"
              required
            />
            <label
              htmlFor="marks"
              className={`absolute left-3 text-xs sm:text-sm transition-all duration-200 pointer-events-none ${
                marks
                  ? "top-[-10px] text-[10px] sm:text-[12px] text-[#3498db]"
                  : "top-2 sm:top-3 text-sm sm:text-base font-medium"
              } bg-white px-1`}
            >
              Marks
            </label>
          </div>

          {/* Grade Input */}
          <div className="relative">
            <input
              id="grade"
              type="text"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="peer mt-1 block w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg shadow-sm placeholder:text-transparent text-black outline-none focus:outline focus:outline-[#3498db] focus:border-[#3498db] transition-all text-sm sm:text-base"
              placeholder=" "
              required
            />
            <label
              htmlFor="grade"
              className={`absolute left-3 text-xs sm:text-sm transition-all duration-200 pointer-events-none ${
                grade
                  ? "top-[-10px] text-[10px] sm:text-[12px] text-[#3498db]"
                  : "top-2 sm:top-3 text-sm sm:text-base font-medium"
              } bg-white px-1`}
            >
              Grade
            </label>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-3 sm:mt-4">
            <button
              type="button"
              className="bg-red-500 text-white py-2 rounded-lg shadow-md transition-all hover:bg-red-600 hover:shadow-red-400/50 text-sm sm:text-base"
              onClick={handleSubmit("cat1")}
            >
              CAT1
            </button>
            <button
              type="button"
              className="bg-yellow-500 text-white py-2 rounded-lg shadow-md transition-all hover:bg-yellow-600 hover:shadow-yellow-400/50 text-sm sm:text-base"
              onClick={handleSubmit("cat2")}
            >
              CAT2
            </button>
            <button
              type="button"
              className="bg-green-500 text-white py-2 rounded-lg shadow-md transition-all hover:bg-green-600 hover:shadow-green-400/50 text-sm sm:text-base"
              onClick={handleSubmit("model")}
            >
              MODEL
            </button>
            <button
              type="button"
              className="bg-blue-500 text-white py-2 rounded-lg shadow-md transition-all hover:bg-blue-600 hover:shadow-blue-400/50 text-sm sm:text-base"
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