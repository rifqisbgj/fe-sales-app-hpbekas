import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import apiAdapter from "../../api/apiAdapter";
import privateApi from "../../api/privateApi";
import { GetUserByToken } from "../../features/authSlice";
import AlertFailed from "../alert/AlertFailed";
import LayoutDashboard from "../layout/LayoutDashboard";
import ChangeImages from "./ChangeImages";

const UpdateProduct = () => {
  // state produk
  const [varian, setVarian] = useState();
  const [imei, setImei] = useState();
  const [harga, setHarga] = useState();
  const [warna, setWarna] = useState();
  const [deskripsi, setDeskripsi] = useState();
  const [ram, setRAM] = useState();
  const [storage, setStorage] = useState();
  const [statusproduk, setStatusProduk] = useState();
  const [oldimage, setOldImage] = useState([]);
  // token for update product
  const [token, setToken] = useState();
  const [validation, setValidation] = useState([]);
  //   get all brand
  const [idBrand, setIdBrand] = useState();
  const [brand, setBrand] = useState([]);
  const [allVarian, setAllVarian] = useState([]);

  // status update
  const [isUpdateImg, setUpdateImg] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isError, user } = useSelector((state) => state.auth);
  // get slug from params
  const { slug } = useParams();

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

    // get attribute product, include varian
    getAttProduct();
    // get brand value
    getBrand();
    // get token for update
    refreshToken();
  }, [isError, navigate, isUpdateImg]);

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
    // get detail product, find by slug
    const res = await privateApi.get(`/product/detail/${slug}`);
    const data = await res.data.data;
    // set idBrand for condition input select brand
    setIdBrand(data.varianProduk.id_merk);
    // set detail product
    setOldImage(data.gambarProduk);
    setVarian(data.id_varian);
    setStatusProduk(data.statusproduk);
    setImei(data.imei);
    setHarga(data.harga);
    setWarna(data.warna);
    setDeskripsi(data.deskripsi);
    setRAM(data.ram);
    setStorage(data.storage);
    return res;
  };

  // get brand
  const getBrand = async () => {
    // get brand
    const res = await apiAdapter.get("/brand");
    setBrand(res.data.data);
  };

  // get varian by id brand
  const getVarian = async (id) => {
    // get varian by idbrand from detail product
    const res = await apiAdapter.get(`/varian/viewbybrand/${id}`);
    setAllVarian(res.data.data);
  };

  // get attribute product, include selected varian
  const getAttProduct = async () => {
    // get detail product first
    await getDetailProduct().then((res) => {
      // after got detail product, passing id brand to varian
      getVarian(res.data.data.varianProduk.id_merk);
    });
  };

  // update product to db when click submit
  const handleSubmit = async () => {
    console.log(harga.toString());
    try {
      await privateApi.put(
        `/product/update/${slug}`,
        {
          imei: imei,
          harga: harga.toString() === "" ? "0" : harga.toString(),
          deskrispi: deskripsi,
          warna: warna,
          storage: storage,
          ram: ram,
          varian: `${varian}`,
          status: statusproduk,
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
    <LayoutDashboard>
      <div className="container grid px-6 mx-auto">
        <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
          Update Produk
        </h2>
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
                value={imei}
                // max input 15 digit
                maxLength={15}
                type="text"
                onChange={(e) => setImei(e.target.value)}
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
                for="grid-last-name"
              >
                Harga
              </label>
              <input
                class="block w-full rounded-md mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                placeholder="Harga Handphone"
                value={harga}
                type="text"
                onChange={(e) => setHarga(e.target.value)}
                // accept number only input
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
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
                type="password"
                onChange={(e) => setDeskripsi(e.target.value)}
              >
                {deskripsi}
              </textarea>
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
                value={warna}
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
                value={storage}
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
                value={ram}
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
                onChange={(e) => getVarian(e.target.value)}
              >
                <option>Pilih Merek</option>
                {brand.map((br, indx) => (
                  <option
                    key={indx}
                    value={br.id}
                    selected={br.id === idBrand}
                    // onChange={() => getVarian(br.id)}
                  >
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
                onChange={(e) => setVarian(e.target.value)}
              >
                {allVarian.length ? <option value="">Pilih Varian</option> : ""}
                {allVarian.length
                  ? allVarian.map((v, indx) => (
                      <option
                        value={v.id}
                        key={indx}
                        selected={v.id === varian}
                      >
                        {v.namavarian}
                      </option>
                    ))
                  : ""}
              </select>
            </div>
            <div class="md:w-1/2 px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-zip"
              >
                Status
              </label>
              <select
                class=" rounded-md block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                onChange={(e) => setStatusProduk(e.target.value)}
              >
                <option value="BQC" selected={statusproduk === "BQC"}>
                  Belum Quality Control
                </option>
                <option value="PQC" selected={statusproduk === "PQC"}>
                  Proses Quality Control
                </option>
                <option value="SQC" selected={statusproduk === "SQC"}>
                  Selesai Quality Control
                </option>
                <option value="SJ" selected={statusproduk === "SJ"}>
                  Siap Jual
                </option>
                <option value="D" selected={statusproduk === "D"}>
                  Denied
                </option>
                <option value="T" selected={statusproduk === "T"}>
                  Terjual
                </option>
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
        <div class="bg-gray-800 shadow-md text-white rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
          {/* call comp ChangeImages with image product data, token, and set status update img */}
          <ChangeImages
            oldimage={oldimage}
            token={token}
            setUpdateImg={setUpdateImg}
          />
        </div>
      </div>
    </LayoutDashboard>
  );
};

export default UpdateProduct;
