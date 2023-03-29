import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import apiAdapter from "../../api/apiAdapter";
import ChartBrandTerlaris from "../chart/ChartBrandTerlaris";
import ChartPenjualan from "../chart/ChartPenjualan";
import ChartVarianTerlaris from "../chart/ChartVarianTerlaris";

const CompDashboardSuper = () => {
  const { user } = useSelector((state) => state.auth);
  // token access for header Authorization
  const [token, setToken] = useState("");
  // token expire
  const [expire, setExpire] = useState("");
  const [dataDashboard, setData] = useState({
    totalPendapatan: null,
    totalSiapJual: null,
    totalSudahQC: null,
    totalBelumQC: null,
    totalAdmin: null,
    totalCustomer: null,
    totalTerjual: null,
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
    const dataTotal = await apiAdapter.get("/dashboard/pendapatan", {
      headers: { Authorization: access },
    });
    const siapJual = await apiAdapter.get("/dashboard/prdReady", {
      headers: { Authorization: access },
    });
    const admin = await apiAdapter.get("/dashboard/totalAdmin", {
      headers: { Authorization: access },
    });
    const customer = await apiAdapter.get("/dashboard/totalCustomer", {
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
    // product terjual
    const sold = await apiAdapter.get("/dashboard/prdSold", {
      headers: { Authorization: access },
    });
    setData({
      totalPendapatan: dataTotal.data.data[0].sum,
      totalSiapJual: siapJual.data.data,
      totalAdmin: admin.data.data,
      totalCustomer: customer.data.data,
      totalSudahQC: notReady.data.data,
      totalBelumQC: notQC.data.data,
      totalTerjual: sold.data.data[0].jmlproduk,
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

        <h4 class="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">
          Rangkuman Toko
        </h4>
        {/* Rangkuman toko start */}
        <div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-3">
          <div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
            <div class="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
              </svg>
            </div>
            <div>
              <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Customer
              </p>
              <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                {dataDashboard && dataDashboard.totalCustomer !== 0
                  ? dataDashboard.totalCustomer + " Customer"
                  : "Belum Tersedia"}
              </p>
            </div>
          </div>
          <div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
            <div class="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-blue-300">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
              </svg>
            </div>
            <div>
              <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Admin
              </p>
              <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                {dataDashboard && dataDashboard.totalAdmin !== 0
                  ? dataDashboard.totalAdmin + " Admin Toko"
                  : "Belum Tersedia"}
              </p>
            </div>
          </div>
          <div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
            <div class="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <div>
              <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Pendapatan
              </p>
              <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                Rp.{" "}
                {dataDashboard.totalPendapatan !== 0 &&
                  parseInt(dataDashboard.totalPendapatan).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        {/* Rangkuman toko end */}
        <h4 class="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">
          Rangkuman Produk
        </h4>
        {/* Rangkuman produk */}
        <div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-2">
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

        <h4 class="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">
          Grafik Penjualan
        </h4>
        <div class="grid gap-6 mb-8 md:grid-cols-1">
          <div class="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
            <h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">
              Pendapatan Minggu Ini
            </h4>
            <div>{token && <ChartPenjualan token={token} />}</div>
          </div>
        </div>
        <div class="grid gap-6 mb-8 md:grid-cols-2">
          <div class="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
            <h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">
              Brand Terlaris
            </h4>
            {token && <ChartBrandTerlaris token={token} />}
          </div>
          <div class="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
            <h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">
              Varian Terlaris
            </h4>
            {token && <ChartVarianTerlaris token={token} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompDashboardSuper;
