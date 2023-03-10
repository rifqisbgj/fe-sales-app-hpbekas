import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiAdapter from "../../api/apiAdapter";
import privateApi from "../../api/privateApi";
import ModalCreateUser from "./ModalCreateUser";
import AlertSuccess from "../alert/AlertSuccess";
import ModalDeleteUser from "./ModalDeleteUser";

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
  // jika sukses tambah
  const [isSuccess, setSuccess] = useState(false);
  // jika sukses delete
  const [isScsDelete, setSczDelete] = useState(false);

  // user email for delete/update
  const [email, setEmail] = useState("");

  useEffect(
    () => {
      // jalankan refresh token untuk mengambil token dan expired
      refreshToken();
      // mengambil data akun
      getAdminUsers();
    }, // data akan direfresh jika status success berubah
    [isSuccess, isScsDelete]
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
      const decoded = jwtDecode(response.data.token);
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
    const res = await privateApi.get("/users", {
      // proses pengambilan data dilakukan dengan pemberian headers Authorization
      headers: {
        Authorization: token,
      },
    });
    // set data user
    setDataUsers(res.data.data);
  };

  // get account data for delete, and show modal
  const dataDeleteUser = (email) => {
    // reset status success delete
    setSczDelete(false);
    // set modal ke true
    setShowDelete(true);
    // set email dari user yang akan dihapus
    setEmail(email);
    // reset status sukses create
    setSuccess(false);
  };

  // jika menambahkan data, tampilkan modal create
  const createAccount = () => {
    // reset status success
    setSuccess(false);
    // tampilkan modal create
    setShowModal(true);
    // reset status delete
    setSczDelete(false);
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
          setEmai={setEmail}
          setSczDelete={setSczDelete}
          setShowDelete={setShowDelete}
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
        {/* Notif jika berhasil membuat atau menghapus data */}
        {isSuccess && <AlertSuccess msg="Akun admin berhasil ditambahkan" />}
        {isScsDelete && <AlertSuccess msg="Berhasil menghapus akun" />}
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
              {dataUsers.map((user) => (
                <tr class="text-gray-700 dark:text-gray-400" key={user.emai}>
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
                    <span class="px-2 py-1 font-semibold leading-tight  rounded-full bg-gray-300 text-gray-700">
                      {user.role === "adminSale" ? "Admin Sale" : ""}
                      {user.role === "adminQC" ? "Admin QC" : ""}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-xs">20 Januari 2023</td>
                  <td class="px-4 py-3">
                    <div class="flex items-center space-x-4 text-sm">
                      <button
                        class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                        aria-label="Edit"
                      >
                        <svg
                          class="w-5 h-5"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                        </svg>
                      </button>
                      <button
                        class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                        aria-label="Delete"
                        onClick={() => dataDeleteUser(user.email)}
                      >
                        <svg
                          class="w-5 h-5"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* <div class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
        <span class="flex items-center col-span-3">Showing 21-30 of 100</span>
        <span class="col-span-2"></span>
        <span class="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
          <nav aria-label="Table navigation">
            <ul class="inline-flex items-center">
              <li>
                <button
                  class="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                  aria-label="Previous"
                >
                  <svg
                    class="w-4 h-4 fill-current"
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                      fill-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </li>
              <li>
                <button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                  1
                </button>
              </li>
              <li>
                <button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                  2
                </button>
              </li>
              <li>
                <button class="px-3 py-1 text-white transition-colors duration-150 bg-purple-600 border border-r-0 border-purple-600 rounded-md focus:outline-none focus:shadow-outline-purple">
                  3
                </button>
              </li>
              <li>
                <button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                  4
                </button>
              </li>
              <li>
                <span class="px-3 py-1">...</span>
              </li>
              <li>
                <button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                  8
                </button>
              </li>
              <li>
                <button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                  9
                </button>
              </li>
              <li>
                <button
                  class="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                  aria-label="Next"
                >
                  <svg
                    class="w-4 h-4 fill-current"
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                      fill-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </li>
            </ul>
          </nav>
        </span>
      </div> */}
      </div>
    </div>
  );
};

export default ListUser;
