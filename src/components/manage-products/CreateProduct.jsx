import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import apiAdapter from "../../api/apiAdapter";
import privateApi from "../../api/privateApi";
import { GetUserByToken } from "../../features/authSlice";
import LayoutDashboard from "../layout/LayoutDashboard";

const CreateProduct = () => {
  // state produk attribute
  const [varian, setVarian] = useState();
  const [imei, setImei] = useState();
  const [harga, setHarga] = useState();
  const [warna, setWarna] = useState();
  const [deskripsi, setDeskripsi] = useState();
  const [ram, setRAM] = useState();
  const [storage, setStorage] = useState();
  const [imageProduk, setImageProduk] = useState([]);
  const [imgPreview, setPreview] = useState([]);
  //   get all brand
  const [idBrand, setIdBrand] = useState();
  const [brand, setBrand] = useState([]);
  const [allVarian, setAllVarian] = useState([]);

  // redirect
  const navigate = useNavigate();
  // get action redux
  const dispatch = useDispatch();
  // get var isError and user in state.auth
  const { isError, user } = useSelector((state) => state.auth);

  // pengambilan data user pertama kali
  useEffect(() => {
    // ambil data user
    dispatch(GetUserByToken());
  }, [dispatch]);

  // validasi akses ke dashboard, jika user tidak ditemukan
  useEffect(() => {
    // jika error, maka arahkan ke halaman utama
    if (isError) {
      navigate("/");
    }

    getBrand();
  }, [isError, allVarian, navigate]);

  // get brand data
  const getBrand = async () => {
    const res = await apiAdapter.get("/brand");
    setBrand(res.data.data);
  };

  // get varian data by selected id brand
  const getVarian = async (id) => {
    const res = await apiAdapter.get(`/varian/viewbybrand/${id}`);
    setAllVarian(res.data.data);
  };

  const loadimage = (e) => {
    // get all image files
    const image = e.target.files;
    console.log(image);
    // set image produk
    setImageProduk(image);

    // set preview image by file length and store blob
    for (let i = 0; i < image.length; i++) {
      // store blob to preview image
      setPreview((imgPreview) => [
        ...imgPreview,
        URL.createObjectURL(image[i]),
      ]);
    }
  };

  // debug input
  console.log(
    imei +
      "-" +
      harga +
      "-" +
      deskripsi +
      "-" +
      warna +
      "-" +
      storage +
      "-" +
      ram +
      "-" +
      varian
  );

  return (
    <LayoutDashboard>
      <div className="container grid px-6 mx-auto">
        <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
          Tambah Produk
        </h2>
        <div class="bg-gray-800 shadow-md text-white rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
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
                <option>Pilih Merek</option>
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
              >
                <option>Pilih Varian</option>
                {allVarian.length ? (
                  allVarian.map((v, indx) => (
                    <option value={v.id} key={indx}>
                      {v.namavarian}
                    </option>
                  ))
                ) : (
                  // loading data varian, waiting brand
                  <option>Tidak tersedia...</option>
                )}
              </select>
            </div>
          </div>

          <div class="-mx-3 px-3 flex-col mt-4 md:flex mb-2">
            <label
              class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              for="grid-city"
            >
              Gambar Produk
            </label>
            <div class="flex items-center justify-center w-full">
              <label
                for="dropzone-file"
                class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    aria-hidden="true"
                    class="w-10 h-10 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span class="font-semibold">Click to upload</span>
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    PNG, JPG, or JPEG (MAX. 3 MB)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  onChange={loadimage}
                  accept=".png,.jpg,.jpeg"
                  class="hidden"
                  multiple
                />
              </label>
            </div>
          </div>
          {/* {console.log(imgPreview)} */}
          {imgPreview
            ? imgPreview.map((prv) => (
                <figure className="w-1/2 h-1/2">
                  <img src={prv} alt="Preview Image" />
                </figure>
              ))
            : ""}
        </div>
      </div>
    </LayoutDashboard>
  );
};

export default CreateProduct;
