import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast,ToastContainer} from 'react-toastify'
import { BASE_URL } from "../config";

const AddExpense = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(null);
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URL}/api/Expense/addExpense`,
        {
          title,
          description,
          amount,
          category,
        },
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );
      if(response.status>=200){
        toast.success('Expense added');
        setTimeout(() => {
          navigate('/MyExpense')
        }, 1500);
      }
      setAmount("");
      setCategory("");
      setDescription("");
      setTitle("");
      console.log(response.data);
    } catch (error) {
      toast.error(error)
      console.error(error);
    }
  };
  return (
    <div className="bg-gray-100 flex items-center justify-center">
      <ToastContainer/>
      <div className="border rounded-md max-w-md w-full p-10 items-center justify-center bg-white shadow-md mt-[10vh]">
        <h1 className="font-bold text-center text-2xl">Add Expense</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-2 mt-2">
            <label htmlFor="title" className="font-semibold">
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Enter Title"
              className="border focus:outline-none focus:ring-2 focus:ring-sky-400 rounded-md p-2"
              value={title}
              onChange={(e)=>{setTitle(e.target.value)}}
            />
          </div>
          <div className="flex flex-col space-y-2 mt-2">
            <label
              htmlFor="description"
              className="font-semibold text-gray-600"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              placeholder="Enter Description"
              className="border focus:outline-none focus:ring-2 rounded-md focus:ring-sky-400 p-2"
              value={description}
              onChange={(e)=>{setDescription(e.target.value)}}
            />
          </div>
          <div className="flex flex-col space-y-2 mt-2">
            <label htmlFor="category" className="font-semibold text-gray-600">
              Category
            </label>
            <select
              id="category"
              className="border focus:outline-none focus:ring-2 rounded-md focus:ring-sky-400 p-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled className="text-gray-600">Select category</option>
              <option value="Bill">Bill</option>
              <option value="Recharge">Recharge</option>
              <option value="Food">Food</option>
              <option value="Grocery">Grocery</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="flex flex-col space-y-2 mt-2">
            <label htmlFor="amount" className="font-semibold text-gray-600">
              Amount
            </label>
            <input
              type="text"
              id="amount"
              placeholder="Enter amount"
              className="border focus:outline-none focus:ring-2 focus:ring-sky-400 rounded-md p-2"
              value={amount}
              onChange={(e)=>setAmount(e.target.value)}
            />
          </div>
          <div>
            <button className="font-semibold text-gray-600 border p-2 rounded-md mt-3 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-sky-600 text-white hover:bg-sky-500">
              Add Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;
