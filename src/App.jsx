import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Home from "./pages/home/Home";
import ListProduct from "./pages/list-product/ListProduct";
import Dashboard from "./pages/dashboard/Dashboard";
import DataUsers from "./pages/auth/manage-users/DataUsers";
import DataProducts from "./pages/auth/manage-products/DataProducts";
import UpdateProduct from "./components/manage-products/UpdateProduct";
import CreateProduct from "./components/manage-products/CreateProduct";
import ViewProduct from "./components/manage-products/ViewProduct";
import DataTransaction from "./pages/auth/manage-transaction/DataTransaction";
import DetailTransaction from "./pages/auth/manage-transaction/DetailTransaction";
import CreateTransaction from "./pages/auth/manage-transaction/CreateTransaction";
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
        {/* Manage users */}
        <Route path="dashboard/users" element={<DataUsers />} />
        {/* Manage Product */}
        <Route path="dashboard/produk" element={<DataProducts />} />
        <Route path="dashboard/produk/edit/:slug" element={<UpdateProduct />} />
        <Route path="dashboard/produk/view/:slug" element={<ViewProduct />} />
        <Route path="dashboard/produk/create" element={<CreateProduct />} />
        {/* Manage Transaction */}
        <Route path="dashboard/transaksi" element={<DataTransaction />} />
        <Route
          path="dashboard/transaksi/view/:invoice"
          element={<DetailTransaction />}
        />
        <Route
          path="dashboard/transaksi/create"
          element={<CreateTransaction />}
        />
      </Routes>
    </BrowserRouter>
  );
}
