import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
// start siderbar data by user
import { SideBarSuper } from "../dashboard/sidebar-dashboard/SideBarSuper";
import { SideBarSaler } from "../dashboard/sidebar-dashboard/SideBarSaler";
import { SideBarQC } from "../dashboard/sidebar-dashboard/SideBarQC";
// end siderbar data by user
// ambil aksi logout dan reset
import { Logout, reset } from "../../features/authSlice";
// sidebar mobile
import {
  SideBarMobQC,
  SideBarMobSaler,
  SideBarMobSuper,
} from "../dashboard/sidebar-dashboard/SideBarMobile";
import { useNavigate } from "react-router-dom";

const LayoutDashboard = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // logout handler
  const logout = () => {
    // jika user ada, maka jalankan setelah && (berikan data email)
    dispatch(Logout({ email: user && user.data.email }));
    // reset user state
    dispatch(reset());
    // arahkan ke login
    navigate("/login");
  };

  return (
    <div>
      {/* Layout */}
      <div class="flex h-screen bg-gray-50 dark:bg-gray-900">
        {/* navbar desktop */}
        <aside class="z-20 hidden pt-12 w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0">
          <div class="py-4 text-gray-500 dark:text-gray-400">
            {user && user.data.role === "super" && <SideBarSuper />}
            {user && user.data.role === "adminSale" && <SideBarSaler />}
            {user && user.data.role === "adminQC" && <SideBarQC />}
          </div>
        </aside>
        {/* content */}
        <div class="flex flex-col flex-1">
          {/* Mobile Navbar */}
          <Disclosure
            as="nav"
            className="bg-gray-900 shadow-md shadow-gray-600"
          >
            {({ open }) => (
              <>
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                  <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                      {/* Mobile menu button*/}
                      <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XMarkIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        ) : (
                          <Bars3Icon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </Disclosure.Button>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                      <div className="flex flex-shrink-0 items-center">
                        <a
                          class="text-lg font-bold text-gray-800 dark:text-gray-200"
                          href="#"
                        >
                          BagjaGadget
                        </a>
                      </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                      <button
                        type="button"
                        className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <span className="block px-4 py-2 font-bold text-sm text-gray-700 bg-gray-100">
                              {user && user.data.nama}
                            </span>
                            <a
                              href="/dashboard/profile"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                            >
                              Your Profile
                            </a>
                            <a
                              href="/dashboard/setting"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                            >
                              Settings
                            </a>
                            <button
                              onClick={logout}
                              className="block px-4 py-2 w-full text-left text-sm text-gray-700 hover:bg-gray-200"
                            >
                              Logout
                            </button>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="sm:hidden">
                  <div className="space-y-1 px-2 pt-2 pb-3">
                    {user && user.data.role === "super" && <SideBarMobSuper />}
                    {user && user.data.role === "adminSale" && (
                      <SideBarMobSaler />
                    )}
                    {user && user.data.role === "adminQC" && <SideBarMobQC />}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <main class="h-full pb-16 overflow-y-auto">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default LayoutDashboard;
