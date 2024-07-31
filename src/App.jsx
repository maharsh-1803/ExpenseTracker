import './App.css';
import AddExpense from './components/AddExpense';
import Home from './components/Home';
import Login from './components/Login';
import MyExpense from './components/MyExpense';
import Signup from './components/Signup';
import { Routes, Route } from 'react-router-dom';

function App() {
  
  return (
    <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AddExpense" element={<Home><AddExpense /></Home>} />
          <Route path="/MyExpense" element={<Home><MyExpense /></Home>} />
          <Route path="/Login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
    </Routes>
  );
}

export default App;
