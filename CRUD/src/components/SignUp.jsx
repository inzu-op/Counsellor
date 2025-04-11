import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

function SignUp() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState({ text: '', type: '' });

    axios.defaults.withCredentials = true;
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!name || !email || !password) {
            setMessage({ text: "Please fill in all fields!", type: "error" });
            setTimeout(() => setMessage({ text: "", type: "" }), 2000);
            return;
        }
        axios.post("https://a-8-rgdf.onrender.com/signup", { name, email, password })
            .then(result => {
                if (result.data === "success") {
                    setMessage({ text: "Signup successful! Redirecting...", type: "success" });
                    setTimeout(() => navigate("/Login"), 2000);
                }
            })
            .catch(err => {
                setMessage({ text: err.message, type: "error" });
            });
    };

    return (
        <div className="h-screen w-full p-6 flex justify-center items-center bg-gradient-to-br from-[#3498db] to-[#2c3e50] font-poppins">
            <AnimatePresence>
                {message.text && (
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className={`fixed top-10 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-md text-white shadow-lg z-50 ${
                            message.type === "success" ? "bg-green-500" : "bg-red-500"
                        }`}
                    >
                        {message.text}
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="w-full max-w-md p-6 md:p-8 text-black rounded-xl shadow-2xl bg-white">
                <div className="text-center">
                    <h1 className="text-xl font-poppins text-[#2c3e50] font-bold mb-2 md:text-3xl">Create Your Account</h1>
                    <p className="text-[12px] text-[#7f8c8d] md:text-sm">Join us to get started with your journey.</p>
                </div>
                <form className="mt-4 md:mt-6 space-y-4 md:space-y-5">
                    <div className="relative">
                        <input
                            id="name"
                            type="text"
                            className="peer mt-1 block w-full px-3 py-2 md:px-4 md:py-2 border border-gray-300 font-poppins rounded-lg shadow-sm text-black outline-none focus:outline-[#3498db] focus:border-[#3498db] transition-all text-sm md:text-base"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <label htmlFor="name" className={`absolute left-3 md:left-4 text-sm transition-all bg-white pointer-events-none ${name ? "top-[-8px] text-[10px] text-[#3498db]" : "top-3 text-[12px] md:text-base text-[#7f8c8d]"}`}>Full Name</label>
                    </div>
                    <div className="relative">
                        <input
                            id="email"
                            type="email"
                            className="peer mt-1 block w-full px-3 py-2 md:px-4 md:py-2 border border-gray-300 font-poppins rounded-lg shadow-sm text-black outline-none focus:outline-[#3498db] focus:border-[#3498db] transition-all text-sm
                            md:text-base"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label htmlFor="email" className={`absolute left-3 md:left-4 text-sm transition-all bg-white px-1 ${email ? "top-[-8px] text-[10px] text-[#3498db]" : "top-3 text-[12px] md:text-base text-[#7f8c8d]"}`}>Email Address</label>
                    </div>
                    <div className="relative">
                        <input
                            id="password"
                            type="password"
                            className="peer mt-1 block w-full px-3 py-2 md:px-4 md:py-2  border border-gray-300 font-poppins rounded-lg shadow-sm text-black outline-none focus:outline-[#3498db] focus:border-[#3498db] transition-all text-sm md:text-base"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <label htmlFor="password" className={`absolute left-3 md:left-4 text-sm transition-all bg-white px-1 ${password ? "top-[-8px] text-[10px] text-[#3498db]" : "top-3 text-[12px] md:text-base text-[#7f8c8d]"}`}>Password</label>
                    </div>
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="w-full flex justify-center py-3 px-4 border border-transparent font-poppins rounded-lg shadow-md text-sm font-medium text-white bg-[#3498db] hover:bg-[#2980b9] focus:outline-none focus:ring-2 focus:ring-[#3498db] focus:ring-opacity-50 transition-all transform hover:scale-105"
                    >
                        Sign Up
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-sm text-[#7f8c8d] font-poppins">
                        Already Have an Account?{' '}
                        <Link to="/Login" className="text-[#3498db] hover:text-[#2980b9] font-semibold underline text-[11px] md:text-sm">Login Here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
