import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import privateApi from "../../api/privateApi";
import { GetUserByToken } from "../../features/authSlice";

const ModalCreateUser = ({ setShowModal, token, setSuccess }) => {
  const dispatch = useDispatch();
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState([]);

  const { user } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    // console.log("here");
    // e.preventDefault();
    try {
      const res = await privateApi.post(
        "/users/store",
        {
          name: nama,
          email: email,
          password: password,
          role: role,
          created_by: user.data.email,
        },
        { headers: { Authorization: token } }
      );
      console.log(user.data.email);
      setShowModal(false);
      setSuccess(true);
    } catch (error) {
      if (error.response) {
        setValidation(error.response.data.message);
      }
    }
  };

  privateApi.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (user.expire * 1000 < currentDate.getTime()) {
        // const res = await apiAdapter.get("/users/token", {
        //   withCredentials: true,
        // });
        dispatch(GetUserByToken());
        setToken(res.data.data.token);
        config.headers.Authorization = res.data.data.token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  console.log(nama, email, role, password);
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-md md:max-w-3xl">
          {/*content*/}
          <div className="border-0 bg-gray-800  rounded-lg shadow-lg relative flex flex-col outline-none focus:outline-none max-w-fit md:w-full">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text- font-semibold text-white">
                Tambah Admin User
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
              <form action="" onSubmit={handleSubmit} className="w-96">
                <label class="block text-sm">
                  <span class="text-gray-700 dark:text-gray-400">Nama</span>
                  <input
                    class="block w-full mt-1 rounded-md text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                    placeholder="Nama Admin"
                    required
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
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
                <label class="block text-sm mt-3">
                  <span class="text-gray-700 dark:text-gray-400">Password</span>
                  <input
                    class="block w-full mt-1 rounded-md text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                    type="password"
                    placeholder="Password User"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
                <label class="block mt-3 text-sm">
                  <span class="text-gray-700 dark:text-gray-400">
                    Requested Limit
                  </span>
                  <select
                    class="block w-full mt-1 rounded-md text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                    required
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="">Pilih Role</option>
                    <option value="adminSale">Admin Sale</option>
                    <option value="adminQC">Admin Quality Control</option>
                  </select>
                </label>
              </form>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => handleSubmit()}
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

export default ModalCreateUser;
