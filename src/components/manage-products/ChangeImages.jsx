import React, { useEffect, useRef, useState } from "react";
import apiAdapter from "../../api/apiAdapter";

const ChangeImages = ({ oldimage }) => {
  const [imageProduk, setImageProduk] = useState([]);
  const [imgPreview, setPreview] = useState([]);

  useEffect(() => {});

  const loadimage = (e) => {
    const image = e.target.files;
    // set image produk
    setImageProduk(image);

    // set preview image by file length and store blob
    for (let i = 0; i < image.length; i++) {
      // store blob to preview image
      setPreview((imgPreview) => [
        ...imgPreview,
        URL.createObjectURL(image[i]),
      ]);
    }
  };

  const handleClick = (e) => {
    hiddenFileInput.current.click();
  };

  const hiddenFileInput = useRef(null);
  const handleFIle = (e) => {
    const fileUploaded = e.target.files[0];
    console.log(fileUploaded);
  };
  return (
    <div class="-mx-3 px-3 flex-col mt-4 md:flex mb-2">
      <label
        class="block uppercase tracking-wide mt-3 text-grey-darker text-xs font-bold mb-2"
        for="grid-city"
      >
        Gambar Produk Saat Ini
      </label>
      <div class="grid grid-cols-2 gap-x-6 gap-y-5 px-1 mt-2 mb-3 lg:grid-cols-5 lg:gap-x-4">
        {oldimage
          ? oldimage.map((imgproduk) => (
              <figure class="relative max-w-xs">
                <img
                  class="rounded-lg shadow-xl hover:shadow-2xl h-44 w-full object-cover"
                  src={"http://localhost:8080/product-image/" + imgproduk.image}
                />
                <figcaption class="absolute text-lg -mt-10 text-white px-4">
                  <div>
                    <button
                      className="rounded-full p-1 hover:bg-red-600 bg-gray-400 border"
                      onClick={() => console.log("tes")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 hover:text-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                    <button
                      className="rounded-full ml-1 p-1 hover:bg-blue-600 bg-gray-400 border"
                      onClick={handleClick}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                        />
                      </svg>
                    </button>
                  </div>
                </figcaption>
              </figure>
            ))
          : "Gambar belum tersedia"}
      </div>
      <label
        class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
        for="grid-city"
      >
        Tambah Gambar Produk
      </label>
      <div class="flex items-center justify-center w-full">
        <label
          for="dropzone-file"
          class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              aria-hidden="true"
              class="w-10 h-10 mb-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span class="font-semibold">Click to upload</span>
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              PNG, JPG, or JPEG (MAX. 3 MB)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            onChange={loadimage}
            accept=".png,.jpg,.jpeg"
            class="hidden"
          />
        </label>
      </div>
      <label
        class="block uppercase tracking-wide mt-3 text-grey-darker text-xs font-bold mb-2"
        for="grid-city"
      >
        Preview Image Produk
      </label>
      <div class="grid grid-cols-2 gap-x-6 gap-y-5 px-1 mt-2 lg:grid-cols-5 lg:gap-x-4">
        <figure class="relative max-w-xs">
          <img
            class="rounded-lg shadow-xl hover:shadow-2xl h-44 w-full object-cover"
            src="https://s.yimg.com/uu/api/res/1.2/6TUuNlPHf9ibJy5LhUXjyg--~B/aD0xMzc1O3c9MjQwMDthcHBpZD15dGFjaHlvbg--/https://media-mbst-pub-ue1.s3.amazonaws.com/creatr-uploaded-images/2021-04/334d9090-a9b8-11eb-bf73-58819afb70c7.cf.jpg"
          />
          <figcaption class="absolute text-lg -mt-10 text-white px-4">
            <div>
              <button
                className="rounded-full p-1 hover:bg-red-600 bg-gray-400 border"
                onClick={() => console.log("Tes")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 hover:text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </div>
          </figcaption>
        </figure>
      </div>

      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleFIle}
        style={{ display: "none" }}
        name=""
        id=""
      />
    </div>
  );
};

export default ChangeImages;
