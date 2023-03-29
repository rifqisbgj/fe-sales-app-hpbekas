import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import apiAdapter from "../../api/apiAdapter";
import ChartBrandTerlaris from "../chart/ChartBrandTerlaris";
import ChartPenjualan from "../chart/ChartPenjualan";
import ChartVarianTerlaris from "../chart/ChartVarianTerlaris";

const CompDashboardAdminQC = () => {
  const { user } = useSelector((state) => state.auth);
  // token access for header Authorization
  const [token, setToken] = useState("");
  // token expire
  const [expire, setExpire] = useState("");
  const [dataDashboard, setData] = useState({
    totalSiapJual: 0,
    totalSudahQC: 0,
    totalBelumQC: 0,
    totalTerjual: 0,
    totalQC: 0,
  });

  useEffect(() => {
    getDataDashboard();
  }, []);

  const refreshToken = async () => {
    try {
      // ambil token user
      const response = await apiAdapter.get("/users/token", {
        withCredentials: true,
      });
      // setToken
      setToken(response.data.data.token);
      return response.data.data.token;
    } catch (error) {
      if (error.response) {
        navigate("/");
      }
    }
  };

  const getDataRekap = async (access) => {
    const qcByAdmin = await apiAdapter.get("/dashboard/qcByAdmin", {
      headers: { Authorization: access },
    });
    const siapJual = await apiAdapter.get("/dashboard/prdReady", {
      headers: { Authorization: access },
    });
    // product belum QC
    const notQC = await apiAdapter.get("/dashboard/prdNotQC", {
      headers: { Authorization: access },
    });
    // product belum siap dijual namun sudah QC
    const notReady = await apiAdapter.get("/dashboard/prdNotReady", {
      headers: { Authorization: access },
    });
    // product belum siap dijual namun sudah QC
    const sold = await apiAdapter.get("/dashboard/prdSold", {
      headers: { Authorization: access },
    });
    setData({
      totalSiapJual: siapJual.data.data,
      totalSudahQC: notReady.data.data,
      totalBelumQC: notQC.data.data,
      totalTerjual: sold.data.data[0].jmlproduk,
      totalQC: qcByAdmin.data.data,
    });
  };

  const getDataDashboard = async () => {
    await refreshToken().then((res) => {
      getDataRekap(res);
    });
  };

  return (
    <div>
      <div class="container px-6 mx-auto grid">
        <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
          Dashboard
        </h2>
        <div class="grid gap-6 mb-8 md:grid-cols-1 xl:grid-cols-1">
          <div class="flex flex-col items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
            <div class="p-3 mr-4 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-green-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-14 h-14"
              >
                <path
                  fillRule="evenodd"
                  d="M9 1.5H5.625c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5zm6.61 10.936a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 14.47a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                  clipRule="evenodd"
                />
                <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
              </svg>
            </div>
            <div className="text-center mt-3">
              <span className="text-white text-xl font-bold">Hi! </span>

              <span className="text-white text-xl">{user.data.nama}</span>
              <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                Kamu Telah Melakukan Quality Control
              </p>
              <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                {dataDashboard && dataDashboard.totalQC !== 0
                  ? dataDashboard.totalQC + " Produk"
                  : "Belum Tersedia"}
              </p>
            </div>
          </div>
        </div>
        <h4 class="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">
          Rangkuman Produk
        </h4>
        {/* Rangkuman produk */}
        <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
          <div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
            <div class="p-3 mr-4 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M10.5 18.75a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" />
                <path
                  fillRule="evenodd"
                  d="M8.625.75A3.375 3.375 0 005.25 4.125v15.75a3.375 3.375 0 003.375 3.375h6.75a3.375 3.375 0 003.375-3.375V4.125A3.375 3.375 0 0015.375.75h-6.75zM7.5 4.125C7.5 3.504 8.004 3 8.625 3H9.75v.375c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125-.504 1.125-1.125V3h1.125c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-6.75A1.125 1.125 0 017.5 19.875V4.125z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                Produk Belum Quality Control
              </p>
              <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                {dataDashboard && dataDashboard.totalBelumQC !== 0
                  ? dataDashboard.totalBelumQC + " Produk"
                  : "Belum Tersedia"}
              </p>
            </div>
          </div>
          <div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
            <div class="p-3 mr-4 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M10.5 18.75a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" />
                <path
                  fillRule="evenodd"
                  d="M8.625.75A3.375 3.375 0 005.25 4.125v15.75a3.375 3.375 0 003.375 3.375h6.75a3.375 3.375 0 003.375-3.375V4.125A3.375 3.375 0 0015.375.75h-6.75zM7.5 4.125C7.5 3.504 8.004 3 8.625 3H9.75v.375c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125-.504 1.125-1.125V3h1.125c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-6.75A1.125 1.125 0 017.5 19.875V4.125z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                Produk Selesai Quality Control
              </p>
              <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                {dataDashboard && dataDashboard.totalSudahQC !== 0
                  ? dataDashboard.totalSudahQC + " Produk"
                  : "Belum Tersedia"}
              </p>
            </div>
          </div>
          <div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
            <div class="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M10.5 18.75a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" />
                <path
                  fillRule="evenodd"
                  d="M8.625.75A3.375 3.375 0 005.25 4.125v15.75a3.375 3.375 0 003.375 3.375h6.75a3.375 3.375 0 003.375-3.375V4.125A3.375 3.375 0 0015.375.75h-6.75zM7.5 4.125C7.5 3.504 8.004 3 8.625 3H9.75v.375c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125-.504 1.125-1.125V3h1.125c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-6.75A1.125 1.125 0 017.5 19.875V4.125z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                Produk Siap Jual
              </p>
              <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                {dataDashboard && dataDashboard.totalSiapJual !== 0
                  ? dataDashboard.totalSiapJual
                  : "Belum Tersedia"}
              </p>
            </div>
          </div>
          <div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
            <div class="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full dark:text-teal-100 dark:bg-green-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M10.5 18.75a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" />
                <path
                  fillRule="evenodd"
                  d="M8.625.75A3.375 3.375 0 005.25 4.125v15.75a3.375 3.375 0 003.375 3.375h6.75a3.375 3.375 0 003.375-3.375V4.125A3.375 3.375 0 0015.375.75h-6.75zM7.5 4.125C7.5 3.504 8.004 3 8.625 3H9.75v.375c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125-.504 1.125-1.125V3h1.125c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-6.75A1.125 1.125 0 017.5 19.875V4.125z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                Produk Terjual
              </p>
              <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                {dataDashboard && dataDashboard.totalTerjual !== 0
                  ? dataDashboard.totalTerjual + " Produk"
                  : "Belum Tersedia"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompDashboardAdminQC;
