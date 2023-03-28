import jwtDecode from "jwt-decode";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiAdapter from "../../api/apiAdapter";
import privateApi from "../../api/privateApi";
import AlertSuccess from "../alert/AlertSuccess";
import ModalDeleteProduct from "./ModalDeleteProduct";
import ReactPaginate from "react-paginate";

import AlertFilterPrice from "../alert/AlertFilterPrice";

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
  const [isActive, setActive] = useState(false); // check product active or no
  const [codeDelete, setCodeDelete] = useState(false);

  // pagination
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("");
  const [active, setFilterActive] = useState("");
  // list brand
  const [listBrand, setListBrand] = useState([]);
  const [maxPrice, setMaxPrice] = useState();
  const [minPrice, setMinPrice] = useState();

  const minRef = useRef(null);
  const maxRef = useRef(null);

  const [message, setMsg] = useState("");
  const [isLoading, setLoading] = useState(true);

  useEffect(
    () => {
      // jalankan refresh token untuk mengambil token dan expired
      refreshToken();
      // mengambil data produk
      getProducts();
    }, // data akan direfresh jika status success berubah
    [isScsDelete, page, keyword, status, active, maxPrice, minPrice]
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
    const res = await privateApi.get(
      `/product/list?search_query=${keyword}&page=${page}&limit=${limit}&status=${status}&active=${active}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
      {
        headers: { Authorization: token },
      }
    );
    // set data products
    setProducts(res.data.data);
    setPage(res.data.page);
    setPages(res.data.totalPage);
    setRows(res.data.totalRows);

    const resBrand = await privateApi.get("/brand", {
      headers: { Authorization: token },
    });

    setListBrand(resBrand.data.data);
    setLoading(false);
  };

  const changePage = ({ selected }) => {
    setPage(selected);
    if (selected === 9) {
      setMsg(
        "Jika tidak menemukan data yang Anda cari, silahkan cari data dengan kata kunci spesifik!"
      );
    } else {
      setMsg("");
    }
  };

  // get account data for delete, and show modal
  const deleteProduct = (kode, id, qcstatus, active) => {
    // set modal ke true
    setShowDelete(true);
    // set id dari produk yang akan dihapus
    setIdDelete(id);
    // set kode produk yang akan dihapus
    setCodeDelete(kode);
    active ? setActive(true) : setActive(false);
    // jika produk memiliki qc
    qcstatus != null ? setQcStatus(true) : setQcStatus(false);
    reset();
  };
  const reset = () => {
    // reset status aksi sebelumnya
    setSczDelete(false);
    setMsg("");
  };

  const handleRangePrice = () => {
    setPage(0);
    reset();
    setMinPrice(minRef.current.value);
    setMaxPrice(maxRef.current.value);
    // validasi harga minimun harus lebih rendah dari harga max
    if (
      minRef.current.value >= maxRef.current.value &&
      maxRef.current.value !== ""
    ) {
      return setMsg("Harga maksimum harus lebih besar dari harga minimum.");
    }
    setMsg("");
  };

  const cariProduk = (e) => {
    setPage(0);
    setKeyword(e);
  };
  const filterStatusProduk = (e) => {
    setPage(0);
    setStatus(e);
  };
  const filterStatusAktif = (e) => {
    setPage(0);
    setFilterActive(e);
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
          setActive={setActive}
          isActive={isActive}
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

        <form>
          <div class="-mx-3 md:flex mb-2">
            <div class="md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                for="countries"
                class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
              >
                Cari Produk
              </label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Kode produk, nama varian, atau IMEI"
                onChange={(e) => cariProduk(e.target.value)}
              />
            </div>
            <div class="md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                for="countries"
                class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
              >
                Filter Berdasarkan Status Produk
              </label>
              <select
                id="countries"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => filterStatusProduk(e.target.value)}
              >
                <option value="" selected>
                  Semua Status Produk
                </option>
                <option value="BQC">Belum Quality Control (BQC)</option>
                <option value="PQC">Proses Quality Control (PQC)</option>
                <option value="SQC">Selesai Quality Control (SQC)</option>
                <option value="SJ">Siap Jual (SJ)</option>
                <option value="D">Denied (D)</option>
                <option value="T">Terjual (T)</option>
              </select>
            </div>
            <div class="md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                for="countries"
                class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
              >
                Filter Berdasarkan Produk Aktif/Tidak
              </label>
              <select
                id="countries"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => filterStatusAktif(e.target.value)}
              >
                <option value="" selected>
                  Produk Status Aktif & Tidak Aktif
                </option>
                <option value={true}>Aktif</option>
                <option value={false}>Tidak Aktif</option>
              </select>
            </div>
          </div>
          <div class="-mx-3 md:flex mb-2">
            {/* <div class="md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                for="countries"
                class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
              >
                Filter Merek Produk
              </label>
              <select
                id="countries"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setFilterActive(e.target.value)}
              >
                <option value="" selected>
                  Semua Merek
                </option>
                {listBrand &&
                  listBrand.map((br) => (
                    <option value={br.id}>{br.namamerek}</option>
                  ))}
              </select>
            </div> */}
            <div class="md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                for="countries"
                class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
              >
                Filter Berdasarkan Harga
              </label>
              <div className="flex flex-row gap-2">
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Harga Minimum"
                  type="text"
                  name="minPrice"
                  id="minPrice"
                  defaultValue={minPrice}
                  onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
                  onBlur={handleRangePrice}
                  ref={minRef}
                />{" "}
                <input
                  type="text"
                  name="maxPrice"
                  id="maxPrice"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Harga Maksimum"
                  defaultValue={maxPrice}
                  onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
                  onBlur={handleRangePrice}
                  ref={maxRef}
                />
              </div>
            </div>
          </div>
        </form>
        {/* Notif jika berhasil membuat atau menghapus data */}
        {isScsDelete && (
          <AlertSuccess msg="Berhasil menghapus atau memperbarui status aktif produk" />
        )}
        {message && <AlertFilterPrice errPriceMsg={message} status={"admin"} />}
        <div class="w-full overflow-x-auto rounded-md mt-2">
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
              {!isLoading && dataProducts.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center text-gray-400 py-3 font-medium"
                  >
                    Ups... Data Produk tidak tersedia, ubah filter data mu
                  </td>
                </tr>
              )}
              {isLoading && (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center text-gray-400 py-3 font-medium"
                  >
                    Loading ...
                  </td>
                </tr>
              )}
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
                      {produk.statusproduk !== "T" && (
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
                      )}
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
                            produk.qcProduct,
                            produk.active
                          )
                        }
                      >
                        {produk.qcProduct ? (
                          produk.active ? (
                            // icon kunci terbuka
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
                                d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                              />
                            </svg>
                          ) : (
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
                                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                              />
                            </svg>
                          )
                        ) : (
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
                        )}
                      </button>
                      {/* And Button Delete */}
                    </div>
                  </div>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          className="flex items-center justify-between border-t border-gray-300  bg-gray-800 px-4 py-3 sm:px-6"
          key={rows}
        >
          <div>
            <p className="text-sm text-white invisible md:visible">
              Total produk <span className="font-medium">{rows}</span>
              {" | "}
              <span className="font-medium">
                Halaman {rows ? page + 1 : 0}
              </span>{" "}
              dari <span className="font-medium">{pages}</span>
            </p>
          </div>
          <div>
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={Math.min(10, pages)}
              onPageChange={changePage}
              containerClassName={
                "isolate inline-flex -space-x-px rounded-md shadow-sm"
              }
              pageLinkClassName={
                "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-400 ring-1 ring-inset ring-gray-300 hover:text-gray-700 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              }
              previousLinkClassName={
                "relative inline-flex items-center rounded-l-md text-sm px-4 py-2 text-gray-400 font-semibold hover:text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 bg-gray-800 focus:z-20 focus:outline-offset-0"
              }
              nextLinkClassName={
                "relative inline-flex items-center rounded-r-md text-sm px-4 py-2 text-gray-400 font-semibold ring-1 ring-inset hover:text-gray-700 ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              }
              activeLinkClassName={
                "relative inline-flex items-center bg-gray-700 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              }
              disabledLinkClassName={""}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListProduct;
