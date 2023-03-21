import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser, reset } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import AlertLoginFailed from "../../components/alert/AlertLoginFailed";

const LoginForm = () => {
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
        navigate("/dashboard/");
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
    <section class="bg-[#F4F7FF] h-screen py-14 lg:py-20">
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

          <div>
            <span class="absolute top-1 right-1">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="1.39737"
                  cy="38.6026"
                  r="1.39737"
                  transform="rotate(-90 1.39737 38.6026)"
                  fill="#3056D3"
                />
                <circle
                  cx="1.39737"
                  cy="1.99122"
                  r="1.39737"
                  transform="rotate(-90 1.39737 1.99122)"
                  fill="#3056D3"
                />
                <circle
                  cx="13.6943"
                  cy="38.6026"
                  r="1.39737"
                  transform="rotate(-90 13.6943 38.6026)"
                  fill="#3056D3"
                />
                <circle
                  cx="13.6943"
                  cy="1.99122"
                  r="1.39737"
                  transform="rotate(-90 13.6943 1.99122)"
                  fill="#3056D3"
                />
                <circle
                  cx="25.9911"
                  cy="38.6026"
                  r="1.39737"
                  transform="rotate(-90 25.9911 38.6026)"
                  fill="#3056D3"
                />
                <circle
                  cx="25.9911"
                  cy="1.99122"
                  r="1.39737"
                  transform="rotate(-90 25.9911 1.99122)"
                  fill="#3056D3"
                />
                <circle
                  cx="38.288"
                  cy="38.6026"
                  r="1.39737"
                  transform="rotate(-90 38.288 38.6026)"
                  fill="#3056D3"
                />
                <circle
                  cx="38.288"
                  cy="1.99122"
                  r="1.39737"
                  transform="rotate(-90 38.288 1.99122)"
                  fill="#3056D3"
                />
                <circle
                  cx="1.39737"
                  cy="26.3057"
                  r="1.39737"
                  transform="rotate(-90 1.39737 26.3057)"
                  fill="#3056D3"
                />
                <circle
                  cx="13.6943"
                  cy="26.3057"
                  r="1.39737"
                  transform="rotate(-90 13.6943 26.3057)"
                  fill="#3056D3"
                />
                <circle
                  cx="25.9911"
                  cy="26.3057"
                  r="1.39737"
                  transform="rotate(-90 25.9911 26.3057)"
                  fill="#3056D3"
                />
                <circle
                  cx="38.288"
                  cy="26.3057"
                  r="1.39737"
                  transform="rotate(-90 38.288 26.3057)"
                  fill="#3056D3"
                />
                <circle
                  cx="1.39737"
                  cy="14.0086"
                  r="1.39737"
                  transform="rotate(-90 1.39737 14.0086)"
                  fill="#3056D3"
                />
                <circle
                  cx="13.6943"
                  cy="14.0086"
                  r="1.39737"
                  transform="rotate(-90 13.6943 14.0086)"
                  fill="#3056D3"
                />
                <circle
                  cx="25.9911"
                  cy="14.0086"
                  r="1.39737"
                  transform="rotate(-90 25.9911 14.0086)"
                  fill="#3056D3"
                />
                <circle
                  cx="38.288"
                  cy="14.0086"
                  r="1.39737"
                  transform="rotate(-90 38.288 14.0086)"
                  fill="#3056D3"
                />
              </svg>
            </span>
            <span class="absolute left-1 bottom-1">
              <svg
                width="29"
                height="40"
                viewBox="0 0 29 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="2.288"
                  cy="25.9912"
                  r="1.39737"
                  transform="rotate(-90 2.288 25.9912)"
                  fill="#3056D3"
                />
                <circle
                  cx="14.5849"
                  cy="25.9911"
                  r="1.39737"
                  transform="rotate(-90 14.5849 25.9911)"
                  fill="#3056D3"
                />
                <circle
                  cx="26.7216"
                  cy="25.9911"
                  r="1.39737"
                  transform="rotate(-90 26.7216 25.9911)"
                  fill="#3056D3"
                />
                <circle
                  cx="2.288"
                  cy="13.6944"
                  r="1.39737"
                  transform="rotate(-90 2.288 13.6944)"
                  fill="#3056D3"
                />
                <circle
                  cx="14.5849"
                  cy="13.6943"
                  r="1.39737"
                  transform="rotate(-90 14.5849 13.6943)"
                  fill="#3056D3"
                />
                <circle
                  cx="26.7216"
                  cy="13.6943"
                  r="1.39737"
                  transform="rotate(-90 26.7216 13.6943)"
                  fill="#3056D3"
                />
                <circle
                  cx="2.288"
                  cy="38.0087"
                  r="1.39737"
                  transform="rotate(-90 2.288 38.0087)"
                  fill="#3056D3"
                />
                <circle
                  cx="2.288"
                  cy="1.39739"
                  r="1.39737"
                  transform="rotate(-90 2.288 1.39739)"
                  fill="#3056D3"
                />
                <circle
                  cx="14.5849"
                  cy="38.0089"
                  r="1.39737"
                  transform="rotate(-90 14.5849 38.0089)"
                  fill="#3056D3"
                />
                <circle
                  cx="26.7216"
                  cy="38.0089"
                  r="1.39737"
                  transform="rotate(-90 26.7216 38.0089)"
                  fill="#3056D3"
                />
                <circle
                  cx="14.5849"
                  cy="1.39761"
                  r="1.39737"
                  transform="rotate(-90 14.5849 1.39761)"
                  fill="#3056D3"
                />
                <circle
                  cx="26.7216"
                  cy="1.39761"
                  r="1.39737"
                  transform="rotate(-90 26.7216 1.39761)"
                  fill="#3056D3"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
