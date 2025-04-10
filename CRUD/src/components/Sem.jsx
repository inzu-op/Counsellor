import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function Sem() {
  const { id, name, semester } = useParams();
  const [data, setData] = useState({
    sem1: { cat1: [], cat2: [], model: [], sem: [] },
    sem2: { cat1: [], cat2: [], model: [], sem: [] },
    sem3: { cat1: [], cat2: [], model: [], sem: [] },
    sem4: { cat1: [], cat2: [], model: [], sem: [] },
    sem5: { cat1: [], cat2: [], model: [], sem: [] },
    sem6: { cat1: [], cat2: [], model: [], sem: [] },
    sem7: { cat1: [], cat2: [], model: [], sem: [] },
    sem8: { cat1: [], cat2: [], model: [], sem: [] },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/data/${id}`);
        const firstObject = response.data?.[0];

        if (firstObject) {
          const validSemesters = [
            "sem1",
            "sem2",
            "sem3",
            "sem4",
            "sem5",
            "sem6",
            "sem7",
            "sem8",
          ];
          validSemesters.forEach((sem) => {
            if (!firstObject[sem]) {
              firstObject[sem] = { cat1: [], cat2: [], model: [], sem: [] };
            }
          });

          setData(firstObject);
        } else {
          setError("No data returned from API");
        }
      } catch (error) {
        console.error(error);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, semester]);

  const semesterData = data[`sem${semester}`];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!semesterData) {
    return (
      <div className="text-red-500">
        No data found for Semester {semester}.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 min-h-screen bg-gradient-to-r from-purple-300 via-blue-200 to-indigo-300">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-900">
        Performance of {name}
      </h1>
      <div className="flex justify-center items-center">
        <Link
          to={`/Statistic/sem/${semester}/${id}/${name}/mark`}
          className="relative mb-4 flex justify-center items-center bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800 transition duration-300 text-[13px] font-bold md:text-[16px] md:w-[400px]"
        >
          Mark Allocation
        </Link>
      </div>

      {/* Cat1 Table */}
      <div className="bg-red-100 rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4 text-red-700">Cat 1</h2>
        {semesterData.cat1.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="bg-red-200 text-[12px] md:text-[15px]">
                <th className="px-4 py-2 text-left text-red-800">Subject</th>
                <th className="px-4 py-2 text-left text-red-800">Mark</th>
                <th className="px-4 py-2 text-left text-red-800">Action</th>
              </tr>
            </thead>
            <tbody>
              {semesterData.cat1.map((item, index) => (
                <tr
                  key={`cat1-${index}`}
                  className="border-b border-gray-200 hover:bg-red-50 text-[12px] md:text-[15px] font-medium"
                >
                  <td className="px-4 py-2">{item.subject}</td>
                  <td className="px-4 py-2">{item.marks}</td>
                  <td className="px-4 py-2 flex justify-center">
                    <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded-lg transition duration-300">
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600">No data available for Cat 1.</p>
        )}
      </div>

      {/* Cat2 Table */}
      <div className="bg-yellow-100 rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4 text-yellow-700">Cat 2</h2>
        {semesterData.cat2.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="bg-yellow-200 text-[12px] md:text-[15px] font-medium">
                <th className="px-4 py-2 text-left text-yellow-800">Subject</th>
                <th className="px-4 py-2 text-left text-yellow-800">Mark</th>
                <th className="px-4 py-2 text-left text-yellow-800">Action</th>
              </tr>
            </thead>
            <tbody>
              {semesterData.cat2.map((item, index) => (
                <tr
                  key={`cat2-${index}`}
                  className="border-b border-gray-200 hover:bg-yellow-50 text-[12px] md:text-[15px] font-medium"
                >
                  <td className="px-4 py-2">{item.subject}</td>
                  <td className="px-4 py-2">{item.marks}</td>
                  <td className="px-4 py-2 flex justify-center">
                    <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded-lg transition duration-300">
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600">No data available for Cat 2.</p>
        )}
      </div>

      {/* Model Table */}
      <div className="bg-green-100 rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4 text-green-700">Model</h2>
        {semesterData.model.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="bg-green-200 text-[12px] md:text-[15px] font-medium">
                <th className="px-4 py-2 text-left text-green-800">Subject</th>
                <th className="px-4 py-2 text-left text-green-800">Mark</th>
                <th className="px-4 py-2 text-left text-green-800">Action</th>
              </tr>
            </thead>
            <tbody>
              {semesterData.model.map((item, index) => (
                <tr
                  key={`model-${index}`}
                  className="border-b border-gray-200 hover:bg-green-50 text-[12px] md:text-[15px] font-medium"
                >
                  <td className="px-4 py-2">{item.subject}</td>
                  <td className="px-4 py-2">{item.marks}</td>
                  <td className="px-4 py-2 flex justify-center">
                    <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded-lg transition duration-300">
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600">No data available for Model.</p>
        )}
      </div>

      {/* Semester Table */}
      <div className="bg-blue-100 rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">Semester</h2>
        {semesterData.sem.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="bg-blue-200 text-[12px] md:text-[15px] font-medium">
                <th className="px-4 py-2 text-left text-blue-800">Subject</th>
                <th className="px-4 py-2 text-left text-blue-800">Grade</th>
                <th className="px-4 py-2 text-left text-blue-800">Action</th>
              </tr>
            </thead>
            <tbody>
              {semesterData.sem.map((item, index) => (
                <tr
                  key={`sem-${index}`}
                  className="border-b border-gray-200 hover:bg-blue-50 text-[12px] md:text-[15px] font-medium"
                >
                  <td className="px-4 py-2">{item.subject}</td>
                  <td className="px-4 py-2">{item.Grade}</td>
                  <td className="px-4 py-2 flex justify-center">
                    <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded-lg transition duration-300">
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600">No data available for Semester.</p>
        )}
      </div>
    </div>
  );
}

export default Sem;
