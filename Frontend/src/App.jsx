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
import GeoLocationAlaysis from "./Components/Investment/Menus/Analysis/GeoLocationAnalysis";
import PlantManage from "./Components/Admin/Menus/Plant/PlantManage";
import GetPlant from "./Components/Admin/Menus/Plant/GetPlant";
import AllProjects from "./Components/Investor/Menus/Project/AllProjects";

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
        <Route path="/geo" element={<GeoLocationAlaysis />} />
        <Route path="/plant" element={<PlantManage />} />
        <Route path="/getplant" element={<GetPlant />} />
        <Route path="/allprojects" element={<AllProjects />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
