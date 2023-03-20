import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import privateApi from "../../api/privateApi";

const ModalUpdateQC = ({
  setModalUpdate,
  token,
  setUpdated,
  idQC,
  idProduk,
}) => {
  // set layar, batre, sinyal, dan catatan
  const [layar, setLayar] = useState(false);
  const [batre, setBatre] = useState(false);
  const [sinyal, setSinyal] = useState(false);
  const [catatan, setCatatan] = useState("");

  // mengambil data dari global state auth dengan variable user
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    getDetailQC();
  }, []);

  const getDetailQC = async () => {
    const res = await privateApi.get(`/qc/detail/${idQC}`, {
      headers: { Authorization: token },
    });
    const data = await res.data.data;
    setLayar(data.layar);
    setBatre(data.batre);
    setSinyal(data.sinyal);
    setCatatan(data.catatan);
  };

  // handle post membuat akun admin
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await privateApi.put(
        `/qc/update/${idQC}`,
        {
          id_adminqc: user.data.id,
          id_produk: idProduk,
          layar: layar,
          batre: batre,
          sinyal: sinyal,
          catatan: catatan,
        },
        // headers untuk akses route membuat akun admin
        { headers: { Authorization: token } }
      );
      // modal ditutup
      setModalUpdate(false);
      // dan status sukses dijadikan true
      setUpdated(true);
    } catch (error) {
      if (error.response) {
        // jika terjadi error pada validasi maka tambahkan pesan error ke state validation
        error.response.data.length === 1
          ? // error jika user atau produk tidak tersedia
            setValidation(error.response.data)
          : // error jika terjadi kesalahan pengisian format input
            setValidation(error.response.data.message);
      }
    }
  };

  console.log(layar + " " + batre + " " + sinyal + " " + catatan);

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-md md:max-w-3xl">
          {/*content*/}
          <div className="border-0 bg-gray-800  rounded-lg shadow-lg relative flex flex-col outline-none focus:outline-none max-w-fit md:w-full">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text- font-semibold text-white">
                Perbarui Hasil Quality Control
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setModalUpdate(false)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <form onSubmit={handleSubmit}>
              <div className="relative p-6 flex-auto">
                <div className="w-96">
                  <div className="border rounded-lg border-slate-600">
                    <table class="table-fixed text-gray-400 border-collapse border w-full">
                      <thead>
                        <tr>
                          <th className="border border-slate-600">
                            Pengecekan
                          </th>
                          <th className="border border-slate-600">Baik</th>
                          <th className="border border-slate-600">
                            Tidak Baik
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-slate-600 text-center">
                            Layar
                          </td>
                          <td className="border border-slate-600 text-center">
                            <input
                              id="default-radio-1"
                              type="radio"
                              name={"layar"}
                              checked={layar === true}
                              onChange={() => setLayar(true)}
                              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              required
                            />
                          </td>
                          <td className="border border-slate-600 text-center">
                            <input
                              id="default-radio-1"
                              type="radio"
                              name={"layar"}
                              checked={layar === false}
                              onChange={() => setLayar(false)}
                              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              required
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-slate-600 text-center">
                            Baterai
                          </td>
                          <td className="border border-slate-600 text-center">
                            <input
                              id="default-radio-1"
                              type="radio"
                              name={"baterai"}
                              checked={batre === true}
                              onChange={() => setBatre(true)}
                              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              required
                            />
                          </td>
                          <td className="border border-slate-600 text-center">
                            <input
                              id="default-radio-1"
                              type="radio"
                              name={"baterai"}
                              checked={batre === false}
                              onChange={() => setBatre(false)}
                              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              required
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-slate-600 text-center">
                            Sinyal
                          </td>
                          <td className="border border-slate-600 text-center">
                            <input
                              id="default-radio-1"
                              type="radio"
                              name={"sinyal"}
                              checked={sinyal === true}
                              onChange={() => setSinyal(true)}
                              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              required
                            />
                          </td>
                          <td className="border border-slate-600 text-center">
                            <input
                              id="default-radio-1"
                              type="radio"
                              name={"sinyal"}
                              checked={sinyal === false}
                              onChange={() => setSinyal(false)}
                              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              required
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <label class="block mt-3 text-sm">
                    <span class="text-gray-700 dark:text-gray-400">
                      Catatan
                    </span>
                    <textarea
                      cols="30"
                      rows="10"
                      onChange={(e) => setCatatan(e.target.value)}
                      value={catatan}
                      className="block w-full mt-1 rounded-md text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                    ></textarea>
                  </label>
                </div>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setModalUpdate(false)}
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

export default ModalUpdateQC;
