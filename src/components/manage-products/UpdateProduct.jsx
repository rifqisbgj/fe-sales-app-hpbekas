import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiAdapter from "../../api/apiAdapter";
import privateApi from "../../api/privateApi";
import AlertFailed from "../alert/AlertFailed";
import LayoutDashboard from "../layout/LayoutDashboard";
import ChangeImages from "./ChangeImages";

const UpdateProduct = () => {
  // state produk
  const [varian, setVarian] = useState("");
  const [imei, setImei] = useState("");
  const [harga, setHarga] = useState("");
  const [warna, setWarna] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [ram, setRAM] = useState("");
  const [storage, setStorage] = useState("");
  const [statusproduk, setStatusProduk] = useState("");
  const [oldimage, setOldImage] = useState([]);
  const [idproduk, setIdProduk] = useState("");
  const [isHaveQC, setHaveQC] = useState(false);
  // token for update product
  const [token, setToken] = useState("");
  const [validation, setValidation] = useState([]);
  //   get all brand
  const [idBrand, setIdBrand] = useState("");
  const [brand, setBrand] = useState([]);
  const [allVarian, setAllVarian] = useState([]);

  // status update, create,delete
  const [isUpdateImg, setUpdateImg] = useState(false);
  const [isCreateImg, setCreateImg] = useState(false);
  const [isDeleteImg, setDeleteImg] = useState(false);

  const navigate = useNavigate();
  // get slug from params
  const { slug } = useParams();

  useEffect(() => {
    // get attribute product, include varian
    getAttProduct();
    // get brand value
    getBrand();
    // get token for update
    refreshToken();
  }, [isUpdateImg, isCreateImg, isDeleteImg]);

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
    // set have qc or no
    data.qcProduct ? setHaveQC(true) : setHaveQC(false);
    // set idBrand for condition input select brand
    setIdBrand(data.varianProduk.id_merk);
    // set detail product
    setIdProduk(data.id);
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
    <div className="container grid px-6 mx-auto">
      <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Update Produk
      </h2>
      <div className="bg-gray-800 shadow-md text-white rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
        {validation.length !== 0 && <AlertFailed msg={validation} />}
        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
              IMEI
            </label>
            <input
              className="block w-full rounded-md mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
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
          <div className="md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
              Harga
            </label>
            <input
              className="block w-full rounded-md mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
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
        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-full px-3">
            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
              Deskripsi
            </label>
            <textarea
              className="block w-full rounded-md mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
              id="grid-password"
              type="password"
              onChange={(e) => setDeskripsi(e.target.value)}
            >
              {deskripsi}
            </textarea>
          </div>
        </div>
        <div className="-mx-3 md:flex mb-2">
          <div className="md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
              Warna
            </label>
            <input
              className="block w-full rounded-md mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
              placeholder="Warna Handphone"
              value={warna}
              onChange={(e) => setWarna(e.target.value)}
            />
          </div>
          <div className="md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
              Storage
            </label>
            <input
              className="block w-full rounded-md mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
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
          <div className="md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
              RAM
            </label>
            <input
              className="block w-full rounded-md mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
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
        <div className="-mx-3 mt-4 md:flex mb-2">
          <div className="md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
              Merek
            </label>
            <select
              className=" rounded-md block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
              onChange={(e) => getVarian(e.target.value)}
              value={idBrand}
            >
              <option>Pilih Merek</option>
              {brand.map((br, indx) => (
                <option
                  key={indx}
                  value={br.id}
                  // onChange={() => getVarian(br.id)}
                >
                  {br.namamerek}
                </option>
              ))}
            </select>
          </div>
          <div className="md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
              Varian
            </label>
            <select
              className=" rounded-md block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
              onChange={(e) => setVarian(e.target.value)}
              value={varian}
            >
              {allVarian.length ? <option value="">Pilih Varian</option> : ""}
              {allVarian.length
                ? allVarian.map((v, indx) => (
                    <option value={v.id} key={indx}>
                      {v.namavarian}
                    </option>
                  ))
                : ""}
            </select>
          </div>
          <div className="md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
              Status
            </label>
            <select
              className=" rounded-md block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
              onChange={(e) => setStatusProduk(e.target.value)}
              value={statusproduk}
            >
              {/* jika terdapat QC maka tampilkan SQC, SJ, D */}
              {/* jika tidak terdapat QC maka tampilkan BQC, PQC */}
              {isHaveQC ? (
                <>
                  <option value="SQC">Selesai Quality Control</option>
                  <option value="SJ">Siap Jual</option>
                  <option value="D">Denied</option>
                </>
              ) : (
                <>
                  <option value="BQC">Belum Quality Control</option>
                  <option value="PQC">Proses Quality Control</option>
                </>
              )}
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
      <div className="bg-gray-800 shadow-md text-white rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
        {/* call comp ChangeImages with image product data, token, and set status update img */}
        <ChangeImages
          oldimage={oldimage}
          token={token}
          setUpdateImg={setUpdateImg}
          isUpdateImg={isUpdateImg}
          idproduk={idproduk}
          isCreateImg={isCreateImg}
          setCreateImg={setCreateImg}
          setDeleteImg={setDeleteImg}
          isDeleteImg={isDeleteImg}
        />
      </div>
    </div>
  );
};

export default UpdateProduct;
