import React from 'react';
import { useState ,useEffect } from 'react';
import { Link  ,useNavigate} from 'react-router-dom';
import axios from 'axios';


function SignUp() {
    const Navigate = useNavigate()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    axios.defaults.withCredentials = true
    const handleSubmit = (event) => {
      event.preventDefault();
      if (!name || !email || !password) {
        setError("Please fill in all fields !!");
        setTimeout(() => {
          setError(null);
        }, 2000);
        return;
      }
      axios.post("http://localhost:3000/signup",{name,email,password})
      .then(result => {console.log(result)
        if(result.data === "success"){
          Navigate("/Login")
        }
      })
      .catch(err => {
        setError(err.message);
        console.log(err)
      })
    }
  
    return (
        <div className="h-screen w-full flex justify-center items-center bg-gray-300 font-poppins">
            <div className="w-full max-w-md p-8 text-black backdrop-blur-3xl rounded-3xl shadow-lg border border-white/20 bg-white h-[500px]">
                <div className="text-center">
                    <h1 className="text-4xl font-poppins text-black">New User</h1>
                    <p className="text-black">Please Sign Up to Create  a user</p>
                </div>
                <form className="mt-3 space-y-6">
                <div>
                        <label htmlFor="email" className="block text-sm font-medium text-black font-poppins">
                            Name
                        </label>
                        <input
                            id="name"
                            type="name"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 font-poppins rounded-md shadow-sm placeholder:text-gray-400 text-black focus:outline-2"
                            placeholder="Enter your email"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-black font-poppins">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 font-poppins rounded-md shadow-sm placeholder:text-gray-400 text-black focus:outline-2"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-black font-poppins">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 text-black focus:outline-2"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="w-full flex justify-center py-2 px-4 border border-transparent font-poppins rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 transition-transform transform hover:scale-105">
                        Sign Up
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-sm text-black font-poppins">
                        Already Have a Account ?{' '}
                        <Link to="/Login" className="text-black hover:text-gray-600 underline ">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignUp;