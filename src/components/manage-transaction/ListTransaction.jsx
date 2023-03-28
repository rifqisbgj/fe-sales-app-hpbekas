import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiAdapter from "../../api/apiAdapter";
import privateApi from "../../api/privateApi";
import jwtDecode from "jwt-decode";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import Datepicker from "react-tailwindcss-datepicker";

const ListTransaction = () => {
  // token access for header Authorization
  const [token, setToken] = useState("");
  // token expire
  const [expire, setExpire] = useState("");
  const [transaksi, setDataTransaksi] = useState([]);
  const { user } = useSelector((state) => state.auth);
  // set value date range
  const [value, setValue] = useState({
    startDate: "",
    endDate: "",
  });

  // pagination
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    // jalankan refresh token untuk mengambil token dan expired
    refreshToken();
    // mengambil data transaksi
    getTransaction();
  }, [page, value]);

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
    const res = await privateApi.get(
      `/transaksi?page=${page}&limit=${limit}&dateOne=${value.startDate}&dateTwo=${value.endDate}`,
      {
        headers: { Authorization: token },
      }
    );
    console.log(res.data.data);
    // set state transaksi
    setDataTransaksi(res.data.data);
    setPage(res.data.page);
    setPages(res.data.totalPage);
    setRows(res.data.totalRows);
  };

  // change page pagination
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

  // value change date
  const handleValueDateRange = (newValue) => {
    setPage(0);
    if (newValue.startDate === null && newValue.endDate === null) {
      return setValue({ startDate: "", endDate: "" });
    }
    setValue(newValue);
  };

  return (
    <div class="container grid px-6 mx-auto">
      <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Data Transaksi
      </h2>

      <form>
        <div class="flex justify-between">
          <button
            onClick={() => navigate("/dashboard/transaksi/create")}
            class="px-4 py-2 mb-4 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
          >
            Tambah Transaksi
          </button>
          <div class="md:w-1/3 px-3 mb-6 md:mb-0">
            <Datepicker
              value={value}
              inputClassName="bg-gray-50"
              onChange={handleValueDateRange}
              // mengambil tanggal saat ini
              maxDate={moment().format("YYYY-MM-DD")}
              useRange={false}
            />
          </div>
        </div>
      </form>
      <div class="w-full overflow-hidden rounded-lg shadow-xs">
        <div class="w-full overflow-x-auto rounded-md">
          <table class="table-auto w-full whitespace-no-wrap overflow-scroll">
            <thead>
              <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                <th class="px-4 py-3">No</th>
                <th class="px-4 py-3">Nama Pelanggan</th>
                <th class="px-4 py-3">Varian Item</th>
                <th class="px-4 py-3">Total Beli</th>
                <th class="px-4 py-3">Tanggal Transaksi</th>
                {user.data.role === "super" && <th class="px-4 py-3">Admin</th>}
                <th class="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
              {transaksi.length === 0 && (
                <tr>
                  <td
                    colSpan={user.data.role === "super" ? 7 : 6}
                    className="text-center text-gray-400 py-3 font-medium"
                  >
                    Ups... Data transaksi tidak tersedia, ubah filter data atau
                    tambahkan transaksi
                  </td>
                </tr>
              )}
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
                    {" " + parseInt(trx.total).toLocaleString()}
                  </td>
                  <td class="px-4 py-3 text-sm">
                    {moment(trx.createdAt).format("LL")}
                  </td>
                  {user.data.role === "super" && (
                    <td class="px-4 py-3 text-sm">{trx.adminTransaksi.nama}</td>
                  )}
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
        <div
          className="flex items-center justify-between border-t border-gray-300  bg-gray-800 px-4 py-3 sm:px-6"
          key={rows}
        >
          <div>
            <p className="text-sm text-white invisible md:visible">
              Total varian <span className="font-medium">{rows}</span>{" "}
              <span className="font-medium">Page {rows ? page + 1 : 0}</span> of{" "}
              <span className="font-medium">{pages}</span>
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

export default ListTransaction;
