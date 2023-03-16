import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiAdapter from "../../api/apiAdapter";
import privateApi from "../../api/privateApi";
import AlertSuccess from "../alert/AlertSuccess";
import ModalDeleteProduct from "./ModalDeleteProduct";

const ListProduct = () => {
  const navigate = useNavigate();
  // token access for header Authorization
  const [token, setToken] = useState("");
  // token expire
  const [expire, setExpire] = useState("");
  // jika sukses delete
  const [isScsDelete, setSczDelete] = useState(false);
  // data products
  const [dataProducts, setProducts] = useState([]);
  // modal delete
  const [showDelete, setShowDelete] = useState(false);
  // id product for delete/deactive
  const [idDelete, setIdDelete] = useState();
  // for conditional msg before delete
  const [isQc, setQcStatus] = useState(false);
  const [codeDelete, setCodeDelete] = useState(false);

  useEffect(
    () => {
      // jalankan refresh token untuk mengambil token dan expired
      refreshToken();
      // mengambil data produk
      getProducts();
    }, // data akan direfresh jika status success berubah
    [isScsDelete]
  );

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

  const getProducts = async () => {
    const res = await privateApi.get("/product");
    // set data products
    setProducts(res.data.data);
  };

  // get account data for delete, and show modal
  const deleteProduct = (kode, id, qcstatus) => {
    // set modal ke true
    setShowDelete(true);
    // set id dari produk yang akan dihapus
    setIdDelete(id);
    // set kode produk yang akan dihapus
    setCodeDelete(kode);
    // jika produk memiliki qc
    qcstatus != null ? setQcStatus(true) : setQcStatus(false);
    // reset status aksi sebelumnya
    setSczDelete(false);
  };

  return (
    <div class="container grid px-6 mx-auto">
      {/* modal delete product */}
      {showDelete && (
        <ModalDeleteProduct
          token={token}
          setShowDelete={setShowDelete}
          setSczDelete={setSczDelete}
          idDelete={idDelete}
          setIdDelete={setIdDelete}
          isQc={isQc}
          setQcStatus={setQcStatus}
          setCodeDelete={setCodeDelete}
          codeDelete={codeDelete}
        />
      )}
      <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Data Produk
      </h2>

      <div class="w-full overflow-hidden rounded-lg shadow-xs">
        <button
          onClick={() => navigate("/dashboard/produk/create")}
          class="px-4 py-2 mb-4 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
        >
          Tambah Produk
        </button>
        {/* Notif jika berhasil membuat atau menghapus data */}
        {isScsDelete && (
          <AlertSuccess msg="Berhasil menghapus atau menon-aktifkan produk" />
        )}
        <div class="w-full overflow-x-auto rounded-md">
          <table class="table-auto w-full whitespace-no-wrap overflow-scroll">
            <thead>
              <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                <th class="px-4 py-3">No</th>
                <th class="px-4 py-3">Varian</th>
                <th class="px-4 py-3">IMEI</th>
                <th className="px-4 py-3">Harga</th>
                <th className="px-4 py-3">Status</th>
                <th class="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
              {dataProducts.map((produk, indx) => (
                <tr class="text-gray-700 dark:text-gray-400" key={indx}>
                  <td class="px-4 py-3 text-sm">{indx + 1}</td>
                  <td class="px-4 py-3 text-sm">
                    {/* show status product active/no */}
                    {produk.active ? "🟢" : "🔴 "}
                    {produk.varianProduk.namavarian} -{" "}
                    {`[${produk.kodeproduk}]`}
                  </td>
                  <td class="px-4 py-3 text-sm">{produk.imei}</td>
                  <td class="px-4 py-3 text-sm">
                    {produk.harga
                      ? "Rp. " + produk.harga.toLocaleString()
                      : "Belum diatur"}
                  </td>
                  <td class="px-4 py-3 text-sm">
                    {produk.statusproduk === "BQC" && "Belum QC"}
                    {produk.statusproduk === "PQC" && "Proses QC"}
                    {produk.statusproduk === "SQC" && "Selesai QC"}
                    {produk.statusproduk === "SJ" && "Siap Jual"}
                    {produk.statusproduk === "D" && "Denied"}
                    {produk.statusproduk === "T" && "Terjual"}
                  </td>
                  <div className="px-4 py-3 text-sm">
                    <div class="flex items-center space-x-4 text-sm">
                      {/* Update */}
                      <Link
                        class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                        aria-label="Edit"
                        to={`/dashboard/produk/edit/${produk.slug}`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                          />
                        </svg>
                      </Link>
                      {/* And Button Update */}
                      {/* Detail */}
                      <Link
                        class="flex cursor-pointer items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                        aria-label="Edit"
                        to={`/dashboard/produk/view/${produk.slug}`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </Link>
                      {/* End Button Detail */}
                      {/* Delete */}
                      <button
                        class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                        aria-label="Delete"
                        onClick={() =>
                          deleteProduct(
                            produk.kodeproduk,
                            produk.id,
                            produk.qcProduct
                          )
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                      {/* And Button Delete */}
                    </div>
                  </div>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListProduct;
