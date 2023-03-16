import React, { useState } from "react";
import privateApi from "../../api/privateApi";

const ModalDeleteProduct = ({
  setShowDelete,
  setSczDelete,
  token,
  idDelete,
  setIdDelete,
  setQcStatus,
  isQc,
  setCodeDelete,
  codeDelete,
}) => {
  //   delete from db
  const deleteProduct = async () => {
    try {
      await privateApi.delete(
        "/product/delete",
        {
          // data produk yang akan dihapus
          data: {
            id: idDelete,
          },
        },
        {
          // headers Authorization untuk akses route /product/delete
          headers: {
            Authorization: token,
          },
        }
      );
      //   set sukses delete ke true
      setSczDelete(true);
      //   matikan modal
      setShowDelete(false);
      //   set id menjadi kosong
      setIdDelete("");
      //   set kode produk menjadi kosong
      setCodeDelete("");
      //   set status qc product
      setQcStatus(false);
    } catch (error) {
      // jika hapus tidak berhasil
      if (error.response) {
        setValidation(error.response.data);
      }
    }
  };
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-md md:max-w-3xl">
          {/*content*/}
          <div className="border-0 bg-gray-800  rounded-lg shadow-lg relative flex flex-col outline-none focus:outline-none max-w-fit md:w-full">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text- font-semibold text-white">Hapus Produk</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowDelete(false)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}

            <div className="relative p-6 flex-auto">
              <p className="text-white">
                {isQc ? "Produk memiliki hasil Quality Control. " : ""} Anda
                yakin akan {isQc ? "menon-aktifkan" : "menghapus"} data produk
                dengan kode: {codeDelete}?
              </p>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowDelete(false)}
              >
                Cancel
              </button>
              <button
                className="text-white bg-orange-400 active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => deleteProduct()}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default ModalDeleteProduct;
