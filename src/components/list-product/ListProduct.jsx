import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import apiAdapter from "../../api/apiAdapter";
import ItemNotFound from "../../components/product/ItemNotFound";
import ListItem from "../product/ListItem";
import InfiniteScroll from "react-infinite-scroll-component";

const ListProduct = ({
  setProduct,
  products,
  setTempCreate,
  tempCreate,
  setLastCreate,
  lastCreate,
  setHasMore,
  hasMore,
  keyword,
  setKeyword,
}) => {
  const [limit, setLimit] = useState(10);
  const [isLoading, setLoading] = useState(true);

  // ambil data dari query route
  const [searchParams, setSearchParams] = useSearchParams([]);
  // ambil data product by brand
  const getProducts = async () => {
    const res = await apiAdapter.get(
      `/product?brand=${searchParams.get("brand")}&minPrice=${searchParams.get(
        "minPrice"
      )}&maxPrice=${searchParams.get(
        "maxPrice"
      )}&lastCreate=${lastCreate}&q=${keyword}&limit=${limit}`
    );
    const data = await res.data.data;
    // simpan ke state product
    setLoading(false);
    setProduct([...products, ...data]);
    setTempCreate(res.data.lastCreate);
    setHasMore(res.data.hasMore);
  };

  const fetchMore = () => {
    setLastCreate(tempCreate);
  };

  useEffect(
    () => {
      // jika user memilih brand, maka pencariannya dihapus
      if (searchParams.get("brand") !== null) {
        setKeyword("");
      }
      setLoading(true);
      // ambil data product berdasarkan data dari route query brand
      getProducts();
    }, // ambil kembali data product, jika terjadi perubahan pada query route
    [searchParams, lastCreate, keyword]
  );

  return (
    <>
      {/* jika loading telah selesai, dan produk tidak ada -> not found */}
      {!isLoading && products.length == 0 ? (
        <ItemNotFound />
      ) : (
        // jika produk tersedia, maka tampilkan dengan infiniteScroll
        <InfiniteScroll
          dataLength={products.length}
          next={fetchMore}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          className="pb-3"
        >
          <ListItem products={products} />
        </InfiniteScroll>
      )}
    </>
  );
};

export default ListProduct;
