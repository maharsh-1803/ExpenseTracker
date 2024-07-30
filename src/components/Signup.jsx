import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {toast,ToastContainer} from 'react-toastify'
import { BASE_URL } from "../config";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URL}/api/User/addUser`,
        { name, email, password }
      );
      if(response.status>=200){
        toast.success('Register successfully')
        setTimeout(() => {
          navigate('/AddExpense')
        }, 1500);
      }
      console.log(response)
    } catch (error) {
      toast.error("Error in Registration")
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <ToastContainer/>
      <div className="w-full max-w-md p-8 space-y-11 bg-white rounded-lg shadow-md">
        <h1 className="font-bold text-2xl text-center">SingUp</h1>
        <form onSubmit={handlesubmit}>
        <div className="flex flex-col space-y-1">
            <label
              htmlFor="name"
              className="text-sm font-semibold text-gray-600"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="email" className="font-semibold text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="password" className="font-semibold text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter password"
              value={password}
              onChange={(e)=>{setPassword(e.target.value)}}
            />
          </div>
          <div className="flex justify-center mt-4">
            <button className="border rounded-lg bg-blue-400 text-white py-2 px-4 hover:bg-blue-500 focus:outline-none foucs:ring-2 focus:ring-blue-500">SignUp</button>
            <Link to="/Login" className="px-4 py-2 ml-11 hover:underline text-blue-400 ">Already have account ? </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
