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
import ShowVarian from "./pages/auth/manage-varian/ShowVarian";
import PageNotFound from "./pages/error-page/PageNotFound";
import Forbidden from "./pages/error-page/Forbidden";
import ProtectedRoute from "./util/ProtectedRoute";
import Redirect from "./util/Redirect";
import Detail from "./pages/list-product/Detail";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home page */}
        <Route index element={<Home />} />
        {/* Selling list product */}
        <Route path="products" element={<ListProduct />} />
        <Route path="products/:slug" element={<Detail />} />

        {/* Auth */}
        <Route path="login" element={<Login />} />

        {/* Only Super Admin can access: 
         - Users Menu */}
        <Route element={<ProtectedRoute role={["super"]} />}>
          {/* Manage users */}
          <Route path="dashboard/users" element={<DataUsers />} />
        </Route>

        {/* All roles can access: 
         - Dashboard
         - Product (edit, view, create) */}
        <Route
          element={<ProtectedRoute role={["super", "adminSale", "adminQC"]} />}
        >
          <Route path="dashboard" element={<Dashboard />} />
          {/* Manage Product */}
          <Route path="dashboard/produk" element={<DataProducts />} />
          <Route
            path="dashboard/produk/edit/:slug"
            element={<UpdateProducts />}
          />
          <Route path="dashboard/produk/view/:slug" element={<ViewProduct />} />
          <Route path="dashboard/produk/create" element={<CreateProducts />} />
        </Route>

        {/* Only Super Admin, Admin Sale can access: 
         - Transaction
         - View invoice
         - Create Transaction
         - Varian */}
        <Route element={<ProtectedRoute role={["super", "adminSale"]} />}>
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
          {/* Varian */}
          <Route path="dashboard/varian" element={<DataVarian />} />
          <Route path="dashboard/varian/view/:id" element={<ShowVarian />} />
        </Route>

        {/* Only Super Admin, Admin QC can access: 
         - Quality Control */}
        <Route element={<ProtectedRoute role={["super", "adminQC"]} />}>
          <Route path="dashboard/quality-control" element={<DataQC />} />
        </Route>

        {/* Not Found Page */}
        <Route path="404" element={<PageNotFound />} />
        {/* Forbidden Page */}
        <Route path="403-forbidden" element={<Forbidden />} />
        <Route path="*" element={<Redirect to={"/404"} />} />
      </Routes>
    </BrowserRouter>
  );
}
