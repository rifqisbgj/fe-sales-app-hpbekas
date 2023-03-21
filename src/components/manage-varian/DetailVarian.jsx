import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import apiAdapter from "../../api/apiAdapter";

const DetailVarian = () => {
  const [data, setData] = useState();
  // get id from params
  const { id } = useParams();

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

  // get detail varian
  const getVarian = async (token) => {
    try {
      // get detail varian, find by id
      const res = await apiAdapter.get(`/varian/detail/${id}`, {
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
      // passing token ke detail varian
      getVarian(res);
    });
  };

  return (
    <div className="container grid px-6 mx-auto">
      <nav class="flex my-6" aria-label="Breadcrumb">
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
                to={"/dashboard/varian"}
                class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
              >
                Varian
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
                Detail Varian
              </span>
            </div>
          </li>
        </ol>
      </nav>

      <h2 class="my-3 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Detail Varian
      </h2>
      {console.log(data)}
      <div class="bg-gray-800 shadow-md text-white rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
        <label className="text-xl text-gray-300 pb-5">Informasi Varian</label>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="" className="text-sm text-gray-300">
              Nama Varian
            </label>
            <p className="mt-1 font-bold text-lg">{data && data.namavarian}</p>
          </div>
          <div>
            <label htmlFor="" className="text-sm text-gray-300">
              Brand
            </label>
            <p className="mt-1 font-bold text-lg">
              {data && data.merk.namamerek}
            </p>
          </div>
          <div>
            <label htmlFor="" className="text-sm text-gray-300">
              Jumlah Produk
            </label>
            <p className="mt-1 font-bold text-lg">
              {data && data.produk.length === 0 && "Belum ada produk"}
              {data &&
                data.produk.length > 0 &&
                `${data.produk.length} buah produk`}
            </p>
          </div>
        </div>
        <hr class="h-px mt-6 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <label className="text-xl text-gray-300 py-5">List Produk</label>
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
              {data && data.produk && data.produk.length === 0 && (
                <tr>
                  <td colSpan={6} className={"text-sm text-center"}>
                    Produk tidak tersedia
                  </td>
                </tr>
              )}
              {data &&
                data.produk &&
                data.produk.map((produk, indx) => (
                  <tr class="text-gray-700 dark:text-gray-400" key={indx}>
                    <td class="px-4 py-3 text-sm">{indx + 1}</td>
                    <td class="px-4 py-3 text-sm">
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

export default DetailVarian;
