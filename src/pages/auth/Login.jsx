import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser, reset } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import AlertLoginFailed from "../../components/alert/AlertLoginFailed";

const Login = () => {
  // ambil email dan password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // mengarahkan ke route tertentu
  const navigate = useNavigate();
  // memanggil aksi dari redux
  const dispatch = useDispatch();
  // memanggil properti dari state Auth
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(
    () => {
      // jika user tersedia atau berhasil login, arahkan ke dashboard
      if (user) {
        navigate("/dashboard");
      }
      // reset state
      dispatch(reset());
    }, // jalankan tiap ada perubahan
    [user, isSuccess, dispatch, navigate]
  );

  // handle submit login
  const submitLogin = async (e) => {
    // jika disubmit tidak reload
    e.preventDefault();
    dispatch(LoginUser({ email, password }));
  };

  return (
    <section class="bg-[#F4F7FF] py-14 lg:py-20">
      <div class="container">
        <div class="-mx-4 flex flex-wrap">
          <div class="w-full px-4">
            <div
              class="wow fadeInUp relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white py-14 px-8 text-center sm:px-12 md:px-[60px]"
              data-wow-delay=".15s"
            >
              <div class="mb-10 text-center">
                <a class="mx-auto inline-block max-w-[160px]">
                  <p class=" md:text-xl font-bold">Admin Login</p>
                </a>
              </div>
              {/* jika terdapat error dalam validasi */}
              {isError && message.length != 25
                ? message.map((e) => <AlertLoginFailed msg={e.message} />)
                : ""}

              {/* jika email atau password salah */}
              {isError && message.length == 25 ? (
                <AlertLoginFailed msg={message} />
              ) : (
                ""
              )}
              <form onSubmit={submitLogin} className="mt-5">
                <div class="mb-6">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    class="bordder-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none transition focus:border-primary focus-visible:shadow-none"
                  />
                </div>
                <div class="mb-6">
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    class="bordder-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none transition focus:border-primary focus-visible:shadow-none"
                  />
                </div>
                <div class="mb-10">
                  <button
                    type="submit"
                    class="bordder-primary w-full cursor-pointer rounded-md border bg-primary py-3 px-5 text-base text-white transition duration-300 ease-in-out hover:shadow-md"
                  >
                    {isLoading ? "Loading" : "Login"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
