import './App.css'
import AddExpense from './components/AddExpense'
import Home from './components/Home'
import Login from './components/Login'
import MyExpense from './components/MyExpense'
import Signup from './components/Signup'
import { Routes,Route } from 'react-router-dom'

function App() {
  

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/AddExpense' element={<Home><AddExpense/></Home>}></Route>
        <Route path='/MyExpense' element={<Home><MyExpense/></Home>}></Route>
        <Route path='/Login' element={<Login/>}></Route>
        <Route path='/register' element={<Signup/>}></Route>
      </Routes>
    </>
  )
}

export default App
