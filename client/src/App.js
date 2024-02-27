import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/login/Login";
// import Navbar from "./components/navbar/Navbar";
import Register from "./components/register/Register";
import CustomSharedLayout from "./components/pages/CustomSharedLayout";
import Dashboard from "./components/pages/Dashboard";
import Inventory from "./components/pages/Inventory";
import Reports from "./components/pages/Reports";
import Suppliers from "./components/pages/Suppliers";
import Activityhistory from "./components/pages/Activityhistory";
import Inventorysummary from "./components/pages/Inventorysummary";
import CategoryOverview from "./components/cards/CategoryOverview/CategoryOverview";
import ItemOverview from "./components/cards/ItemOverview/ItemOverview";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<CustomSharedLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="inventory/category" element={<CategoryOverview />} />
          <Route path="inventory/category/item" element={<ItemOverview />} />
          <Route path="reports" element={<Reports />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="reports/activityhistory" element={<Activityhistory />} />
          <Route
            path="reports/inventorysummary"
            element={<Inventorysummary />}
          />
        </Route>
      </Routes>
      {/* <CustomSharedLayout />
      <div>
      <Routes></Routes>
      </div> */}
    </BrowserRouter>
  );
}

export default App;
