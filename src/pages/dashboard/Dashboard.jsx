import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetUserByToken, Logout, reset } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  // ambil data isError untuk pengecekan status ambil data user, dan var user untuk data user login
  const { isError, user } = useSelector((state) => state.auth);

  // pengambilan data user pertama kali
  useEffect(() => {
    dispatch(GetUserByToken());
  }, [dispatch]);

  // validasi akses ke dashboard, jika user tidak ditemukan
  useEffect(() => {
    // jika error, maka arahkan ke halaman utama
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  // logout handler
  const logout = () => {
    // jika user ada, maka jalankan setelah && (berikan data email)
    dispatch(Logout({ email: user && user.email }));
    // reset user state
    dispatch(reset());
    // arahkan ke login
    navigate("/login");
  };

  return <button onClick={logout}>{user && user.nama}</button>;
};

export default Dashboard;
