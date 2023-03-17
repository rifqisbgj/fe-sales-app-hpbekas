import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiAdapter from "../../api/apiAdapter";
import privateApi from "../../api/privateApi";

const ListTransaction = () => {
  // token access for header Authorization
  const [token, setToken] = useState("");
  // token expire
  const [expire, setExpire] = useState("");
  const [transaksi, setDataTransaksi] = useState([]);

  const navigate = useNavigate();

  useEffect(
    () => {
      // jalankan refresh token untuk mengambil token dan expired
      refreshToken();
      // mengambil data transaksi
      getTransaction();
    }, // data akan direfresh jika status success berubah
    []
  );

  //   refresh token for access route
  const refreshToken = async () => {
    try {
      // ambil token user
      const response = await apiAdapter.get("/users/token", {
        withCredentials: true,
      });
      // setToken
      setToken(response.data.data.token);
      // decode dari token yang sudah diambil
      const decoded = jwtDecode(response.data.data.token);
      // set expire token
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        navigate("/");
      }
    }
  };

  // config before take a request
  privateApi.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      // jika token expired, maka ambil kembali token yang baru

      if (expire * 1000 < currentDate.getTime()) {
        const res = await apiAdapter.get("/users/token", {
          withCredentials: true,
        });
        // set token yang baru
        setToken(res.data.data.token);
        // masukkan pada headers Authorization
        config.headers.Authorization = res.data.data.token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  //   get all transaction
  const getTransaction = async () => {
    const res = await privateApi.get("/transaksi", {
      headers: { Authorization: token },
    });
    console.log(res);
    // set state transaksi
    setDataTransaksi(res.data.data);
  };

  return (
    <div class="container grid px-6 mx-auto">
      <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Data Transaksi
      </h2>

      <div class="w-full overflow-hidden rounded-lg shadow-xs">
        <button
          onClick={() => navigate("/dashboard/transaksi/create")}
          class="px-4 py-2 mb-4 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
        >
          Tambah Transaksi
        </button>
        <div class="w-full overflow-x-auto rounded-md">
          <table class="table-auto w-full whitespace-no-wrap overflow-scroll">
            <thead>
              <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                <th class="px-4 py-3">No</th>
                <th class="px-4 py-3">Nama Pelanggan</th>
                <th class="px-4 py-3">Varian Item</th>
                <th class="px-4 py-3">Total Beli</th>
                <th class="px-4 py-3">Tanggal Transaksi</th>
                <th class="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
              {transaksi.map((trx, indx) => (
                <tr class="text-gray-700 dark:text-gray-400" key={indx}>
                  <td class="px-4 py-3 text-sm">{indx + 1}</td>
                  <td class="px-4 py-3 text-sm">
                    {trx.transaksiCustomer.nama}
                  </td>
                  <td class="px-4 py-3 text-sm">
                    <ul>
                      {trx.detail.map((item) => (
                        <li key={item.id}>- {item.varianProduk.namavarian}</li>
                      ))}
                    </ul>
                  </td>
                  <td class="px-4 py-3 text-sm">
                    Rp
                    {trx.detail
                      .reduce(
                        (total, currentItem) =>
                          (total = total + currentItem.harga),
                        0
                      )
                      .toLocaleString()}
                  </td>
                  <td class="px-4 py-3 text-sm">
                    {moment(trx.createdAt).format("LL")}
                  </td>
                  <td class="px-4 py-3 text-sm">
                    <div class="flex items-center space-x-4 text-sm">
                      {/* Detail */}
                      <Link
                        class="flex cursor-pointer bg-blue-600 items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-white rounded-lg  focus:outline-none focus:shadow-outline-gray"
                        aria-label="Edit"
                        to={`/dashboard/transaksi/view/${trx.kode_invoice}`}
                      >
                        Detail Transaksi
                      </Link>
                      {/* End Button Detail */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListTransaction;
