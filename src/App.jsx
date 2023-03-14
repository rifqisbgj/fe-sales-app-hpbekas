import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Home from "./pages/home/Home";
import ListProduct from "./pages/list-product/ListProduct";
import Dashboard from "./pages/dashboard/Dashboard";
import DataUsers from "./pages/auth/manage-users/DataUsers";
import DataProducts from "./pages/auth/manage-products/DataProducts";
import UpdateProduct from "./components/manage-products/UpdateProduct";
import CreateProduct from "./components/manage-products/CreateProduct";
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
        <Route path="dashboard/users" element={<DataUsers />} />
        <Route path="dashboard/produk" element={<DataProducts />} />
        <Route path="dashboard/produk/edit/:slug" element={<UpdateProduct />} />
        <Route path="dashboard/produk/create" element={<CreateProduct />} />
      </Routes>
    </BrowserRouter>
  );
}
