import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// start comp dashboard
import CompDashboardAdminQC from "../../components/dashboard/CompDashboardAdminQC";
import CompDashboardAdminSale from "../../components/dashboard/CompDashboardAdminSale";
import CompDashboardSuper from "../../components/dashboard/CompDashboardSuper";
// end comp dashboard
// layout dashboard
import LayoutDashboard from "../../components/layout/LayoutDashboard";
import { GetUserByToken } from "../../features/authSlice";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // ambil data isError untuk pengecekan status ambil data user, dan var user untuk data user login
  const { isError, user } = useSelector((state) => state.auth);

  // pengambilan data user pertama kali
  useEffect(() => {
    // ambil data user
    dispatch(GetUserByToken());
  }, [dispatch]);

  // validasi akses ke dashboard, jika user tidak ditemukan
  useEffect(() => {
    // jika error, maka arahkan ke halaman utama
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  return (
    <>
      <LayoutDashboard>
        {/* jika rolenya super admin */}
        {user && user.data.role === "super" ? <CompDashboardSuper /> : ""}
        {/* jika rolenya adminQC */}
        {user && user.data.role === "adminQC" ? <CompDashboardAdminQC /> : ""}
        {/* jika rolenya adminSale */}
        {user && user.data.role === "adminSale" ? (
          <CompDashboardAdminSale />
        ) : (
          ""
        )}
      </LayoutDashboard>
    </>
  );
};

export default Dashboard;
