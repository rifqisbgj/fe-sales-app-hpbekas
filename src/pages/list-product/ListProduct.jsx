import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import apiAdapter from "../../api/apiAdapter";

const ListProduct = () => {
  // menyimpan data product
  const [products, setProduct] = useState([]);
  // ambil data dari query route
  const [searchParams, setSearchParams] = useSearchParams([]);
  // ambil data product by brand
  const getProducts = async (idBrand) => {
    const res = await apiAdapter.get(`/product?brand=${idBrand}`);
    const data = await res.data.data;
    // simpan ke state product
    setProduct(data);
    console.log(idBrand);
  };

  useEffect(
    () => {
      // ambil data product berdasarkan data dari route query brand
      getProducts(searchParams.get("brand"));
    }, // ambil kembali data product, jika terjadi perubahan pada query route
    [searchParams]
  );
  return (
    <>
      {/* jumlah produk */}
      <p className="mb-3 text-sm">2.359 handphone tersedia</p>
      <main className="grid grid-cols-2 gap-x-6 gap-y-5 px-1 lg:mt-1 lg:grid-cols-5 lg:gap-x-4">
        {/* tampilkan produk berdasarkan data dari state products */}
        {products.map((product) => (
          <article
            class="relative rounded-xl bg-white p-3 shadow-lg hover:shadow-xl"
            key={product.slug}
          >
            <Link to={"/product/" + product.slug}>
              <img
                className="h-44 w-full object-cover rounded hover:object-scale-down"
                src={
                  product.gambarProduk.length
                    ? `http://localhost:8080/product-image/${product.gambarProduk[0].image}`
                    : "https://images.tokopedia.net/img/cache/900/VqbcmM/2022/3/30/e012aa37-6a6f-4735-ad95-821cbb03497d.png"
                }
                alt={product.slug}
              />

              {/* <div class="absolute top-3 m-1 rounded-md bg-white">
                <p class="rounded-md bg-blue-700 p-1 text-[10px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3">
                  Sale
                </p>
              </div> */}
              <div class="pt-4 pb-2 flex items-start justify-between">
                <div class="">
                  {/*  sm:text-sm md:text-sm" */}
                  {/* <p class="text-base font-regular sm:text-sm">
                    {product.namaproduk}
                  </p> */}
                  {/* sm:text-base md:text-lg */}
                  <p class="text-base font-semibold lg:text-lg">Rp2.000.000</p>
                </div>
              </div>
              <div className="spec">
                <p class="font-semibold text-[15px]">
                  {product.varianProduk.namavarian}
                </p>
                <span className="text-[12px] font-medium text-gray-600">
                  8 GB <span className="text-slate-400">|</span> 128 GB
                </span>
              </div>
            </Link>
          </article>
        ))}
      </main>
    </>
  );
};

export default ListProduct;
