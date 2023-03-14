import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LayoutDashboard from "../../../components/layout/LayoutDashboard";
import ListProduct from "../../../components/manage-products/ListProduct";
import { GetUserByToken } from "../../../features/authSlice";

const DataProducts = () => {
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
        <ListProduct />
      </LayoutDashboard>
    </>
  );
};

export default DataProducts;
