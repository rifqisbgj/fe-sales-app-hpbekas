import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetUserByToken } from "../../../features/authSlice";
import LayoutDashboard from "../../../components/layout/LayoutDashboard";
import ListTransaction from "../../../components/manage-transaction/ListTransaction";

const DataTransaction = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

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
    if (user && user.data.role === "adminQC") {
      navigate("/");
    }
  }, [isError, navigate]);
  return (
    <LayoutDashboard>
      <ListTransaction />
    </LayoutDashboard>
  );
};

export default DataTransaction;
