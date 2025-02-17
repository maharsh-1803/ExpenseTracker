import { useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { useContext } from 'react';
import { AppContext } from "../../context/userContext";

const Home = ({ children }) => {
  const { state } = useContext(AppContext); // Use context to get the user data
  const navigate = useNavigate();

  const handleAddExpense = () => {
    navigate('/AddExpense');
  };

  const handleHome = () => {
    navigate('/');
  };

  const handleMyExpense = () => {
    navigate('/MyExpense');
  };

  const handleLogOut = () => {
    navigate('/Login');
    localStorage.removeItem('token');
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-sky-600 w-full h-[9vh] flex items-center justify-between px-3">
        <p className="text-white text-3xl font-bold">KYE</p>
        <p className="text-white text-lg">{state.user?.email}</p> 
      </div>
      <div className="flex w-full h-[91vh]">
        <div className="bg-sky-800 md:w-[200px] w-[120px] flex flex-col items-center space-y-3 pt-4">
          <ul className="w-full">
            <li className="font-bold text-white md:text-lg text-sm hover:text-xl text-center cursor-pointer" onClick={handleHome}>Home</li>
            <li className="font-bold text-white md:text-lg text-sm hover:text-xl text-center mt-3 cursor-pointer" onClick={handleMyExpense}>My Expense</li>
            <li className="font-bold text-white md:text-lg text-sm hover:text-xl text-center mt-3 cursor-pointer" onClick={handleAddExpense}>Add Expense</li>
          </ul>
          <p className="font-semibold text-white pt-[60vh] hover:cursor-pointer" onClick={handleLogOut}>
            <CiLogout size={40} />
          </p>
        </div>
        <div className="flex-grow p-6 bg-gray-100 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Home;
