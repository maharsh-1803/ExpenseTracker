import axios from "axios";
import { useEffect, useState } from "react";
import { FaTrashAlt } from 'react-icons/fa';
import { BASE_URL } from "../config";

const MyExpense = () => {
  const [expenses, setExpense] = useState([]);
  const [totalAmount,setTotalAmount] = useState(null);
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
          </div>
        ))}
      </div>
        <p className="font-bold mt-4">This month Total Expense : {totalAmount}</p>
    </div>
  );
};

export default MyExpense;
