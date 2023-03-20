import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import privateApi from "../../api/privateApi";
import AlertFailed from "../alert/AlertFailed";

const ModalUpdateVarian = ({
  setUpdateModal,
  token,
  setIsUpdate,
  idVarian,
}) => {
  // set nama varian dan brand ID
  const [nama, setNama] = useState("");
  const [idBrand, setIdBrand] = useState("");
  // set validation msg
  const [validation, setValidation] = useState([]);
  //   get list of brand
  const [brand, setBrand] = useState([]);

  useEffect(() => {
    getBrand();
    getVarianDetail();
  }, []);

  // handle post membuat varian
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await privateApi.put(
        `/varian/update/${idVarian}`,
        {
          namavarian: nama,
          idMerek: idBrand,
        },
        // headers untuk akses route memperbarui varian
        { headers: { Authorization: token } }
      );
      // modal ditutup
      setUpdateModal(false);
      // dan status sukses update dijadikan true
      setIsUpdate(true);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.length);
        // jika terjadi error pada validasi maka tambahkan pesan error ke state validation
        error.response.data.length === 1
          ? // error jika terjadi conflict nama varian
            setValidation(error.response.data)
          : // error jika terjadi kesalahan pengisian format input
            setValidation(error.response.data.message);
      }
    }
  };

  //   get brand from db
  const getBrand = async () => {
    const res = await privateApi.get("/brand", {
      headers: { Authorization: token },
    });
    setBrand(res.data.data);
  };

  // get detail varian
  const getVarianDetail = async () => {
    const res = await privateApi.get(`/varian/edit/${idVarian}`, {
      headers: { Authorization: token },
    });
    setIdBrand(res.data.data.id_merk);
    setNama(res.data.data.namavarian);
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-md md:max-w-3xl">
          {/*content*/}
          <div className="border-0 bg-gray-800  rounded-lg shadow-lg relative flex flex-col outline-none focus:outline-none max-w-fit md:w-full">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text- font-semibold text-white">
                Tambah Varian Ponsel
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <form onSubmit={handleSubmit}>
              <div className="relative p-6 flex-auto">
                {validation.length !== 0 && <AlertFailed msg={validation} />}
                <div className="w-96">
                  <label class="block text-sm">
                    <span class="text-gray-700 dark:text-gray-400">
                      Nama Varian
                    </span>
                    <input
                      class="block w-full mt-1 rounded-md text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                      placeholder="Nama Varian"
                      required
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                    />
                  </label>
                  <label class="block mt-3 text-sm">
                    <span class="text-gray-700 dark:text-gray-400">Merek</span>
                    <select
                      class="block w-full mt-1 rounded-md text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                      required
                      onChange={(e) => setIdBrand(e.target.value)}
                      value={idBrand}
                    >
                      <option value="">Pilih Merek</option>
                      {brand &&
                        brand.map((brd) => (
                          <option value={brd.id} key={brd.id}>
                            {brd.namamerek}
                          </option>
                        ))}
                    </select>
                  </label>
                </div>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setUpdateModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="submit"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default ModalUpdateVarian;
