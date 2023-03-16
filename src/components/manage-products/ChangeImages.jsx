import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import privateApi from "../../api/privateApi";
import AlertFailed from "../alert/AlertFailed";
import AlertSuccess from "../alert/AlertSuccess";

const ChangeImages = ({
  oldimage,
  token,
  setUpdateImg,
  isUpdateImg,
  setCreateImg,
  isCreateImg,
  idproduk,
  setDeleteImg,
  isDeleteImg,
}) => {
  // store file before upload (create new image)
  const [imageProduk, setImageProduk] = useState([]);
  // store image preview
  const [imgPreview, setPreview] = useState([]);
  //   store img id will update
  const [idimg, setIdImg] = useState();
  // validation message
  const [validation, setValidation] = useState();

  // navigate if delete doesn't have access
  const navigate = useNavigate();

  // START CREATE IMAGE PRODUCT
  // load preview image and store new image to state
  const loadimage = (e) => {
    resetStatus();
    const image = e.target.files;
    // set image produk with image Object to state imageProduk
    setImageProduk([...imageProduk, ...Object.values(image)]);

    // set preview image by file length and store blob
    for (let i = 0; i < image.length; i++) {
      // store blob and file to preview image
      setPreview((imgPreview) => [
        ...imgPreview,
        { file: image[i], preview: URL.createObjectURL(image[i]) },
      ]);
    }
  };
  // delete preview image
  const deletePreview = (src) => {
    // delete image produk for create new image product
    setImageProduk([...imageProduk.filter((e) => e !== src)]);
    // delete preview image by src file
    setPreview([...imgPreview.filter((e) => e.file !== src)]);
    // delete validation after delete one preview
    setValidation([]);
  };
  // store new image product to db
  const handleNewImage = async () => {
    const formData = new FormData();
    // get one by one image file and store to productImage body
    imageProduk.forEach((file) => {
      formData.append("productImage", file);
    });
    // store data idproduk to idProduk body
    formData.append("idProduk", idproduk);
    try {
      await privateApi.post("/product-image/store", formData, {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: token,
        },
      });
      // trigger reload new image in update product
      setCreateImg(true);
      // delete preview
      setPreview([]);
      // delete image produk after uploaded
      setImageProduk([]);
    } catch (error) {
      if (error.response) {
        // set validation message
        setValidation(error.response.data);
      }
    }
  };
  // END CREATE IMAGE PRODUCT

  // START UPDATE IMAGE PRODUCT
  //   handleClick with id image for active input file and set state idimg
  const handleClick = (id) => {
    // reset update img status
    setUpdateImg(false);
    // set id image and take for req body
    setIdImg(id);
    // trigger input file click (show window to select image)
    hiddenFileInput.current.click();
  };
  //   get input file form
  const hiddenFileInput = useRef(null);
  //   get file uploaded and store to database
  const handleFIle = (e) => {
    // get file uploaded
    const fileUploaded = e.target.files[0];
    // if file exist, upload to db
    if (fileUploaded !== undefined) {
      uploadImg(fileUploaded);
    }
  };
  //   upload update image to db
  const uploadImg = async (imgUpdate) => {
    try {
      await privateApi.put(
        "/product-image/update",
        {
          idImgProduct: idimg,
          productImage: imgUpdate,
        },
        {
          // headers for input file and access token
          headers: {
            "Content-type": "multipart/form-data",
            Authorization: token,
          },
        }
      );
      //   trigger refetch data image product, set to true/different value
      setUpdateImg(true);
    } catch (error) {
      if (error.response) {
        // set validation message
        setValidation(error.response.data);
      }
    }
  };
  // END UPDATE IMAGE PRODUCT

  // delete image product
  const deleteImg = async (idimg) => {
    resetStatus();
    try {
      await privateApi.delete("/product-image/delete", {
        // data gambar yang akan dihapus
        data: {
          idImgProduct: idimg,
        },
        // headers Authorization untuk akses route delete img
        headers: {
          Authorization: token,
        },
      });
      setDeleteImg(true);
    } catch (error) {
      navigate("/");
    }
  };

  // reset action status
  const resetStatus = () => {
    setCreateImg(false);
    setUpdateImg(false);
    setDeleteImg(false);
  };

  return (
    <div className="-mx-3 px-3 flex-col mt-4 md:flex mb-2">
      <label className="block uppercase tracking-wide mt-3 text-grey-darker text-xs font-bold mb-2">
        Gambar Produk Saat Ini
      </label>
      {/* ALERT SUCCESS AND FAIL */}
      {isUpdateImg && <AlertSuccess msg="Gambar berhasil diperbarui" />}
      {isDeleteImg && <AlertSuccess msg="Gambar berhasil dihapus" />}
      {isCreateImg && <AlertSuccess msg="Gambar berhasil ditambahkan" />}
      {validation && validation.length ? <AlertFailed msg={validation} /> : ""}
      {/* END ALERT */}
      {/* Gambar Produk Terkini */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-5 px-1 mt-2 mb-3 lg:grid-cols-5 lg:gap-x-4">
        {oldimage
          ? oldimage.map((imgproduk, indx) => (
              <figure className="relative max-w-xs" key={indx}>
                <img
                  className="rounded-lg shadow-xl hover:shadow-2xl h-44 w-full object-cover"
                  src={"http://localhost:8080/product-image/" + imgproduk.image}
                />
                <figcaption className="absolute text-lg -mt-10 text-white px-4">
                  <div>
                    <button
                      className="rounded-full p-1 hover:bg-red-600 bg-gray-400 border"
                      onClick={() => deleteImg(imgproduk.id)}
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
                      onClick={() => handleClick(imgproduk.id)}
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
      {/* Akhir Gambar Produk Terkini */}
      <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
        Tambah Gambar Produk
      </label>
      <div className="flex items-center justify-center w-full">
        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              aria-hidden="true"
              className="w-10 h-10 mb-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              PNG, JPG, or JPEG (MAX. 3 MB)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            onChange={loadimage}
            accept=".png,.jpg,.jpeg"
            className="hidden"
            multiple
            onClick={(event) => {
              event.target.value = null;
            }}
          />
        </label>
      </div>
      <label className="block uppercase tracking-wide mt-3 text-grey-darker text-xs font-bold mb-2">
        Preview Image Produk
      </label>
      {/* Image Preview */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-5 px-1 mt-2 lg:grid-cols-5 lg:gap-x-4">
        {imgPreview
          ? imgPreview.map((imgprvw, index) => (
              <figure className="relative max-w-xs" key={index}>
                <img
                  className="rounded-lg shadow-xl hover:shadow-2xl h-44 w-full object-cover"
                  src={imgprvw.preview}
                />
                <figcaption className="absolute text-lg -mt-10 text-white px-4">
                  <div>
                    <button
                      className="rounded-full p-1 hover:bg-red-600 bg-gray-400 border"
                      onClick={() => deletePreview(imgprvw.file)}
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
            ))
          : ""}
      </div>
      {/* End Image Preview */}

      {imgPreview.length ? (
        <div className="flex justify-center mt-2">
          <button
            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-5 py-3 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => handleNewImage()}
          >
            Submit
          </button>
        </div>
      ) : (
        ""
      )}

      {/* Input file for update image product */}
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
