import React from "react";
import { useState } from "react";

const ImagesProduct = ({ dataImages }) => {
  // console.log(dataImages[0]);
  const [selected, setSelected] = useState(dataImages[0].image);

  return (
    <div className="">
      <div>
        <img
          src={import.meta.env.VITE_BASE_URL + "/product-image/" + selected}
          alt=""
          className="md:h-[31rem] h-[20rem] w-full object-center object-cover rounded-md"
        />
      </div>
      <div className="flex flex-row mt-2 md:justify-center">
        {dataImages.map((d, i) => (
          <div
            className={`pr-2 cursor-pointer ${
              d.image === selected
                ? "border-[3px] border-primary rounded-md"
                : ""
            }`}
            onClick={() => setSelected(d.image)}
            key={i}
          >
            <img
              src={import.meta.env.VITE_BASE_URL + "/product-image/" + d.image}
              className="h-24 w-24 object-cover rounded-md"
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagesProduct;
