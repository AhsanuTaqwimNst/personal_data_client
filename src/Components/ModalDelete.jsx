import React from "react";
import { API } from "../config/API";

export default function ModalDelete({confirm, setConfirm, setDel, id, refetch, valuue,})

{
  let handleDelete = async () => {
    await API.delete(`/users/${id}`);
    alert("berhasil menghapus data");
    refetch();
    setConfirm(false);
  };
  return (
    <>
      <div className="w-full h-full bg-slate-500 opacity-50 fixed z-20"></div>
      <div className="bg-slate-200 centered w-[90%] md:w-[35rem] z-50 rounded-lg py-5 px-6">
        <div className="posisi">
          Anda yakin ingin menghapus data
          {" "}<span className="text-red-600">{valuue}</span>{" "}?
        </div>
        <div className="flex flex-row justify-center ">
          <div className="flex gap-5">
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-400 px-8 py-2 text-white font-semibold rounded-xl"
              onClick={handleDelete}
            >
              Ok
            </button>
            <button
              className="bg-white border border-red-500 font-bold px-6 text-red-500 hover:bg-transparent rounded-xl"
              onClick={() => (setConfirm(!confirm), setDel(false))}
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
