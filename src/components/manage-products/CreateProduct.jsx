import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import apiAdapter from "../../api/apiAdapter";
import privateApi from "../../api/privateApi";
import AlertFailed from "../alert/AlertFailed";

const CreateProduct = () => {
  // state produk attribute
  const [varian, setVarian] = useState();
  const [imei, setImei] = useState();
  const [harga, setHarga] = useState("0");
  const [warna, setWarna] = useState();
  const [deskripsi, setDeskripsi] = useState();
  const [ram, setRAM] = useState();
  const [storage, setStorage] = useState();
  // token for post product
  const [token, setToken] = useState();
  const [validation, setValidation] = useState([]);

  //   get all brand
  const [brand, setBrand] = useState([]);
  const [allVarian, setAllVarian] = useState([]);

  // redirect
  const navigate = useNavigate();
  // get action redux
  const dispatch = useDispatch();
  // get var isError and user in state.auth
  const { isError, user } = useSelector((state) => state.auth);

  // validasi akses ke dashboard, jika user tidak ditemukan
  useEffect(() => {
    getBrand();
    refreshToken();
  }, [allVarian, navigate]);

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

  // get brand data
  const getBrand = async () => {
    const res = await apiAdapter.get("/brand");
    setBrand(res.data.data);
  };

  // get varian data by selected id brand
  const getVarian = async (id) => {
    // jika id kosong, maka kosongkan varian
    if (id === "") {
      return setAllVarian([]);
    }
    const res = await apiAdapter.get(`/varian/viewbybrand/${id}`);
    setAllVarian(res.data.data);
  };

  // create new product
  const handleSubmit = async () => {
    try {
      const res = await privateApi.post(
        "/product/store",
        {
          imei: imei,
          harga: harga,
          deskripsi: deskripsi,
          warna: warna,
          storage: storage,
          ram: ram,
          varian: varian,
        },
        { headers: { Authorization: token } }
      );
      navigate("/dashboard/produk");
    } catch (error) {
      if (error.response) {
        error.response.data.length === 1
          ? // error jika terjadi error diluar dari kesalahan input
            setValidation(error.response.data)
          : // error jika terjadi kesalahan pengisian format input
            setValidation(error.response.data.message);
      }
    }
  };

  return (
    <div className="container grid px-6 mx-auto">
      <nav class="flex my-6" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          <li class="inline-flex items-center">
            <a
              href="/dashboard"
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
                class="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <a
                href="/dashboard/produk"
                class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
              >
                Produk
              </a>
            </div>
          </li>
          <li aria-current="page">
            <div class="flex items-center">
              <svg
                aria-hidden="true"
                class="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                Tambah Produk
              </span>
            </div>
          </li>
        </ol>
      </nav>
      <h2 class="my-3 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Tambah Produk
      </h2>

      <form action={handleSubmit}>
        <div class="bg-gray-800 shadow-md text-white rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
          {validation.length !== 0 && <AlertFailed msg={validation} />}
          <div class="-mx-3 md:flex mb-6">
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-first-name"
              >
                IMEI
              </label>
              <input
                class="block w-full rounded-md mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                placeholder="Phone IMEI"
                // max input 15 digit
                maxLength={15}
                type="text"
                // accept number only input
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                onChange={(e) => setImei(e.target.value)}
              />
            </div>
            <div class="md:w-1/2 px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-last-name"
              >
                Harga
              </label>
              <input
                class="block w-full rounded-md mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                placeholder="Harga Handphone"
                type="text"
                // accept number only input
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                onChange={(e) => setHarga(e.target.value)}
              />
            </div>
          </div>
          <div class="-mx-3 md:flex mb-6">
            <div class="md:w-full px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-password"
              >
                Deskripsi
              </label>
              <textarea
                class="block w-full rounded-md mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                id="grid-password"
                onChange={(e) => setDeskripsi(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div class="-mx-3 md:flex mb-2">
            <div class="md:w-1/2 px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-last-name"
              >
                Warna
              </label>
              <input
                class="block w-full rounded-md mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                placeholder="Warna Handphone"
                onChange={(e) => setWarna(e.target.value)}
              />
            </div>
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-city"
              >
                Storage
              </label>
              <input
                class="block w-full rounded-md mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                placeholder="Storage Handphone"
                type="text"
                onChange={(e) => setStorage(e.target.value)}
                // accept number only input
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
            </div>
            <div class="md:w-1/2 px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-zip"
              >
                RAM
              </label>
              <input
                class="block w-full rounded-md mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                placeholder="RAM Handphone"
                type="text"
                onChange={(e) => setRAM(e.target.value)}
                // accept number only input
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
            </div>
          </div>
          <div class="-mx-3 mt-4 md:flex mb-2">
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-city"
              >
                Merek
              </label>
              <select
                class=" rounded-md block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                // selected brand will passing id brand to getVarian
                onChange={(e) => getVarian(e.target.value)}
              >
                <option value={""}>Pilih Merek</option>
                {brand.map((br, indx) => (
                  <option key={indx} value={br.id}>
                    {br.namamerek}
                  </option>
                ))}
              </select>
            </div>
            <div class="md:w-1/2 px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-zip"
              >
                Varian
              </label>
              <select
                class=" rounded-md block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                //  set varian produk
                onChange={(e) => setVarian(e.target.value)}
                defaultChecked={true}
                disabled={allVarian.length === 0 ? true : null}
              >
                {allVarian.length ? <option value="">Pilih Varian</option> : ""}
                {allVarian.length
                  ? allVarian.map((v, indx) => (
                      <option value={v.id} key={indx}>
                        {v.namavarian}
                      </option>
                    ))
                  : // loading data varian, waiting brand
                    ""}
              </select>
            </div>
          </div>

          <div className="flex justify-end mt-2">
            <button
              className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-5 py-3 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => handleSubmit()}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
