import React, { useEffect, useState } from "react";
import BlankData from "../alert/BlankData";
import apiAdapter from "../../api/apiAdapter";
import AlertWarning from "../alert/AlertWarning";
import AlertSuccess from "../alert/AlertSuccess";
import privateApi from "../../api/privateApi";
import { useLocation, useNavigate } from "react-router-dom";

const AddTransaction = () => {
  const navigate = useNavigate();
  const { isSuccessTrx } = useLocation();

  // token access for header Authorization
  const [token, setToken] = useState("");
  //   menyimpan hasil pencarian produk pada transaksi
  const [dataProduk, setProduk] = useState([]);
  //   menyimpan barang yang akan dibeli
  const [dataCheckout, setCheckout] = useState([]);
  // set keyword pencarian
  const [keyword, setKeyword] = useState([]);
  // set nama dan no telp customer
  const [namaCus, setNamaCus] = useState("");
  const [notelpCus, setNotelpCus] = useState("");

  // STATUS AKSI
  // status product not found
  const [isNotFound, setNotFound] = useState(false);
  // status if product already on checkout
  const [isExist, setExist] = useState(false);
  // status if product success store to cart
  const [isSuccess, setSuccess] = useState(false);
  // validation cart is empty
  const [isEmptyCart, setEmptyCart] = useState(false);
  // status if product success deleted from cart
  const [isDeleted, setDeleted] = useState(false);

  useEffect(() => {
    // get access token for action to route
    refreshToken();
  }, []);

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

  const resetStatus = () => {
    setEmptyCart(false);
    // reset success store cart
    setSuccess(false);
    // reset status delete
    setDeleted(false);
    // reset item exist
    setExist(false);
    // reset not found status
    setNotFound(false);
  };

  //   store checkout product
  const addCheckout = async (data) => {
    // reset status action
    resetStatus();
    // check item exist
    const temporary = dataCheckout.find((old) => old.id === data.id);
    if (!temporary) {
      // store checkout
      setSuccess(true);
      return setCheckout([...dataCheckout, data]);
    }
    setExist(true);
  };

  // store customer to db
  const storeCustomer = async (e) => {
    const cus = await privateApi.post(
      "/customer/store",
      {
        nama: namaCus,
        notelp: notelpCus,
      },
      { headers: { Authorization: token } }
    );
    return cus;
  };

  // store transaction to db
  const storeTransaction = async (idcus) => {
    const transaksi = await privateApi.post(
      "/transaksi/store",
      {
        idCustomer: idcus,
        detail: dataCheckout,
      },
      { headers: { Authorization: token } }
    );

    return transaksi.data.data;
  };

  //   store transaction and customer
  const store = async (e) => {
    e.preventDefault();
    resetStatus();
    // check cart is empty
    if (dataCheckout.length === 0) {
      // set status cart to true, it will show alert success
      return setEmptyCart(true);
    }

    // store customer before transaction
    storeCustomer().then((res) =>
      // passing id customer to transaction
      storeTransaction(res.data.data.id).then((tx) =>
        // navigate to detail transaction after success
        navigate(`/dashboard/transaksi/view/${tx.kode_invoice}`)
      )
    );
  };

  const deleteCart = (id) => {
    // console.log(id);
    resetStatus();
    // delete dataCheckout with id product
    setCheckout([...dataCheckout.filter((e) => e.id !== id)]);
    // set alert deleted -> true
    setDeleted(true);
  };

  //   get product by search query
  const getProduk = async (e) => {
    e.preventDefault();
    resetStatus();
    // reset data produk
    setProduk([]);

    // get data product by keyword
    const res = await apiAdapter.get(`/product/${keyword}`);
    // if exist -> set product || doesn't exist -> setNotFound
    res.data.data.length !== 0 ? setProduk(res.data.data) : setNotFound(true);
  };

  return (
    <div class="container grid px-6 mx-auto">
      {isSuccessTrx && <AlertSuccess msg={"Transaksi berhasil diproses"} />}
      <h2 class="my-3 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Tambah Transaksi
      </h2>
      <div class="bg-gray-800 shadow-md text-white rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
        <label className="font-bold text-lg mb-5">Pencarian Produk</label>
        {/* alert jika produk yang ditambahkan, sudah ada di cart */}
        {isExist && <AlertWarning msg={"Produk sudah berada di keranjang"} />}
        {/* alert jika produk berhasil ditambahkan */}
        {isSuccess && (
          <AlertSuccess msg={"Produk berhasil ditambahkan ke keranjang"} />
        )}
        {/* form search product */}
        <form onSubmit={getProduk}>
          <label
            for="default-search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Cari kode produk ..."
              onChange={(e) => setKeyword(e.target.value)}
              required
            />
            <button
              type="submit"
              class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>

        {/* Jika data produk yang dicari tersedia */}
        {dataProduk && dataProduk.length !== 0 && (
          <div className="grid grid-cols-2 gap-x-6 gap-y-5 px-1 lg:mt-5 lg:grid-cols-5 lg:gap-x-4">
            {dataProduk.map((d) => (
              <article class="relative rounded-xl bg-gray-700 p-3 shadow-lg hover:shadow-xl">
                <img
                  className="transition ease-in-out delay-150 duration-300 h-44 w-full object-cover rounded"
                  src={
                    import.meta.env.VITE_BASE_URL +
                    "/product-image/" +
                    d.gambarProduk[0].image
                  }
                />
                <div class="pt-4 pb-2 flex items-start justify-between">
                  <p class="text-base font-semibold lg:text-lg">
                    Rp {d.harga.toLocaleString()}
                  </p>
                </div>
                <p class="font-semibold text-[15px]">
                  {d.varianProduk.namavarian}
                </p>
                <p class="font-normal text-[12px]">{d.kodeproduk}</p>

                <div className="spec">
                  <span className="text-[12px] font-medium text-white">
                    {d.ram} GB <span className="text-slate-400">|</span>{" "}
                    {d.storage} GB
                  </span>
                </div>
                <div className="flex flex-row justify-between">
                  {d.statusproduk === "SJ" && (
                    <label className="bg-green-500 text-[12px] px-2 py-1 rounded-md">
                      Tersedia
                    </label>
                  )}
                  {d.statusproduk === "T" && (
                    <label className="bg-red-500 text-[12px] px-2 py-1 rounded-md">
                      Terjual
                    </label>
                  )}
                  <button onClick={() => addCheckout(d)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-7 h-7"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Jika data produk yang dicari belum ditambahkan atau masih kosong */}
        {dataProduk.length === 0 && !isNotFound && (
          <BlankData msg={"Kamu belum menambahkan produk pada transaksi ini"} />
        )}

        {/* Jika data produk yang dicari tidak tersedia */}
        {isNotFound && (
          <BlankData msg={"Ponsel yang kamu cari tidak tersedia"} />
        )}
      </div>
      <div class="bg-gray-800 shadow-md text-white rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
        <label className="font-bold text-lg mb-2">Checkout Produk</label>
        {isEmptyCart && <AlertWarning msg={"Kamu belum menambahkan produk"} />}
        {isDeleted && (
          <AlertSuccess msg={"Berhasil menghapus produk dari keranjang"} />
        )}
        <div className="grid grid-cols-1 mt-4 md:grid-cols-3 gap-4">
          {/* List Item Pemesanan */}
          <div class="relative overflow-x-auto col-span-2 bg-gray-700 rounded-md ">
            <table class="w-full text-sm  text-left">
              <thead class="text-xs  uppercase ">
                <tr>
                  <th scope="col" class="hidden md:table-cell py-4"></th>
                  <th scope="col" class="px-6 py-3 text-left">
                    Varian Produk
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Harga
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataCheckout &&
                  dataCheckout.length !== 0 &&
                  dataCheckout.map((d) => (
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td class="hidden md:table-cell py-4 w-1/3">
                        <img
                          className="ml-4 rounded-lg shadow-xl hover:shadow-2xl h-32 w-32 object-cover"
                          src={
                            import.meta.env.VITE_BASE_URL +
                            "/product-image/" +
                            d.gambarProduk[0].image
                          }
                        />
                      </td>
                      <td class="py-4">
                        <p class="mb-2 font-semibold">
                          {d.varianProduk.namavarian} - [{d.kodeproduk}]
                        </p>
                        <button
                          onClick={() => deleteCart(d.id)}
                          class="text-red-500"
                        >
                          <small>(Remove item)</small>
                        </button>
                      </td>
                      <td class="py-4">Rp. {d.harga.toLocaleString()}</td>
                    </tr>
                  ))}

                {/* if cart empty */}
                {dataCheckout.length === 0 && (
                  <tr>
                    <td colSpan={3} className="text-center">
                      Belum ada produk di keranjang
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Rincian Pemesanan */}
          <div className="flex flex-col bg-gray-700 text-white h-max rounded-md">
            <label className="px-4 pt-5 font-bold">Identitas Pelanggan</label>
            <form onSubmit={store}>
              <div className="px-4 py-5">
                <div class="text-sm">
                  <span class="text-slate-100">Nama Customer</span>
                  <input
                    class="block w-full mt-2 rounded-md text-sm border-gray-400 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple text-white dark:focus:shadow-outline-gray form-input"
                    placeholder="Nama Customer"
                    required
                    onChange={(e) => setNamaCus(e.target.value)}
                  />
                </div>
                <div class="text-sm mt-3">
                  <span class="text-slate-100">No Telp Customer</span>
                  <input
                    class="block w-full mt-2 rounded-md text-sm border-gray-400 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple text-white dark:focus:shadow-outline-gray form-input"
                    placeholder="No Telp Customer"
                    required
                    onChange={(e) => setNotelpCus(e.target.value)}
                  />
                </div>
              </div>
              <label className="px-4 pb-5 font-bold">Rincian Pemesanan</label>
              <div className="px-4 pb-6">
                <div className="flex justify-between">
                  <label className="text-sm">Total Harga</label>
                  <label className="font-bold">
                    Rp.{" "}
                    {dataCheckout &&
                      dataCheckout
                        .reduce(
                          (total, currentItem) =>
                            (total = total + currentItem.harga),
                          0
                        )
                        .toLocaleString()}
                  </label>
                </div>
                <button className="mt-4 w-full text-center flex justify-center cursor-pointer bg-blue-600 px-2 py-2 text-sm font-bold leading-5 text-white rounded-md  focus:outline-none focus:shadow-outline-gray">
                  Proses Transaksi
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTransaction;
