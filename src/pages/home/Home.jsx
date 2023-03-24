import React from "react";
import { Link } from "react-router-dom";
import MainNav from "../../components/navbar/MainNav";
import BestBrandTab from "../../components/tab-menu/BestBrandTab";
import NewProductsTab from "../../components/tab-menu/NewProductsTab";
import banner from "../../assets/banner.jpg";

const Tabs = ({ color }) => {
  const [openTab, setOpenTab] = React.useState(1);
  return (
    <>
      <MainNav />
      <div className="">
        <img src={banner} alt="" className="w-full h-full" />
        <div className="flex flex-col">
          <div class="flex justify-center items-start -mt-16 w-full h-full">
            <div className="w-9/12 h-[70rem] md:h-[40rem]">
              <ul
                className="flex mb-0 px-10 list-none flex-wrap flex-row rounded-2xl bg-white"
                role="tablist"
              >
                <li className="mr-2 last:mr-0 flex-auto text-center">
                  <a
                    className={
                      "text-md font-bold uppercase px-5 py-10 block leading-normal " +
                      (openTab === 1
                        ? "text-blue-700 border-b-4 border-primary"
                        : "text-slate-500")
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(1);
                    }}
                    data-toggle="tab"
                    href="#link1"
                    role="tablist"
                  >
                    TERKINI
                  </a>
                </li>
                <li className="mr-2 last:mr-0 flex-auto text-center">
                  <a
                    className={
                      "text-md font-bold uppercase px-5 py-10 block leading-normal " +
                      (openTab === 2
                        ? "text-blue-700 border-b-4  border-primary"
                        : "text-slate-500 ")
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(2);
                    }}
                    data-toggle="tab"
                    href="#link1"
                    role="tablist"
                  >
                    MERK POPULER
                  </a>
                </li>
                <li className="mr-2 last:mr-0 flex-auto text-center">
                  <Link
                    className={
                      "text-md font-bold uppercase px-5 py-10 block leading-normal text-slate-500"
                    }
                    data-toggle="tab"
                    to="/products"
                    role="tablist"
                  >
                    LAINNYA
                  </Link>
                </li>
              </ul>
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mt-4 mb-6 shadow-lg rounded">
                <div className="px-4 py-5 flex-auto">
                  <div className="tab-content tab-space">
                    <div
                      className={openTab === 1 ? "block" : "hidden"}
                      id="link1"
                    >
                      <NewProductsTab />
                    </div>
                    <div
                      className={openTab === 2 ? "block" : "hidden"}
                      id="link2"
                    >
                      <BestBrandTab />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 relative">
            <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-y-16 gap-x-8 py-24 px-4 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Technical Specifications
                </h2>
                <p className="mt-4 text-gray-600">
                  The walnut wood card tray is precision milled to perfectly fit
                  a stack of Focus cards. The powder coated steel divider
                  separates active cards from new ones, or can be used to
                  archive important task lists.
                </p>

                <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
                  <div class="border-t border-gray-200 pt-4">
                    <dt class="font-medium text-gray-900">Origin</dt>
                    <dd class="mt-2 text-sm text-gray-600">
                      Designed by Good Goods, Inc.
                    </dd>
                  </div>

                  <div class="border-t border-gray-200 pt-4">
                    <dt class="font-medium text-gray-900">Material</dt>
                    <dd class="mt-2 text-sm text-gray-600">
                      Solid walnut base with rare earth magnets and powder
                      coated steel card cover
                    </dd>
                  </div>

                  <div class="border-t border-gray-200 pt-4">
                    <dt class="font-medium text-gray-900">Dimensions</dt>
                    <dd class="mt-2 text-sm text-gray-600">
                      6.25&quot; x 3.55&quot; x 1.15&quot;
                    </dd>
                  </div>

                  <div class="border-t border-gray-200 pt-4">
                    <dt class="font-medium text-gray-900">Finish</dt>
                    <dd class="mt-2 text-sm text-gray-600">
                      Hand sanded and finished with natural oil
                    </dd>
                  </div>

                  <div class="border-t border-gray-200 pt-4">
                    <dt class="font-medium text-gray-900">Includes</dt>
                    <dd class="mt-2 text-sm text-gray-600">
                      Wood card tray and 3 refill packs
                    </dd>
                  </div>

                  <div class="border-t border-gray-200 pt-4">
                    <dt class="font-medium text-gray-900">Considerations</dt>
                    <dd class="mt-2 text-sm text-gray-600">
                      Made from natural materials. Grain and color vary with
                      each item.
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
                <img
                  src="https://asset.kompas.com/crops/wcZuBqAJ8JUltBlQd43HJchGIls=/94x0:1156x708/750x500/data/photo/2022/06/24/62b59cf40a431.jpg"
                  alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
                  className="rounded-lg bg-gray-100"
                />
                <img
                  src="https://asset.kompas.com/crops/FNi5Vk5vdSq9dMfmzG1nh-eSijc=/127x0:1140x675/750x500/data/photo/2021/03/02/603e0132c9e89.jpg"
                  alt="Top down view of walnut card tray with embedded magnets and card groove."
                  className="rounded-lg bg-gray-100"
                />
                <img
                  src="https://cdn.idntimes.com/content-images/post/20190315/samsung-galaxy-s10-and-s10-hands-on-559564b155c6d71804f03b3d9658dbd3_600x400.jpg"
                  alt="Side of walnut card tray with card groove and recessed card area."
                  className="rounded-lg bg-gray-100"
                />
                <img
                  src="https://asset.kompas.com/crops/Hodrcm8peytOPNTCEcou-DBG7e0=/82x12:1144x720/750x500/data/photo/2021/05/05/609246656d794.jpg"
                  alt="Walnut card tray filled with cards and card angled in dedicated groove."
                  className="rounded-lg bg-gray-100"
                />
              </div>
            </div>
          </div>
          <div class="relative overflow-hidden bg-white">
            <div class="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
              <div class="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
                <div class="sm:max-w-lg">
                  <h1 class="font text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                    Summer styles are finally here
                  </h1>
                  <p class="mt-4 text-xl text-gray-500">
                    This year, our new summer collection will shelter you from
                    the harsh elements of a world that doesn't care if you live
                    or die.
                  </p>
                </div>
                <div>
                  <div class="mt-10">
                    <div
                      aria-hidden="true"
                      class="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                    >
                      <div class="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                        <div class="flex items-center space-x-6 lg:space-x-8">
                          <div class="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                            <div class="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                              <img
                                src="https://cdn.eraspace.com/pub/media/wysiwyg/artikel/2021/Smartphone2021-1.jpg"
                                alt=""
                                class="h-full w-full object-cover object-center"
                              />
                            </div>
                            <div class="h-64 w-44 overflow-hidden rounded-lg">
                              <img
                                src="https://cdn.idntimes.com/content-images/community/2022/02/oppo-find-x5-pro-2-scaled-5633117cf3d326790e14b142a4bdf5be-9cfb421a490c2080f6d653cf9d96c0d0_600x400.jpeg"
                                alt=""
                                class="h-full w-full object-cover object-center"
                              />
                            </div>
                          </div>
                          <div class="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                            <div class="h-64 w-44 overflow-hidden rounded-lg">
                              <img
                                src="https://cdn.idntimes.com/content-images/community/2022/02/oppo-find-x5-pro-homescreen-5633117cf3d326790e14b142a4bdf5be-a0a6d82c2c4dc91fe1a6a32698313564.jpg"
                                alt=""
                                class="h-full w-full object-cover object-center"
                              />
                            </div>
                            <div class="h-64 w-44 overflow-hidden rounded-lg">
                              <img
                                src="https://cdn2.tstatic.net/shopping/foto/bank/images/hape-tipis.jpg"
                                alt=""
                                class="h-full w-full object-cover object-center"
                              />
                            </div>
                            <div class="h-64 w-44 overflow-hidden rounded-lg">
                              <img
                                src="https://asset.kompas.com/crops/j5x4r6lp2Qw2AxFBV2Hk0ba0pcs=/245x0:3485x2160/750x500/data/photo/2021/10/08/61600643b68ce.jpg"
                                alt=""
                                class="h-full w-full object-cover object-center"
                              />
                            </div>
                          </div>
                          <div class="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                            <div class="h-64 w-44 overflow-hidden rounded-lg">
                              <img
                                src="https://www.trustedreviews.com/wp-content/uploads/sites/54/2023/02/Samsung-Galaxy-S23-Ultra-hands-on-10.jpg"
                                alt=""
                                class="h-full w-full object-cover object-center"
                              />
                            </div>
                            <div class="h-64 w-44 overflow-hidden rounded-lg">
                              <img
                                src="https://expertreviews.b-cdn.net/sites/expertreviews/files/styles/er_main_wide/public/2023/03/best_smartphone_uk_2023_phones.jpg?itok=eMOaaXyR"
                                alt=""
                                class="h-full w-full object-cover object-center"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <a
                      href="#"
                      class="inline-block rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-center font-medium text-white hover:bg-indigo-700"
                    >
                      Shop Collection
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full bg-gray-50">
          <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 ">
            <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="sm:col-span-2">
                <a
                  href="/"
                  aria-label="Go home"
                  title="Company"
                  className="inline-flex items-center"
                >
                  <svg
                    className="w-8 text-deep-purple-accent-400"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeMiterlimit="10"
                    stroke="currentColor"
                    fill="none"
                  >
                    <rect x="3" y="1" width="7" height="12" />
                    <rect x="3" y="17" width="7" height="6" />
                    <rect x="14" y="1" width="7" height="6" />
                    <rect x="14" y="11" width="7" height="12" />
                  </svg>
                  <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                    BagjaCell
                  </span>
                </a>
                <div className="mt-6 lg:max-w-sm">
                  <p className="text-sm text-gray-800">
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, totam rem
                    aperiam.
                  </p>
                  <p className="mt-4 text-sm text-gray-800">
                    Eaque ipsa quae ab illo inventore veritatis et quasi
                    architecto beatae vitae dicta sunt explicabo.
                  </p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <p className="text-base font-bold tracking-wide text-gray-900">
                  Contacts
                </p>
                <div className="flex">
                  <p className="mr-1 text-gray-800">Phone:</p>
                  <a
                    href="tel:850-123-5021"
                    aria-label="Our phone"
                    title="Our phone"
                    className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
                  >
                    850-123-5021
                  </a>
                </div>
                <div className="flex">
                  <p className="mr-1 text-gray-800">Email:</p>
                  <a
                    href="mailto:info@lorem.mail"
                    aria-label="Our email"
                    title="Our email"
                    className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
                  >
                    info@lorem.mail
                  </a>
                </div>
                <div className="flex">
                  <p className="mr-1 text-gray-800">Address:</p>
                  <a
                    href="https://www.google.com/maps"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Our address"
                    title="Our address"
                    className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
                  >
                    312 Lovely Street, NY
                  </a>
                </div>
              </div>
              <div>
                <span className="text-base font-bold tracking-wide text-gray-900">
                  Social
                </span>
                <div className="flex items-center mt-1 space-x-3">
                  <a
                    href="/"
                    className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5"
                    >
                      <path d="M24,4.6c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2c-0.9-1-2.2-1.6-3.6-1.6 c-2.7,0-4.9,2.2-4.9,4.9c0,0.4,0,0.8,0.1,1.1C7.7,8.1,4.1,6.1,1.7,3.1C1.2,3.9,1,4.7,1,5.6c0,1.7,0.9,3.2,2.2,4.1 C2.4,9.7,1.6,9.5,1,9.1c0,0,0,0,0,0.1c0,2.4,1.7,4.4,3.9,4.8c-0.4,0.1-0.8,0.2-1.3,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,2,2.4,3.4,4.6,3.4 c-1.7,1.3-3.8,2.1-6.1,2.1c-0.4,0-0.8,0-1.2-0.1c2.2,1.4,4.8,2.2,7.5,2.2c9.1,0,14-7.5,14-14c0-0.2,0-0.4,0-0.6 C22.5,6.4,23.3,5.5,24,4.6z" />
                    </svg>
                  </a>
                  <a
                    href="/"
                    className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400"
                  >
                    <svg
                      viewBox="0 0 30 30"
                      fill="currentColor"
                      className="h-6"
                    >
                      <circle cx="15" cy="15" r="4" />
                      <path d="M19.999,3h-10C6.14,3,3,6.141,3,10.001v10C3,23.86,6.141,27,10.001,27h10C23.86,27,27,23.859,27,19.999v-10   C27,6.14,23.859,3,19.999,3z M15,21c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S18.309,21,15,21z M22,9c-0.552,0-1-0.448-1-1   c0-0.552,0.448-1,1-1s1,0.448,1,1C23,8.552,22.552,9,22,9z" />
                    </svg>
                  </a>
                  <a
                    href="/"
                    className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5"
                    >
                      <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z" />
                    </svg>
                  </a>
                </div>
                <p className="mt-4 text-sm text-gray-500">
                  Bacon ipsum dolor amet short ribs pig sausage prosciutto
                  chicken spare ribs salami.
                </p>
              </div>
            </div>
            <div className="flex flex-col-reverse justify-between pt-5 pb-10 border-t lg:flex-row">
              <p className="text-sm text-gray-600">
                © Copyright 2023 | PT. Bagja Membangun Negeri
              </p>
              <ul className="flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
                <li>
                  <a
                    href="/"
                    className="text-sm text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
                  >
                    F.A.Q
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-sm text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-sm text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
                  >
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default function Home() {
  return <Tabs />;
}
