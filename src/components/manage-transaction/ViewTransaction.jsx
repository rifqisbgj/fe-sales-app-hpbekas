import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import apiAdapter from "../../api/apiAdapter";
import privateApi from "../../api/privateApi";

const ViewTransaction = () => {
  // token access for header Authorization
  const [token, setToken] = useState("");
  // state detail transaksi
  const [dataTransaksi, setData] = useState();

  const navigate = useNavigate();
  // get invoice from params
  const { invoice } = useParams();

  useEffect(() => {
    getDetail();
  }, []);

  // get fresh access token
  const refreshToken = async () => {
    try {
      // ambil token user
      const response = await apiAdapter.get("/users/token", {
        withCredentials: true,
      });
      // setToken
      return response.data.data.token;
    } catch (error) {
      if (error.response) {
        navigate("/");
      }
    }
  };

  // get detail transaction
  const detailTransaksi = async (token) => {
    try {
      // get detail transaction, find by invoice code
      const res = await privateApi.get(`/transaksi/detail/${invoice}`, {
        headers: { Authorization: token },
      });
      const data = await res.data.data;
      setData(data);
    } catch (error) {
      if (error.response) {
        navigate("/");
      }
    }
  };

  const getDetail = async () => {
    // mengambil token terlebih dulu
    await refreshToken().then((res) => {
      // passing token ke detail transaksi
      detailTransaksi(res);
    });
  };

  return (
    <div className="container grid px-6 mx-auto">
      <nav class="flex my-6" id="breadcrumb" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          <li class="inline-flex items-center">
            <Link
              to={"/dashboard"}
              class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
            >
              <svg
                aria-hidden="true"
                class="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
              </svg>
              Home
            </Link>
          </li>
          <li>
            <div class="flex items-center">
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <Link
                to={"/dashboard/transaksi"}
                class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
              >
                Transaksi
              </Link>
            </div>
          </li>
          <li aria-current="page">
            <div class="flex items-center">
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                Detail Transaksi
              </span>
            </div>
          </li>
        </ol>
      </nav>
      <h2 class="my-3 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Detail Transaksi
      </h2>
      <div class="bg-gray-800 shadow-md text-white rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="" className="text-sm text-gray-300">
              Nama Pelanggan
            </label>
            <p className="mt-1 font-bold text-lg">
              {dataTransaksi && dataTransaksi.transaksiCustomer.nama}
            </p>
            <label htmlFor="" className="text-sm text-gray-300 mt-2">
              No Telp Pelanggan
            </label>
            <p className="mt-1 font-bold text-lg">
              {dataTransaksi && dataTransaksi.transaksiCustomer.notelp}
            </p>
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="text-sm text-gray-300">
              Kode Invoice
            </label>
            <p className="mt-1 font-bold text-lg">
              {dataTransaksi && dataTransaksi.kode_invoice}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-fixed">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3 w-4">
                    No
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Nama Varian
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Harga
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Menampilkan list barang yang dibeli */}
                {dataTransaksi &&
                  dataTransaksi.detail.map((item, index) => (
                    <tr
                      class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      key={index}
                    >
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {index + 1}
                      </th>
                      <td class="px-6 py-4">
                        <span className="font-semibold">
                          {item.varianProduk.namavarian}
                        </span>{" "}
                        <br />
                        <span className="text-xs">
                          {item.kodeproduk} - IMEI : {item.imei}
                        </span>
                      </td>
                      <td class="px-6 py-4">
                        Rp. {item.harga.toLocaleString()}
                      </td>
                    </tr>
                  ))}
              </tbody>
              <thead class=" text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th colSpan={2} scope="col" class="px-6 py-3">
                    Total Harga
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Rp. {/* menghitung total pembelian */}
                    {dataTransaksi &&
                      dataTransaksi.detail
                        .reduce(
                          (total, currentItem) =>
                            (total = total + currentItem.harga),
                          0
                        )
                        .toLocaleString()}
                  </th>
                </tr>
              </thead>
            </table>
            <button
              onClick={() => window.print()}
              class="px-4 py-2 mt-4 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-primary border border-transparent rounded-lg"
              id="btn-print"
            >
              <div className="flex flex-row">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 pr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z"
                  />
                </svg>
                Print
              </div>
            </button>
          </div>
        </div>
        <div
          className="py-4 px-4 mt-3 text-sm font-medium tracking-tight hidden text-gray-600 rounded-md md:text-sm"
          id="alamat"
        >
          <hr className="pb-4" />
          <span className="font-bold">BAGJA CELL</span>
          <br />
          Mulyasari, Kec. Bayongbong, Kabupaten Garut, Jawa Barat 44162 <br />
          082116620263
        </div>
      </div>
    </div>
  );
};

export default ViewTransaction;
