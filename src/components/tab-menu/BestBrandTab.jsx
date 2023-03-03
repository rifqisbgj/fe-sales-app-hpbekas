import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiAdapter from "../../api/apiAdapter";

export default function BestBrandTab() {
  const [brand, setBrand] = useState([]);
  const getBrand = async () => {
    const res = await apiAdapter.get(`/brand`);
    const data = await res.data.data;
    setBrand(data);
    console.log(data);
  };

  useEffect(() => {
    getBrand();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-5 px-1 lg:mt-1 lg:grid-cols-4 lg:gap-x-4">
      {brand.map((b) => (
        <Link
          to={{
            pathname: "/products",
            search: `?brand=${b.id}`,
          }}
          className="bg-gray-300 rounded text-center py-5"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Realme-realme-_logo_box-RGB-01.svg/2560px-Realme-realme-_logo_box-RGB-01.svg.png"
            alt=""
          />
          {b.namamerek}
        </Link>
      ))}
    </div>
  );
}
