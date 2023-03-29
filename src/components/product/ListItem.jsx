import { Link } from "react-router-dom";

const ListItem = ({ products }) => {
  return (
    <main className="grid grid-cols-2 gap-x-6 gap-y-5 px-1 lg:mt-1 lg:grid-cols-5 lg:gap-x-4">
      {/* tampilkan produk berdasarkan data dari state products */}
      {products.map((product, id) => (
        <article
          class="relative rounded-xl border border-gray-200 bg-white p-3 shadow-md hover:shadow-xl"
          key={id}
        >
          <Link to={"/product/" + product.slug}>
            <img
              className="transition ease-in-out delay-150 duration-300 h-44 w-full object-cover rounded"
              src={
                import.meta.env.VITE_BASE_URL +
                "/product-image/" +
                product.gambarProduk[0].image
              }
              alt={product.slug}
            />
            <div class="pt-4 pb-2 flex items-start justify-between">
              <div class="">
                <p class="text-base font-semibold lg:text-lg">
                  Rp{" " + product.harga.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="spec">
              <p class="font-semibold text-[15px]">
                {product.varianProduk.namavarian}
              </p>
              <span className="text-[12px] font-medium text-gray-600">
                {product.ram} GB <span className="text-slate-400">|</span>{" "}
                {product.storage} GB
              </span>
            </div>
          </Link>
        </article>
      ))}
    </main>
  );
};

export default ListItem;
