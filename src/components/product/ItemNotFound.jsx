const ItemNotFound = () => {
  return (
    <div className="px-4 py-5 mt-6 border border-gray-300 rounded">
      <h1 className="font-bold text-xl pb-2 text-gray-600">
        Oops, produk nggak ditemukan
      </h1>
      <p className="text-sm font-medium">Coba perbaiki filter pencarian anda</p>
    </div>
  );
};

export default ItemNotFound;
