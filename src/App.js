import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import {Link} from 'react-router-dom';

import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './user/Login';
import Signup from './user/Signup';
import ForgotPassword from './user/ForgotPassword';
import Employee from './user/Employee';
import Home from "./user/Home";
import Bank from "./user/Bank";
import Salary from "./user/Salary";
function App() {
  
  return (
    
    <BrowserRouter>
    
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/ForgotPassword" element={<ForgotPassword />}></Route>
        <Route path="/Employee" element={<Employee/>}></Route>
        <Route path="/Salary" element={<Salary/>}></Route>
        <Route path="/Bank" element={<Bank/>}></Route>
        <Route path="/Home" element={<Home/>}></Route>
      </Routes>
      <p style={{fontSize:10,color:'white'}}> <Link id="link" to="/Login">Login Page </Link></p>
    </BrowserRouter>
  
  );
}

export default App;
