import { useQuery } from "react-query";
import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { API } from "../config/API";

export default function ModalDetail({ id, age, setModal })
 {
  let { data: user } = useQuery("user1", async () => {
    const response = await API.get("/users/" + id);
    return response.data;
  });

  return (

    <>
    <div className="w-full h-full bg-slate-500 opacity-50 fixed z-20"></div>
    <div className="bg-slate-200 centered w-[90%] md:w-[35rem] z-50 rounded-lg px-4 py-8 ">
      <div className="text-2xl font-bold mb-3 text-blue-500 flex gap-2 items-center">
        <FaUser size={30} /> Aplikasi Data Pribadi
      </div>
      <h2 className="font-bold text-blue-400">Detail Data Pribadi</h2>
      <form className="mt-6" >
        <label htmlFor="nik">NIK</label>
        <input
          id="nik"
          type="number"
          name="nik"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg  w-full px-4 py-2 mb-3"
          value={user?.nik}
          disabled
          required
        />
        <label htmlFor="name">Nama Lengkap</label>
        <input
          id="name"
          type="text"
          name="name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg  w-full px-4 py-2 mb-3"
          value={user?.name}
          disabled
          required
        />
        <div className="flex flex-col mb-3">
          <label htmlFor="" className="pb-2">
            Jenis Kelamin
          </label>
          <div>
            <input
              type="radio"
              name="gender"
              id="male"
              value="Laki-Laki"
  
              checked={user?.gender === "Laki-Laki"}
            />
            <label htmlFor="male" className="ml-3 mr-5">
              Laki-Laki
            </label>

            <input
              type="radio"
              name="gender"
              id="female"
              value="Perempuan"
  
              checked={user?.gender === "Perempuan"}
            />
            <label htmlFor="female" className="ml-3">
              Perempuan
            </label>
          </div>
        </div>
        <label htmlFor="date">Tanggal Lahir</label>
        <input
          type="date"
          id="date"
          name="date"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg  w-full px-4 py-2 mb-3"
          value={user?.date}
          disabled
        />
        <label htmlFor="alamat">Alamat</label>
        <textarea
          name="address"
          id="alamat"
          className="bg-white rounded-md border-none  p-3 w-full h-20 resize-none"
          value={user?.address}
          disabled
        ></textarea>
        <label htmlFor="country" className="pb-2">
          Negara
        </label>
        <select
          className="bg-gray-50 border border-gray-300 text-black text-md rounded-lg  w-full px-4 py-2 mb-3"
          name="country"
          id="country"
          value={user?.country}
          disabled
        >
          <option value="">
            -- Pilih Negara --
          </option>
          <option value="indonesia">Indonesia</option>
            <option value="malaysia">Malaysia</option>
            <option value="singapura">Singapura</option>
            <option value="argentina">Argentina</option>
            <option value="brazil">Brazil</option>
            <option value="italia">Italia</option>
            <option value="saudi arabia">Saudi Arabia</option>
        </select>

        <div className="flex justify-center mt-3">
        <button
          className="px-14 py-2 border border-blue-500 rounded-md font-bold text-blue-500 hover:bg-blue-200"
          onClick={() => setModal(false)}
        >
          {" "}
          Kembali{" "}
        </button>
        </div>
      </form>
    </div>
  </>
  );
}
