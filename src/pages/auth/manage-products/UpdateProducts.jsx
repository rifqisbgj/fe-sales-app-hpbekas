import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetUserByToken } from "../../../features/authSlice";
import UpdateProduct from "../../../components/manage-products/UpdateProduct";
import LayoutDashboard from "../../../components/layout/LayoutDashboard";

const UpdateProducts = () => {
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
  }, [isError, navigate]);

  return (
    <LayoutDashboard>
      <UpdateProduct />
    </LayoutDashboard>
  );
};

export default UpdateProducts;
