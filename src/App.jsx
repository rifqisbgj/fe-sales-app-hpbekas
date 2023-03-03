import { Route, Routes } from "react-router-dom";
import MainNav from "./components/navbar/MainNav";
import Home from "./pages/home/Home";
import SellingList from "./pages/selling-list-product/SellingList";
export default function App() {
  return (
    <div className="bg-gray-100">
      <MainNav />
      <Routes>
        {/* Home page */}
        <Route index element={<Home />} />
        {/* Selling list product */}
        <Route path="products" element={<SellingList />} />
      </Routes>
    </div>
  );
}
