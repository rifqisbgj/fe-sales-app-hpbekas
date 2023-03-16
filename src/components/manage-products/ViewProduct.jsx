import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import apiAdapter from "../../api/apiAdapter";
import privateApi from "../../api/privateApi";
import LayoutDashboard from "../layout/LayoutDashboard";
import moment from "moment";

const ViewProduct = () => {
  // state produk
  const [dataProduk, setData] = useState();

  const navigate = useNavigate();
  // get slug from params
  const { slug } = useParams();

  useEffect(() => {
    // get token for update
    refreshToken();
    // get attribute product, include varian
    getDetailProduct();
  }, []);

  // get fresh access token
  const refreshToken = async () => {
    try {
      // ambil token user
      const response = await apiAdapter.get("/users/token", {
        withCredentials: true,
      });
      // setToken
      setToken(response.data.data.token);
    } catch (error) {
      if (error.response) {
        navigate("/");
      }
    }
  };

  // get detail product for update
  const getDetailProduct = async () => {
    try {
      // get detail product, find by slug
      const res = await privateApi.get(`/product/detail/${slug}`);
      //   console.log(res.data.data);
      const data = await res.data.data;
      console.log(data);
      setData(data);
    } catch (error) {
      if (error.response) {
        navigate("/");
      }
    }
  };
  return (
    <LayoutDashboard>
      <div className="container grid px-6 mx-auto">
        <nav class="flex my-6" aria-label="Breadcrumb">
          <ol class="inline-flex items-center space-x-1 md:space-x-3">
            <li class="inline-flex items-center">
              <a
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
              </a>
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
                  to={"/dashboard/produk"}
                  class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                >
                  Produk
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
                  Detail Produk
                </span>
              </div>
            </li>
          </ol>
        </nav>
        <h2 class="my-3 text-2xl font-semibold text-gray-700 dark:text-gray-200">
          Detail Produk
        </h2>
        <div class="bg-gray-800 shadow-md text-white rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
          <label className="text-xl text-gray-300 py-5">Informasi Produk</label>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col">
              <label htmlFor="" className="text-sm text-gray-300">
                Varian Produk
              </label>
              <p className="mt-1 font-bold text-lg">
                {dataProduk && dataProduk.varianProduk.namavarian}
              </p>
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="text-sm text-gray-300">
                Kode Produk
              </label>
              <p className="mt-1 font-bold text-lg">
                {dataProduk && dataProduk.kodeproduk}
              </p>
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="text-sm text-gray-300">
                IMEI
              </label>
              <p className="mt-1 font-bold text-lg">
                {dataProduk && dataProduk.imei}
              </p>
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="text-sm text-gray-300">
                Harga
              </label>
              <p className="mt-1 font-bold text-lg">
                Rp. {dataProduk && dataProduk.harga.toLocaleString()}
              </p>
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="text-sm text-gray-300">
                Status Produk
              </label>
              <p className="mt-1 font-bold text-lg">
                {dataProduk &&
                  dataProduk.statusproduk === "BQC" &&
                  "Belum Quality Control"}
                {dataProduk &&
                  dataProduk.statusproduk === "PQC" &&
                  "Proses Quality Control"}
                {dataProduk &&
                  dataProduk.statusproduk === "PQC" &&
                  "Selesai Quality Control"}
                {dataProduk && dataProduk.statusproduk === "SJ" && "Siap Jual"}
                {dataProduk && dataProduk.statusproduk === "D" && "Denied"}
                {dataProduk && dataProduk.statusproduk === "T" && "Terjual"}
              </p>
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="text-sm text-gray-300">
                Admin Quality Control
              </label>
              <p className="mt-1 font-bold text-lg">
                {dataProduk && dataProduk.qcProduct != null
                  ? dataProduk.qcProduct.qcBy.nama
                  : "-"}
              </p>
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="text-sm text-gray-300">
                RAM
              </label>
              <p className="mt-1 font-bold text-lg">
                {dataProduk && dataProduk.ram} GB
              </p>
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="text-sm text-gray-300">
                Storage
              </label>
              <p className="mt-1 font-bold text-lg">
                {dataProduk && dataProduk.storage} GB
              </p>
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="text-sm text-gray-300">
                Warna
              </label>
              <p className="mt-1 font-bold text-lg">
                {dataProduk && dataProduk.warna}
              </p>
            </div>
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="" className="text-sm text-gray-300">
              Deskripsi Produk
            </label>
            <p className="mt-1 font-medium">
              {dataProduk && dataProduk.deskripsi !== ""
                ? dataProduk.deskripsi
                : "-"}
            </p>
          </div>
          <hr class="h-px mt-6 bg-gray-200 border-0 dark:bg-gray-700"></hr>
          <label className="text-xl text-gray-300 py-5">Gambar Produk</label>
          <div className="grid grid-cols-2 gap-x-6 gap-y-5 px-1 mt-2 mb-3 lg:grid-cols-5 lg:gap-x-4">
            {dataProduk && dataProduk.gambarProduk.length
              ? dataProduk.gambarProduk.map((imgproduk, indx) => (
                  <figure className="relative max-w-xs" key={indx}>
                    <img
                      className="rounded-lg shadow-xl hover:shadow-2xl h-44 w-full object-cover"
                      src={
                        "http://localhost:8080/product-image/" + imgproduk.image
                      }
                    />
                  </figure>
                ))
              : "Gambar belum tersedia"}
          </div>

          <hr class="h-px mt-6 bg-gray-200 border-0 dark:bg-gray-700"></hr>
          <label className="text-xl text-gray-300 py-5">
            Hasil Quality Control
          </label>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col">
              <label htmlFor="" className="text-sm text-gray-300">
                Kode Quality Control
              </label>
              <p className="mt-1 font-bold text-lg">
                {dataProduk && dataProduk.qcProduct != null
                  ? dataProduk.qcProduct.kodeQC
                  : "-"}
              </p>
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="text-sm text-gray-300">
                Baterai
              </label>
              <p className="mt-1 font-bold text-lg">
                {dataProduk && dataProduk.qcProduct != null
                  ? dataProduk.qcProduct.batre
                    ? "OK"
                    : "RUSAK"
                  : "-"}
              </p>
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="text-sm text-gray-300">
                Layar
              </label>
              <p className="mt-1 font-bold text-lg">
                {dataProduk && dataProduk.qcProduct != null
                  ? dataProduk.qcProduct.layar
                    ? "OK"
                    : "RUSAK"
                  : "-"}
              </p>
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="text-sm text-gray-300">
                Sinyal
              </label>
              <p className="mt-1 font-bold text-lg">
                {dataProduk && dataProduk.qcProduct != null
                  ? dataProduk.qcProduct.sinyal
                    ? "OK"
                    : "RUSAK"
                  : "-"}
              </p>
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="text-sm text-gray-300">
                Tanggal Quality Control
              </label>
              <p className="mt-1 font-bold text-lg">
                {dataProduk && dataProduk.qcProduct != null
                  ? moment(dataProduk.qcProduct.createdAt).format("LL")
                  : "-"}
              </p>
            </div>
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="" className="text-sm text-gray-300">
              Catatan Quality Control
            </label>
            <p className="mt-1 font-medium">
              {dataProduk && dataProduk.qcProduct != null
                ? dataProduk.qcProduct.catatan
                  ? dataProduk.qcProduct.catatan
                  : "-"
                : "-"}
            </p>
          </div>
        </div>
      </div>
    </LayoutDashboard>
  );
};

export default ViewProduct;
