import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Home from "./pages/home/Home";
import ListProduct from "./pages/list-product/ListProduct";
import Dashboard from "./pages/dashboard/Dashboard";
import DataUsers from "./pages/auth/manage-users/DataUsers";
import DataProducts from "./pages/auth/manage-products/DataProducts";
import ViewProduct from "./components/manage-products/ViewProduct";
import DataTransaction from "./pages/auth/manage-transaction/DataTransaction";
import DetailTransaction from "./pages/auth/manage-transaction/DetailTransaction";
import CreateTransaction from "./pages/auth/manage-transaction/CreateTransaction";
import DataQC from "./pages/auth/manage-qc/DataQC";
import DataVarian from "./pages/auth/manage-varian/DataVarian";
import UpdateProducts from "./pages/auth/manage-products/UpdateProducts";
import CreateProducts from "./pages/auth/manage-products/CreateProducts";
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
        <Route
          path="dashboard/produk/edit/:slug"
          element={<UpdateProducts />}
        />
        <Route path="dashboard/produk/view/:slug" element={<ViewProduct />} />
        <Route path="dashboard/produk/create" element={<CreateProducts />} />
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
        <Route path="dashboard/quality-control" element={<DataQC />} />
        <Route path="dashboard/varian" element={<DataVarian />} />
      </Routes>
    </BrowserRouter>
  );
}
