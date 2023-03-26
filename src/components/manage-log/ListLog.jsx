import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import apiAdapter from "../../api/apiAdapter";
import privateApi from "../../api/privateApi";
import ReactPaginate from "react-paginate";
import Datepicker from "react-tailwindcss-datepicker";

const ListLog = () => {
  // token access for header Authorization
  const [token, setToken] = useState("");
  // token expire
  const [expire, setExpire] = useState("");
  // params for get log filter
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  // query filter method dan level log
  const [method, setMethod] = useState("");
  const [level, setLevel] = useState("");
  // store data log
  const [dataLog, setDataLog] = useState([]);

  const [message, setMsg] = useState("");

  // set value date range
  const [value, setValue] = useState({
    startDate: "",
    endDate: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    // jalankan refresh token untuk mengambil token dan expired
    refreshToken();
    // mengambil data log
    getLog();
  }, [page, value, method, level]);

  // value change date
  const handleValueDateRange = (newValue) => {
    if (newValue.startDate === null && newValue.endDate === null) {
      return setValue({ startDate: "", endDate: "" });
    }
    setValue(newValue);
  };

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

  //   get all log
  const getLog = async () => {
    const res = await privateApi.get(
      `/log-data?dateOne=${value.startDate}&dateTwo=${value.endDate}&method=${method}&level=${level}&page=${page}`,
      {
        headers: { Authorization: token },
      }
    );
    // set state log
    setDataLog(res.data.data);
    setPage(res.data.page);
    setPages(res.data.total_pages);
    setRows(res.data.total);
  };

  const changePage = ({ selected }) => {
    setPage(selected);
    if (selected === 9) {
      setMsg(
        "Jika tidak menemukan data yang Anda cari, silahkan filter data log!"
      );
    } else {
      setMsg("");
    }
  };
  return (
    <div class="container grid px-6 mx-auto">
      <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Data Log Website BagjaGadget
      </h2>
      <form>
        <div class="-mx-3 md:flex mb-2">
          <div class="md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              for="countries"
              class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
            >
              Filter Method
            </label>
            <select
              id="countries"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => setMethod(e.target.value)}
            >
              <option value="" selected>
                All Method
              </option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
          </div>
          <div class="md:w-1/3 px-3">
            <label
              for="countries"
              class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
            >
              Filter Level
            </label>
            <select
              id="countries"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="" selected>
                All Level
              </option>
              <option value="info">INFO</option>
              <option value="warn">WARN</option>
              <option value="error">ERROR</option>
            </select>
          </div>
          <div class="md:w-1/3 px-3">
            <label
              for="countries"
              class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
            >
              Filter Tanggal Log
            </label>
            <Datepicker
              value={value}
              inputClassName="bg-gray-50"
              onChange={handleValueDateRange}
              minDate={new Date("2023-03-19")}
              maxDate={new Date("2023-03-26")}
              useRange={false}
            />
          </div>
        </div>
      </form>
      <div class="w-full overflow-x-hidden rounded-lg shadow-xs">
        <div class="w-full overflow-x-auto rounded-md">
          <table class="table-auto w-full whitespace-no-wrap overflow-scroll">
            <thead>
              <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                <th class="px-4 py-3">Level</th>
                <th class="px-4 py-3">Method</th>
                <th class="px-4 py-3">Message</th>
                <th class="px-4 py-3">User | Type</th>
                <th class="px-4 py-3">Tanggal</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
              {dataLog.length !== 0 &&
                dataLog.map((log, indx) => (
                  <tr class="text-gray-700 dark:text-gray-400" key={indx}>
                    <td class="px-4 py-3 text-sm">{log.level}</td>
                    <td class="px-4 py-3 text-sm">{log.method}</td>
                    <td class="px-4 py-3 text-sm">{log.message}</td>
                    <td class="px-4 py-3 text-sm">
                      {!log.user ? "Auth" : log.user}
                    </td>
                    <td class="px-4 py-3 text-sm">{log.timestamp}</td>
                  </tr>
                ))}
              {dataLog.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center text-gray-400 py-3 font-medium"
                  >
                    Ups... Data Log tidak tersedia, ubah filter data mu
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div
          className="flex items-center justify-between border-t border-gray-300  bg-gray-800 px-4 py-3 sm:px-6"
          key={rows}
        >
          <div>
            <p className="text-sm text-white invisible md:visible">
              Total log <span className="font-medium">{rows}</span>
              {" | "}
              <span className="font-medium">
                Page {rows ? page + 1 : 0}
              </span> of <span className="font-medium">{pages}</span>
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

export default ListLog;
