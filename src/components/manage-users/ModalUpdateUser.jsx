import React, { useEffect, useState } from "react";
import privateApi from "../../api/privateApi";
import AlertFailed from "../alert/AlertFailed";

export const ModalUpdateUser = ({ setShowUpdate, token, id, setUpdated }) => {
  // set nama, email, dan role akun yang akan diperbarui
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  //   set msg
  const [validation, setValidation] = useState([]);

  useEffect(() => {
    // mengambil detail data user
    getDataAccount();
  }, []);

  const getDataAccount = async () => {
    try {
      // ambil detail akun
      const res = await privateApi.get(`/users/${id}`, {
        headers: { Authorization: token },
      });
      // set nama, email, role pada form dengan detail data user
      setNama(res.data.data.nama);
      setEmail(res.data.data.email);
      setRole(res.data.data.role);
    } catch (error) {
      // jika terjadi error pada saat pengambilan data
      error.response ? setValidation(error.response.data) : "";
    }
  };

  const updateData = async () => {
    try {
      // update users dengan data dari state
      const res = await privateApi.put(
        `/users/edit/${id}`,
        {
          name: nama,
          email: email,
          role: role,
        },
        { headers: { Authorization: token } }
      );
      // tutup modal
      setShowUpdate(false);
      // set sukses update
      setUpdated(true);
    } catch (error) {
      if (error.response) {
        // jika terjadi error pada validasi maka tambahkan pesan error ke state validation
        error.response.data.length === 1
          ? // error jika terjadi conflict email
            setValidation(error.response.data)
          : // error jika terjadi kesalahan pengisian format input
            setValidation(error.response.data.message);
      }
    }
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
                Update Admin User
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

            <div className="relative p-6 flex-auto">
              {/* jika terjadi kesalahan pengisian atau email conflict */}
              {validation.length !== 0 && <AlertFailed msg={validation} />}
              <form action="" onSubmit={updateData} className="w-96">
                <>
                  <label class="block text-sm">
                    <span class="text-gray-700 dark:text-gray-400">Nama</span>
                    <input
                      class="block w-full mt-1 rounded-md text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                      placeholder="Nama Admin"
                      required
                      value={nama ? nama : "Loading..."}
                      // defaultValue={oldData.nama}
                      onChange={(e) => setNama(e.target.value)}
                    />
                  </label>
                  <label class="block text-sm mt-3">
                    <span class="text-gray-700 dark:text-gray-400">Email</span>
                    <input
                      class="block w-full mt-1 rounded-md text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                      placeholder="Email Akses"
                      type="email"
                      required
                      value={email ? email : "Loading..."}
                      // defaultValue={oldData.email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </label>
                  <label class="block mt-3 text-sm">
                    <span class="text-gray-700 dark:text-gray-400">Role</span>
                    <select
                      class="block w-full mt-1 rounded-md text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                      required
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="">Pilih Role</option>
                      <option selected={role === "adminSale"} value="adminSale">
                        Admin Sale
                      </option>
                      <option value="adminQC" selected={role === "adminQC"}>
                        Admin Quality Control
                      </option>
                    </select>
                  </label>
                </>
              </form>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowUpdate(false)}
              >
                Cancel
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => updateData()}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};
