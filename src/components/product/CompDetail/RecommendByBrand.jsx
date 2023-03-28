import React from "react";
import { Link } from "react-router-dom";

const RecommendByBrand = ({ dataProdukByBrand, current }) => {
  // menampilkan data rekomendasi brand, tanpa data yang saat ini ditampilkan
  const dataWithOutCurrent = dataProdukByBrand.filter((d) => d.id !== current);
  return (
    <div>
      <div className="flex flex-col mt-8">
        <div className="flex justify-between">
          <label className="font-bold text-lg">
            Produk lain dari{" "}
            {dataProdukByBrand.length !== 0 &&
              dataProdukByBrand[0].varianProduk.merk.namamerek}
          </label>
          <div className="flex flex-row text-primary">
            <Link
              className="font-semibold text-base"
              to={`/products?brand=${
                dataProdukByBrand.length !== 0 &&
                dataProdukByBrand[0].varianProduk.merk.id
              }`}
            >
              Lihat Semua{" "}
            </Link>
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
          {dataWithOutCurrent.map((dt, idx) => (
            <article
              key={idx}
              class="relative rounded-xl border border-gray-200 bg-white p-3 shadow-md hover:shadow-xl"
            >
              <Link to={`/product/${dt.slug}`}>
                <img
                  className="transition ease-in-out delay-150 duration-300 h-44 w-full object-cover rounded hover:object-scale-down"
                  src={
                    import.meta.env.VITE_BASE_URL +
                    "/product-image/" +
                    dt.gambarProduk.image
                  }
                />
                <div class="pt-4 pb-2 flex items-start justify-between">
                  <div class="">
                    <p class="text-base font-semibold lg:text-lg">
                      Rp {dt.harga.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="spec">
                  <p class="font-semibold text-[15px]">
                    {dt.varianProduk.namavarian}
                  </p>
                  <span className="text-[12px] font-medium text-gray-600">
                    {dt.ram} GB <span className="text-slate-400">|</span>{" "}
                    {dt.storage} GB
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendByBrand;
