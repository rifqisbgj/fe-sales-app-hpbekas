import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import privateApi from "../../api/privateApi";
import MainNav from "../navbar/MainNav";
import ImagesProduct from "./CompDetail/ImagesProduct";
import RecommendByBrand from "./CompDetail/RecommendByBrand";
import RecommendByNewest from "./CompDetail/RecommendByNewest";
import SideBarInformation from "./CompDetail/SideBarInformation";

const DetailProduct = () => {
  const [time, setTime] = useState(new Date().getHours());
  const [dataProduk, setData] = useState([]);
  const [dataProdukByBrand, setDataByBrand] = useState([]);
  // get slug from params
  const { slug } = useParams();
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().getHours());
    }, 2000);
    getDetail();

    return () => clearInterval(interval);
  }, []);

  // get fresh access token
  const refreshToken = async () => {
    try {
      // ambil token user
      const response = await apiAdapter.get("/users/token", {
        withCredentials: true,
      });
      // setToken
      return response.data.data.token;
    } catch (error) {
      if (error.response) {
        navigate("/");
      }
    }
  };

  // get detail product
  const detailProduct = async (token) => {
    try {
      // get detail product
      const res = await privateApi.get(`/product/detail/${slug}`, {
        headers: { Authorization: token },
      });
      const data = await res.data.data;
      setData(data);

      // get data by brand
      const resDataBrand = await privateApi.get(
        `/product?limit=5&brand=${data.varianProduk.merk.id}`
      );
      const dataByBrand = await resDataBrand.data.data;
      setDataByBrand(dataByBrand.filter((e) => e.id !== data.id));
    } catch (error) {
      if (error.response) {
        navigate("/");
      }
    }
  };

  const getDetail = async () => {
    // mengambil token terlebih dulu
    await refreshToken().then((res) => {
      // passing token ke detail product
      detailProduct(res);
    });
  };

  return (
    <>
      <MainNav />
      <div class="max-w-7xl py-4 mx-auto px-4 sm:px-6 lg:px-8 mt-2">
        <div className="grid grid-cols-1 mt-4 md:grid-cols-3 gap-y-5 md:gap-4">
          <div className="col-span-2">
            {dataProduk.gambarProduk && (
              <ImagesProduct dataImages={dataProduk.gambarProduk} />
            )}

            <div className="flex flex-col border border-gray-200 p-4 mt-10 col-span-2 rounded-lg text-gray-600">
              <label className="font-semibold text-2xl pb-3">
                Spesifikasi Singkat
              </label>
              <hr />
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="flex flex-row justify-center items-center mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    shapeRendering="geometricPrecision"
                    textRendering="geometricPrecision"
                    imageRendering="optimizeQuality"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    viewBox="0 0 512 375.4"
                    className="w-8 h-8 fill-gray-700"
                  >
                    <path
                      fillRule="nonzero"
                      d="M25.13 39.95h34.22V0H85.2v39.95h47.65V0h25.84v39.95h47.64V0h25.84v39.95h47.65V0h25.84v39.95h47.65V0h25.84v39.95h47.65V0h25.84v39.95h34.23c6.88 0 13.15 2.82 17.71 7.37l.05.05c4.54 4.55 7.37 10.82 7.37 17.71v247.73c0 6.88-2.83 13.15-7.37 17.71l-.05.05c-4.56 4.54-10.83 7.37-17.71 7.37h-34.23v37.46H426.8v-37.46h-47.65v37.46h-25.84v-37.46h-47.65v37.46h-25.84v-37.46h-47.65v37.46h-25.84v-37.46h-47.64v37.46h-25.84v-37.46H85.2v37.46H59.35v-37.46H25.13c-6.89 0-13.15-2.83-17.71-7.37l-.05-.05C2.83 325.96 0 319.69 0 312.81V65.08c0-6.89 2.83-13.16 7.37-17.71l.05-.05c4.56-4.55 10.82-7.37 17.71-7.37zm154.83 200.1h-35.98l-13.41-30.42h-8.56v30.42H90.83V137.84h51.52c23.44 0 35.16 11.94 35.16 35.81 0 16.36-5.07 27.15-15.21 32.38l17.66 34.02zm-57.95-77.57v23.5h9.05c3.93 0 6.79-.41 8.59-1.23 1.8-.82 2.7-2.7 2.7-5.64v-9.76c0-2.95-.91-4.83-2.7-5.64-1.8-.82-4.67-1.23-8.59-1.23h-9.05zm98.67 77.57h-34.5l26.49-102.21h50.53l26.49 102.21h-34.5l-3.76-16.19h-26.99l-3.76 16.19zm13.29-70.81-3.64 28.62h15.04l-3.48-28.62h-7.92zm96.93 70.81h-34.18l6.21-102.21h42.69l12.76 52h1.14l12.75-52h42.68l6.22 102.21h-34.18l-1.96-49.55h-1.15l-12.43 49.55h-25.01l-12.59-49.55h-.99l-1.96 49.55zM486.16 65.79H25.84V312.1h460.32V65.79z"
                    ></path>
                  </svg>
                  <div className="flex flex-col w-full">
                    <label className="ml-4 text-sm">RAM</label>
                    <label className="ml-4 font-bold text-lg">
                      {dataProduk.ram} GB
                    </label>
                  </div>
                </div>
                <div className="flex flex-row justify-center items-center mt-2">
                  <svg
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 97.86 122.88"
                    xml:space="preserve"
                    className="w-8 h-8 fill-gray-700"
                  >
                    <g>
                      <path
                        class="st0"
                        d="M7.31,0h6.28v17.85h12.39V0h5.56v17.85h12.39V0h5.56v17.85h12.39V0h8.94h3.72l23.32,19.37v7.27v11.03h-9.01 v17.45h9.01v60.44c0,4.02-3.29,7.31-7.31,7.31H63.38v-7.79H33.94v7.79H7.31c-4.02,0-7.31-3.29-7.31-7.31V68.28h7.83V38.67H0V7.31 C0,3.29,3.29,0,7.31,0L7.31,0z"
                      ></path>
                    </g>
                  </svg>
                  <div className="flex flex-col w-full">
                    <label className="ml-4 text-sm">Storage</label>
                    <label className="ml-4 font-bold text-lg">
                      {dataProduk.storage} GB
                    </label>
                  </div>
                </div>
                <div className="flex flex-row justify-center items-center mt-2">
                  <svg
                    id="Layer_1"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 101.03 122.88"
                    className="w-8 h-8 fill-gray-700"
                  >
                    <title>paint-brush-drawing</title>
                    <path d="M42.88,114.05a46.55,46.55,0,0,0,24-3.15,50.83,50.83,0,0,0,9.64-5.19l.64,7.09a56.6,56.6,0,0,1-7.9,4A52.93,52.93,0,0,1,42,120.31,45.8,45.8,0,0,1,15.85,107,55.59,55.59,0,0,1,1.16,79.54,53.4,53.4,0,0,1,6.91,42.23a54.45,54.45,0,0,1,29-24.57,26.55,26.55,0,0,1,12.52-1.74,13.51,13.51,0,0,1,9.4,5.42,3.17,3.17,0,0,1,.33.6c2.93,6.69-.63,10.88-4,14.9-2,2.31-3.84,4.52-2.74,6.64a5,5,0,0,0,3.29,2,20.15,20.15,0,0,0,8,.11c2.6-.42,5.29-1,7.85-1.53,1.86-.39,3.66-.77,5.39-1.09l-1.44,6.72c-.87.17-1.75.36-2.64.55-2.55.54-5.21,1.11-8.17,1.57a26.19,26.19,0,0,1-10.55-.23c-3.41-.89-6-2.66-7.29-5.21-3.07-5.89.14-9.68,3.5-13.64,2.08-2.46,4.26-5,3.2-8a7.45,7.45,0,0,0-5-2.61,20.63,20.63,0,0,0-9.53,1.42A48.13,48.13,0,0,0,12.43,45.32,47,47,0,0,0,7.34,78.23a49.17,49.17,0,0,0,13,24.36,39.44,39.44,0,0,0,22.55,11.46ZM41,101a9.16,9.16,0,1,0,5.25-11.83A9.16,9.16,0,0,0,41,101ZM90.11,0C89.4,11.14,74.8,18,80,29.59a13,13,0,0,0,7.73,6.93,8.55,8.55,0,0,0,4.17.22,8.63,8.63,0,0,0,1.84-.61c7.59-3.44,8.5-12.75,6.25-19.9C97.89,9.64,93.36,3.81,90.11,0Zm9.74,62.1a42.27,42.27,0,0,1-18.21.17l4.93,54.26c.25,3.37.9,5.69,5,6.35a5,5,0,0,0,3.36-1.45,5.47,5.47,0,0,0,1.3-3.55L99.85,62.1ZM94.92,41.2c-2.3.95-6.44,1.45-9.34,0L81.73,59.07c6.39,1.42,12.64,1.69,18.63,0-2.18-8.69-4-8.78-5.44-17.82ZM62.49,81a10.47,10.47,0,0,0,12.35,6.38L73,66.77A10.48,10.48,0,0,0,62.49,81Zm-45.61.86A9.16,9.16,0,1,0,22.13,70a9.15,9.15,0,0,0-5.25,11.84Zm5.37-27a9.09,9.09,0,1,0,5.22-11.75,9.1,9.1,0,0,0-5.22,11.75Z"></path>
                  </svg>
                  <div className="flex flex-col w-full">
                    <label className="ml-4 text-sm">Warna</label>
                    <label className="ml-4 font-bold text-lg">
                      {dataProduk.warna}
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col border border-gray-200 p-4 mt-5 col-span-2 rounded-lg text-gray-600">
              <label className="font-semibold text-2xl pb-3">Deskripsi</label>
              <hr />
              <div
                dangerouslySetInnerHTML={{
                  __html: dataProduk.deskripsi,
                }}
                className="mt-4"
              />
            </div>
          </div>
          {dataProduk.varianProduk && (
            <SideBarInformation
              time={time}
              harga={dataProduk.harga}
              varian={dataProduk.varianProduk.namavarian}
              merek={dataProduk.varianProduk.merk.namamerek}
              qc={dataProduk.qcProduct}
            />
          )}
        </div>
        {dataProdukByBrand.length !== 0 && (
          <RecommendByBrand
            dataProdukByBrand={dataProdukByBrand}
            current={dataProduk.id}
          />
        )}

        <RecommendByNewest />
      </div>
    </>
  );
};

export default DetailProduct;
