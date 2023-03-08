import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Home from "./pages/home/Home";
import ListProduct from "./pages/list-product/ListProduct";
import Dashboard from "./pages/dashboard/Dashboard";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home page */}
        <Route index element={<Home />} />
        {/* Selling list product */}
        <Route path="products" element={<ListProduct />} />

        {/* Auth */}
        <Route path="login" element={<Login />} />

        {/* Super Admin */}
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
