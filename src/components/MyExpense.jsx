import axios from "axios";
import { useEffect, useState } from "react";
import { FaTrashAlt } from 'react-icons/fa';
import { BASE_URL } from "../config";
import { FaEdit } from 'react-icons/fa'; // Example of FontAwesome icon
import Modal from "./Modal";


const MyExpense = () => {
  const [expenses, setExpense] = useState([]);
  const [totalAmount,setTotalAmount] = useState(null);
  const [isModalOpen,setIsModalOpen] = useState(false)
  const [currentExpense,setCurrentExpense] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/Expense/getAllExpense`,
          {
            headers: { authorization: localStorage.getItem("token") },
          }
        );
        setExpense(response.data.expenses)
        setTotalAmount(response.data.totalAmount)
      } catch (error) {
        console.log(error)
      }
    };
    fetchData();
  }, []);
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/api/Expense/deleteExpense/${id}`,
        {
          headers: {
            authorization: localStorage.getItem('token')
          }
        }
      );
      const newExpenses = expenses.filter(expense => expense._id !== id);
      setExpense(newExpenses);

      const newTotalAmount = newExpenses.reduce((acc, expense) => acc + expense.amount, 0);
      setTotalAmount(newTotalAmount);

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleEdit = (expense) => {
    setCurrentExpense(expense);
    setIsModalOpen(true);
  }

  const handleModalClose = () => {
    setIsModalOpen(false);
    setCurrentExpense(null);
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${BASE_URL}/api/Expense/editExpense/${currentExpense._id}`, currentExpense, {
        headers: { authorization: localStorage.getItem("token") },
      });
      setExpense(expenses.map(exp => exp._id === currentExpense._id ? response.data.expense : exp));
      setTotalAmount(expenses.reduce((acc, exp) => acc + exp.amount, 0));
      handleModalClose();
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (e) => {
    setCurrentExpense({
      ...currentExpense,
      [e.target.name]: e.target.value,
    });
  }
  

  return (
    <div className="container mx-auto p-4">
        <div className="grid grid-flow-row md:grid-cols-3 gap-4">
        {expenses && expenses.map((expense)=>(
            <div className="border p-4 shadow-md rounded-lg" key={expense._id}>
            <p className="font-bold text-xl">{expense.title}</p>
            <p className="font-semibold text-lg text-gray-700">{expense.description}</p>
            <p className="font-semibold text-gray-700">{expense.category}</p>
            <p className="font-semibold text-gray-700">Rs.{expense.amount}</p>
            <FaTrashAlt className="hover:cursor-pointer float-end" onClick={()=>handleDelete(expense._id)}/>
            <FaEdit className="hover:cursor-pointer float-end mr-2" onClick={() => handleEdit(expense)} />
          </div>
        ))}
      </div>
        <p className="font-bold mt-4">This month Total Expense : {totalAmount}</p>
        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <form onSubmit={handleUpdate}>
          <h3 className="text-xl font-bold mb-4">Update Expense</h3>
          <input
            type="text"
            name="title"
            value={currentExpense?.title || ''}
            onChange={handleChange}
            placeholder="Title"
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            name="category"
            value={currentExpense?.category || ''}
            onChange={handleChange}
            placeholder="Category"
            className="border p-2 mb-2 w-full"
          />
          <input
            type="number"
            name="amount"
            value={currentExpense?.amount || ''}
            onChange={handleChange}
            placeholder="Amount"
            className="border p-2 mb-2 w-full"
          />
          <textarea
            name="description"
            value={currentExpense?.description || ''}
            onChange={handleChange}
            placeholder="Description"
            className="border p-2 mb-2 w-full"
          ></textarea>
          <button type="submit" className="bg-sky-700 text-white px-4 py-2 rounded">Update</button>
        </form>
      </Modal>

    </div>
  );
};

export default MyExpense;
