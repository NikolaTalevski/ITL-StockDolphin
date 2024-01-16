import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Login from "./components/login/Login";
import Navbar from "./components/navbar/Navbar";
import Register from "./components/register/Register";
import CustomSharedLayout from "./components/pages/CustomSharedLayout";
import Dashboard from "./components/pages/Dashboard";
import Inventory from "./components/pages/Inventory";
import Reports from "./components/pages/Reports";
import Suppliers from "./components/pages/Suppliers";

function App() {
  return (
    <BrowserRouter>
      <CustomSharedLayout />
      {/* <div> */}
      <Routes></Routes>
      {/* </div> */}
    </BrowserRouter>
  );
}

export default App;
