import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiAdapter from "../../api/apiAdapter";
import privateApi from "../../api/privateApi";
import AlertSuccess from "../alert/AlertSuccess";
import ModalDeleteQC from "./ModalDeleteQC";

const ListQC = () => {
  // token access for header Authorization
  const [token, setToken] = useState("");
  // token expire
  const [expire, setExpire] = useState("");
  const [qualityControl, setQC] = useState([]);

  // id qc to delete qc
  const [idQC, setIdQC] = useState("");
  const [kodeQC, setKodeQC] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [isDeleted, setSczDelete] = useState(false);

  useEffect(() => {
    // jalankan refresh token untuk mengambil token dan expired
    refreshToken();
    // mengambil data QC
    getQCResult();
  }, [isDeleted]);

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

  //   get all qc result
  const getQCResult = async () => {
    const res = await privateApi.get("/qc", {
      headers: { Authorization: token },
    });
    console.log(res.data.data);
    // set state qc
    setQC(res.data.data);
  };

  const deleteQC = (id, kode) => {
    // reset value state for next delete qc
    setIdQC("");
    setKodeQC("");
    // set value state for delete
    setIdQC(id);
    setKodeQC(kode);
    setShowDelete(true);
  };

  const cariQC = (e) => {
    console.log();
  };
  return (
    <div class="container grid px-6 mx-auto">
      {showDelete && (
        <ModalDeleteQC
          token={token}
          setShowDelete={setShowDelete}
          idQC={idQC}
          kodeQC={kodeQC}
          setSczDelete={setSczDelete}
        />
      )}
      <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Data Hasil Quality Control
      </h2>
      <form>
        <div class="-mx-3 md:flex mb-2">
          <div class="md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              for="countries"
              class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
            >
              Cari Hasil Quality Control
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Kode QC, kode produk, IMEI"
              onChange={(e) => cariQC(e.target.value)}
            />
          </div>
        </div>
      </form>
      {isDeleted && (
        <AlertSuccess
          msg={`Berhasil menghapus hasil Quality Control dengan kode ${kodeQC}`}
        />
      )}
      <div class="w-full overflow-hidden rounded-lg shadow-xs">
        <div class="w-full overflow-x-auto rounded-md">
          <table class="table-auto w-full whitespace-no-wrap overflow-scroll">
            <thead>
              <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                <th class="px-4 py-3">No</th>
                <th class="px-4 py-3">Kode QC</th>
                <th class="px-4 py-3">Nama Admin</th>
                <th class="px-4 py-3">Produk</th>
                <th class="px-4 py-3">IMEI</th>
                <th class="px-4 py-3">Tanggal QC</th>
                <th class="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
              {qualityControl.map((qc, indx) => (
                <tr class="text-gray-700 dark:text-gray-400" key={indx}>
                  <td class="px-4 py-3 text-sm">{indx + 1}</td>
                  <td class="px-4 py-3 text-sm">{qc.kodeQC}</td>
                  <td class="px-4 py-3 text-sm">{qc.qcBy.nama}</td>
                  <td class="px-4 py-3 text-sm">
                    {qc.produkQC.varianProduk.namavarian} - [
                    {qc.produkQC.kodeproduk}]
                  </td>
                  <td class="px-4 py-3 text-sm">{qc.produkQC.imei}</td>
                  <td class="px-4 py-3 text-sm">
                    {moment(qc.createdAt).format("LL")}
                  </td>
                  <td class="px-4 py-3 text-sm">
                    <div class="flex items-center space-x-4 text-sm">
                      {/* Detail */}
                      <Link
                        class="flex cursor-pointer items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                        aria-label="Edit"
                        to={`/dashboard/produk/view/${qc.produkQC.slug}`}
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
                      {/* Jika produk sudah terjual, qc tidak bisa dihapus */}
                      {qc.produkQC.statusproduk !== "T" && (
                        <button
                          class="flex cursor-pointer items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                          aria-label="Edit"
                          onClick={() => deleteQC(qc.id, qc.kodeQC)}
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
                      )}
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

export default ListQC;
