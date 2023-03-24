import React from "react";
import { Link } from "react-router-dom";

const RecommendByNewest = () => {
  return (
    <div>
      <div className="flex flex-col mt-8">
        <div className="flex justify-between">
          <label className="font-bold text-lg">Produk terbaru</label>
          <div className="flex flex-row text-primary">
            <Link className="font-semibold text-base ">Lihat Semua </Link>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 pl-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-5 px-1 lg:mt-1 lg:grid-cols-5 lg:gap-x-4">
          <article class="relative rounded-xl bg-white p-3 shadow-lg hover:shadow-xl">
            <Link to={"/product/"}>
              <img
                className="transition ease-in-out delay-150 duration-300 h-44 w-full object-cover rounded hover:object-scale-down"
                src={
                  "https://images.tokopedia.net/img/cache/900/VqbcmM/2022/3/30/e012aa37-6a6f-4735-ad95-821cbb03497d.png"
                }
              />
              <div class="pt-4 pb-2 flex items-start justify-between">
                <div class="">
                  <p class="text-base font-semibold lg:text-lg">Rp 60000000</p>
                </div>
              </div>
              <div className="spec">
                <p class="font-semibold text-[15px]">Samsung</p>
                <span className="text-[12px] font-medium text-gray-600">
                  8 GB <span className="text-slate-400">|</span> 256 GB
                </span>
              </div>
            </Link>
          </article>
          <article class="relative rounded-xl bg-white p-3 shadow-lg hover:shadow-xl">
            <Link to={"/product/"}>
              <img
                className="transition ease-in-out delay-150 duration-300 h-44 w-full object-cover rounded hover:object-scale-down"
                src={
                  "https://images.tokopedia.net/img/cache/900/VqbcmM/2022/3/30/e012aa37-6a6f-4735-ad95-821cbb03497d.png"
                }
              />
              <div class="pt-4 pb-2 flex items-start justify-between">
                <div class="">
                  <p class="text-base font-semibold lg:text-lg">Rp 60000000</p>
                </div>
              </div>
              <div className="spec">
                <p class="font-semibold text-[15px]">Samsung</p>
                <span className="text-[12px] font-medium text-gray-600">
                  8 GB <span className="text-slate-400">|</span> 256 GB
                </span>
              </div>
            </Link>
          </article>
          <article class="relative rounded-xl bg-white p-3 shadow-lg hover:shadow-xl">
            <Link to={"/product/"}>
              <img
                className="transition ease-in-out delay-150 duration-300 h-44 w-full object-cover rounded hover:object-scale-down"
                src={
                  "https://images.tokopedia.net/img/cache/900/VqbcmM/2022/3/30/e012aa37-6a6f-4735-ad95-821cbb03497d.png"
                }
              />
              <div class="pt-4 pb-2 flex items-start justify-between">
                <div class="">
                  <p class="text-base font-semibold lg:text-lg">Rp 60000000</p>
                </div>
              </div>
              <div className="spec">
                <p class="font-semibold text-[15px]">Samsung</p>
                <span className="text-[12px] font-medium text-gray-600">
                  8 GB <span className="text-slate-400">|</span> 256 GB
                </span>
              </div>
            </Link>
          </article>
          <article class="relative rounded-xl bg-white p-3 shadow-lg hover:shadow-xl">
            <Link to={"/product/"}>
              <img
                className="transition ease-in-out delay-150 duration-300 h-44 w-full object-cover rounded hover:object-scale-down"
                src={
                  "https://images.tokopedia.net/img/cache/900/VqbcmM/2022/3/30/e012aa37-6a6f-4735-ad95-821cbb03497d.png"
                }
              />
              <div class="pt-4 pb-2 flex items-start justify-between">
                <div class="">
                  <p class="text-base font-semibold lg:text-lg">Rp 60000000</p>
                </div>
              </div>
              <div className="spec">
                <p class="font-semibold text-[15px]">Samsung</p>
                <span className="text-[12px] font-medium text-gray-600">
                  8 GB <span className="text-slate-400">|</span> 256 GB
                </span>
              </div>
            </Link>
          </article>
          <article class="relative rounded-xl bg-white p-3 shadow-lg hover:shadow-xl">
            <Link to={"/product/"}>
              <img
                className="transition ease-in-out delay-150 duration-300 h-44 w-full object-cover rounded hover:object-scale-down"
                src={
                  "https://images.tokopedia.net/img/cache/900/VqbcmM/2022/3/30/e012aa37-6a6f-4735-ad95-821cbb03497d.png"
                }
              />
              <div class="pt-4 pb-2 flex items-start justify-between">
                <div class="">
                  <p class="text-base font-semibold lg:text-lg">Rp 60000000</p>
                </div>
              </div>
              <div className="spec">
                <p class="font-semibold text-[15px]">Samsung</p>
                <span className="text-[12px] font-medium text-gray-600">
                  8 GB <span className="text-slate-400">|</span> 256 GB
                </span>
              </div>
            </Link>
          </article>
        </div>
      </div>
    </div>
  );
};

export default RecommendByNewest;
