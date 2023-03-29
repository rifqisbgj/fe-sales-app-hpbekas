import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiAdapter from "../../api/apiAdapter";
import privateApi from "../../api/privateApi";
import ModalCreateUser from "./ModalCreateUser";
import AlertSuccess from "../alert/AlertSuccess";
import ModalDeleteUser from "./ModalDeleteUser";
import { ModalUpdateUser } from "./ModalUpdateUser";
import moment from "moment/moment";
import ReactPaginate from "react-paginate";

const ListUser = () => {
  const navigate = useNavigate();
  // token access for header Authorization
  const [token, setToken] = useState("");
  // token expire
  const [expire, setExpire] = useState("");
  // account list
  const [dataUsers, setDataUsers] = useState([]);
  // show or no create user modal
  const [showModal, setShowModal] = useState(false);
  // show or no delete user modal
  const [showDelete, setShowDelete] = useState(false);
  // show or no update user modal
  const [showUpdate, setShowUpdate] = useState(false);
  // jika sukses tambah
  const [isSuccess, setSuccess] = useState(false);
  // jika sukses delete
  const [isScsDelete, setSczDelete] = useState(false);
  // jika sukses update
  const [isUpdated, setUpdated] = useState(false);
  const [isLoading, setLoading] = useState(true);

  // user email for delete/update
  const [email, setEmail] = useState("");
  // id user for update
  const [idUserUpdate, setIdUser] = useState("");
  const [message, setMsg] = useState("");

  // pagination
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [role, setRole] = useState("");

  useEffect(
    () => {
      // jalankan refresh token untuk mengambil token dan expired
      refreshToken();
      // mengambil data akun
      getAdminUsers();
    }, // data akan direfresh jika status success berubah
    [isSuccess, isScsDelete, isUpdated, page, keyword, role]
  );

  // get fresh access token
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

  // get account from db
  const getAdminUsers = async () => {
    // Ambil data user api yang sudah terconfig sebelumnya
    const res = await privateApi.get(
      `/users?search_query=${keyword}&page=${page}&limit=${limit}&role=${role}`,
      {
        // proses pengambilan data dilakukan dengan pemberian headers Authorization
        headers: {
          Authorization: token,
        },
      }
    );
    // set data user
    setDataUsers(res.data.data);
    setPage(res.data.page);
    setPages(res.data.totalPage);
    setRows(res.data.totalRows);
    setLoading(false);
  };

  // get account data for delete, and show modal
  const dataDeleteUser = (email) => {
    // set modal ke true
    setShowDelete(true);
    // set email dari user yang akan dihapus
    setEmail(email);
    // reset status aksi sebelumnya
    resetAction();
  };

  // jika menambahkan data, tampilkan modal create
  const createAccount = () => {
    // tampilkan modal create
    setShowModal(true);
    resetAction();
  };

  // jika memperbarui data, maka tambahkan id yg dikirim button ke state
  const updateAccount = async (id) => {
    // set id user yg akan diperbarui
    setIdUser(id);
    // tampilkan modal
    setShowUpdate(true);
    // reset status aksi sebelumnya
    resetAction();
  };

  // mereset status aksi sebelumnya
  const resetAction = () => {
    // reset status sukses update
    setUpdated(false);
    // reset status sukses delete
    setSczDelete(false);
    // reset status sukses create
    setSuccess(false);
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

  const cariPengguna = (e) => {
    setPage(0);
    setKeyword(e);
  };

  const filterRole = (e) => {
    setPage(0);
    setRole(e);
  };

  return (
    <div class="container grid px-6 mx-auto">
      {/* menampilkan modal create, jika bernilai true */}
      {showModal && (
        <ModalCreateUser
          setShowModal={setShowModal}
          setSuccess={setSuccess}
          token={token}
        />
      )}
      {/* menampilkan modal, jika modal delete true */}
      {showDelete && (
        <ModalDeleteUser
          token={token}
          email={email}
          setEmail={setEmail}
          setSczDelete={setSczDelete}
          setShowDelete={setShowDelete}
        />
      )}

      {/* menampilkan modal update user */}
      {showUpdate && (
        <ModalUpdateUser
          setShowUpdate={setShowUpdate}
          id={idUserUpdate}
          token={token}
          setUpdated={setUpdated}
        />
      )}
      <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Data Admin
      </h2>
      <div class="w-full overflow-hidden rounded-lg shadow-xs">
        <button
          class="px-4 py-2 mb-4 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
          onClick={() => createAccount()}
        >
          Tambah Admin
        </button>
        <form>
          <div class="-mx-3 md:flex mb-2">
            <div class="md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                for="countries"
                class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
              >
                Cari Pengguna
              </label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Nama atau email pengguna"
                onChange={(e) => cariPengguna(e.target.value)}
              />
            </div>
            <div class="md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                for="countries"
                class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
              >
                Filter Role Pengguna
              </label>
              <select
                id="countries"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => filterRole(e.target.value)}
              >
                <option value="" selected>
                  Semua Role
                </option>
                <option value="super">Super</option>
                <option value="adminSale">Admin Penjualan</option>
                <option value="adminQC">Admin Quality Control</option>
              </select>
            </div>
          </div>
        </form>
        {/* Notif jika berhasil membuat atau menghapus data */}
        {isSuccess && <AlertSuccess msg="Akun admin berhasil ditambahkan" />}
        {isScsDelete && <AlertSuccess msg="Berhasil menghapus akun" />}
        {isUpdated && <AlertSuccess msg="Berhasil memperbarui akun" />}
        <div class="w-full overflow-x-auto rounded-md">
          <table class="table-auto w-full whitespace-no-wrap overflow-scroll">
            <thead>
              <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                <th class="px-4 py-3">Nama</th>
                <th class="px-4 py-3">Role</th>
                <th className="px-4 py-3">Tanggal Gabung</th>
                <th class="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
              {!isLoading && dataUsers.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center text-gray-400 py-3 font-medium"
                  >
                    Ups... Data Pengguna tidak tersedia, ubah filter data atau
                    kata kunci pencarian mu
                  </td>
                </tr>
              )}
              {isLoading && (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center text-gray-400 py-3 font-medium"
                  >
                    Loading ...
                  </td>
                </tr>
              )}
              {dataUsers.map((user, indx) => (
                <tr class="text-gray-700 dark:text-gray-400" key={indx}>
                  <td class="px-4 py-3">
                    <div class="flex items-center text-sm">
                      <div class="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                        <img
                          class="object-cover w-full h-full rounded-full"
                          src={"https://ui-avatars.com/api/?name=" + user.nama}
                          alt=""
                          loading="lazy"
                        />
                        <div
                          class="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        ></div>
                      </div>
                      <div>
                        <p class="font-semibold">{user.nama}</p>
                        <p class="text-xs text-gray-600 dark:text-gray-400">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td class="px-4 py-3 text-xs">
                    <span class="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-gray-500 text-white">
                      {user.role === "adminSale" ? "Admin Sale" : ""}
                      {user.role === "adminQC" ? "Admin QC" : ""}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-xs">
                    {/* menampilkan tanggal gabung */}
                    {moment(user.createdAt).format("LL")}
                  </td>
                  <td class="px-4 py-3">
                    <div class="flex items-center space-x-4 text-sm">
                      <button
                        class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                        aria-label="Edit"
                        onClick={() => updateAccount(user.id)}
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
                      </button>
                      <button
                        class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                        aria-label="Delete"
                        onClick={() => dataDeleteUser(user.email)}
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
              Total user <span className="font-medium">{rows}</span>
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

export default ListUser;
