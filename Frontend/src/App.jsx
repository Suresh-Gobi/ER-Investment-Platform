import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";

//Import Pages
import Home from "./Pages/Home/Home";
import Signup from "./Pages/Signup/Signup";
import Login from "./Pages/Login/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";
import AdminLogin from "./Pages/Login/AdminLogin";
import AdminDash from "./Pages/Dashboard/AdminDashboard"
import InvestorDashboard from "./Pages/Dashboard/InvestorDashboard";

//test
// import Project from "./Components/Investment/Menus/ProjectDetails/myProject";
import Projects from "./Components/Admin/Menus/Projects";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/singup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admindashboard" element={<AdminDash />} />
        <Route path="/investordashboard" element={<InvestorDashboard />} />

        <Route path="/projects" element={<Projects />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
