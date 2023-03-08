import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import apiAdapter from "../../api/apiAdapter";
import AlertFilterPrice from "../alert/AlertFilterPrice";
import ListItem from "../product/ListItem";

const ListProduct = () => {
  // menyimpan data product
  const [products, setProduct] = useState([]);
  // ambil data dari query route
  const [searchParams, setSearchParams] = useSearchParams([]);
  // ambil data product by brand
  const getProducts = async (idBrand, minPrice, maxPrice) => {
    const res = await apiAdapter.get(
      `/product?brand=${idBrand}&minPrice=${minPrice}&maxPrice=${maxPrice}`
    );
    const data = await res.data.data;
    // simpan ke state product
    setProduct(data);
    console.log(idBrand);
  };

  useEffect(
    () => {
      // ambil data product berdasarkan data dari route query brand
      getProducts(
        searchParams.get("brand"),
        searchParams.get("minPrice"),
        searchParams.get("maxPrice")
      );
    }, // ambil kembali data product, jika terjadi perubahan pada query route
    [searchParams]
  );
  return (
    <>
      {/* jumlah produk */}
      {/* <p className="mb-3 text-sm">2.359 handphone tersedia</p> */}
      <ListItem products={products} />
    </>
  );
};

export default ListProduct;
