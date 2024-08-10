import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Layout from "./Layout";
import EmployeeForm from "./components/EmployeeForm";
import Employees from "./components/Employees";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<EmployeeForm />}/>
          <Route path="employees" element={<Employees />}/>
          <Route path="*" element={<div>404</div>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
