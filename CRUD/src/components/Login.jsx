// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       setError("Please fill in all fields.");
//       return;
//     }

//     try {
//       const result = await axios.post("http://localhost:3000/login", { email, password });
//       console.log(result.data)
//       if (result.data.message === "success") {
//         navigate("/dashboard");
//       } else {
//         setError("Login failed. Please try again.");
//       }
//     } catch (err) {
//       console.error("Login failed:", err.response?.data || err.message);
//       setError(err.response?.data?.message || "Login failed. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
//         <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Login</h2>

//         {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

//         <div className="mb-4">
//           <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             value={email} // ✅ Always defined
//             onChange={(e) => setEmail(e.target.value)}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter your email"
//           />
//         </div>

//         <div className="mb-6">
//           <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//             Password
//           </label>
//           <input
//             type="password"
//             id="password"
//             value={password} // ✅ Always defined
//             onChange={(e) => setPassword(e.target.value)}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter your password"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;