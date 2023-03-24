import React from "react";
import { Link } from "react-router-dom";

const SideBarInformation = ({ time }) => {
  return (
    <div className="flex flex-col sticky h-max top-20">
      {/* Informasi Singkat Produk */}
      <div className="p-4 border border-gray-200 rounded-md">
        <div className="flex flex-row mt-2">
          <h1 className="bg-primary px-2 rounded-md text-lg text-white">
            Samsung
          </h1>
        </div>
        <h1 className="text-lg font-bold tracking-tight text-gray-900 md:text-3xl pt-3">
          Samsung A52S
        </h1>
        <div className="pb-4">
          <h1 className="py-4 px-4 mt-3 text-lg font-bold tracking-tight bg-slate-100 text-primary rounded-md md:text-2xl">
            Rp 6.000.000
          </h1>
        </div>
      </div>
      <div className="mt-6 p-4 border border-gray-200 rounded-md">
        <h1 className="text-lg font-bold tracking-tight text-gray-900 md:text-xl pt-3">
          BagjaCell
        </h1>
        <div className="flex flex-col pb-4">
          <h1 className="py-4 px-4 mt-3 text-base font-medium tracking-tight bg-slate-100 text-gray-600 rounded-md md:text-base">
            Mulyasari, Kec. Bayongbong, Kabupaten Garut, Jawa Barat 44162
          </h1>
          {time >= 20 || time < 7 ? (
            <label className="mt-3 text-red-500 font-bold">
              Sekarang Tutup
            </label>
          ) : (
            <label className="mt-3 text-green-500 font-bold">
              Sekarang Buka
            </label>
          )}

          <div className="flex flex-row py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <label className="pl-2 font-bold">
              07.00 - 20.00 | Senin - Minggu
            </label>
          </div>

          <Link
            to={
              "https://www.google.com/maps/place/SMAN+19+GARUT/@-7.2694851,107.7791156,13z/data=!4m17!1m10!4m9!1m1!4e2!1m6!1m2!1s0x2e68a521b61b7809:0x6dd594f1735b6a52!2sSMAN+19+GARUT,+Jalan+Raya+Simpang+-+Samarang,+Mulyasari,+Kabupaten+Garut,+Jawa+Barat!2m2!1d107.8141353!2d-7.2695716!3m5!1s0x2e68a521b61b7809:0x6dd594f1735b6a52!8m2!3d-7.2695716!4d107.8141353!16s%2Fg%2F11f334yy9f"
            }
            target={"_blank"}
            className=""
          >
            <div className="bg-primary mt-3 py-2 text-center rounded-md text-white w-full">
              Arahkan
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideBarInformation;
