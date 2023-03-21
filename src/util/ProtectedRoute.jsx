import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { GetUserByToken } from "../features/authSlice";

const ProtectedRoute = ({ role }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [access, setAccess] = useState(false);
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
    // check user have access to route
    if (user && !role.includes(user.data.role)) {
      return navigate("/403-forbidden");
    }
    setAccess(true);
  }, [isError, user, role, access, navigate]);

  // show component of route
  return user && access ? <Outlet /> : "";
};

export default ProtectedRoute;
