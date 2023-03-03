import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import apiAdapter from "../../api/apiAdapter";

const ListProduct = ({ filterData }) => {
  const [products, setProduct] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams([]);
  console.log(searchParams.get("brand"));
  const getProducts = async (idBrand) => {
    const res = await apiAdapter.get(`/product?brand=${idBrand}`);
    const data = await res.data.data;
    setProduct(data);
    console.log(idBrand);
  };

  useEffect(() => {
    console.log("sini");
    getProducts(filterData.brand.join(","));
  }, [filterData]);
  return (
    <>
      <p className="mb-3 text-sm">2.359 handphone tersedia</p>
      <main className="grid grid-cols-2 gap-x-6 gap-y-5 px-1 lg:mt-1 lg:grid-cols-4 lg:gap-x-4">
        {products.map((product) => (
          <article
            class="relative rounded-xl bg-white p-3 shadow-lg hover:shadow-xl"
            key={product.slug}
          >
            <a href="">
              <div class="aspect-square overflow-hidden rounded-md">
                <img
                  class="h-full w-full object-cover transition-all duration-300 group-hover:scale-125"
                  src={
                    product.gambarProduk.length
                      ? `http://localhost:8080/product-image/${product.gambarProduk[0].image}`
                      : "https://images.tokopedia.net/img/cache/900/VqbcmM/2022/3/30/e012aa37-6a6f-4735-ad95-821cbb03497d.png"
                  }
                  alt={product.slug}
                />
              </div>
              <div class="absolute top-3 m-1 rounded-md bg-white">
                <p class="rounded-md bg-blue-700 p-1 text-[10px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3">
                  Sale
                </p>
              </div>
              <div class="mt-4 mb-7 flex items-start justify-between">
                <div class="">
                  {/*  sm:text-sm md:text-sm" */}
                  <p class="text-base font-regular sm:text-sm">
                    {product.namaproduk}
                  </p>
                  {/* sm:text-base md:text-lg */}
                  <p class="text-lg font-bold sm:text-base">Rp12.750.000</p>
                </div>
              </div>
            </a>
          </article>
        ))}
      </main>
    </>
  );
};

export default ListProduct;
