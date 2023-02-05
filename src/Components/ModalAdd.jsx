import { useMutation} from "react-query";
import React, { useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { API } from "../config/API";

export default function ModalAdd({ modal, setModal }) {
  const [form, setForm] = useState({
    nik: "",
    name: "",
    gender: "",
    date: "",
    address: "",
    country: "",
  });

  const handleChange = (e) => {
    setForm({
        ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      await API.post("/users", form);
      alert("berhasil menambahkan data");
      setModal(!modal);
    } catch (error) {
      console.log(error);
    }
    
  });

console.log("yg dilihat", form);



  return (
    <>
      <div className="w-full h-full bg-gray-500 opacity-50 fixed z-20"></div>
      <div className="bg-slate-200 centered md:w-[35rem] z-50 rounded-lg px-5 py-5">
        <div className="text-2xl font-bold mb-3 text-green-500 flex gap-2 items-center">
          <FaUserPlus size={30} /> Aplikasi Data Pribadi
        </div>
        <h2 className="font-bold text-green-400">Tambah Data Baru</h2>
        <form className="mt-6" onSubmit={(e) => handleSubmit.mutate(e)}>
          <label htmlFor="nik">NIK</label>
          <input
            id="nik"
            type="number"
            name="nik"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:outline-green-500 w-full px-4 py-2 mb-3"
            placeholder="Masukan NIK"
            onChange={handleChange}
            required
          />
          <label htmlFor="name">Nama Lengkap</label>
          <input
            id="name"
            type="text"
            name="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:outline-green-500 w-full px-4 py-2 mb-3"
            placeholder="Masukan Nama Lengkap"
            onChange={handleChange}
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
                onChange={handleChange}
              />
              <label htmlFor="male" className="ml-3 mr-5">
                Laki-Laki
              </label>

              <input
                type="radio"
                name="gender"
                id="female"
                value="Perempuan"
                onChange={handleChange}
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:outline-green-500 w-full px-4 py-2 mb-3"
            onChange={handleChange}
          />
          <label htmlFor="alamat">Alamat</label>
          <textarea
            name="address"
            id="alamat"
            className="bg-white rounded-md border-none focus:outline-green-500 p-3 w-full h-20 resize-none"
            placeholder="Masukan Alamat"
            onChange={handleChange}
          ></textarea>
          <label htmlFor="country" className="pb-2">
            Negara
          </label>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:outline-green-500 w-full px-4 py-2 mb-3"
            name="country"
            id="country"
            onChange={handleChange}
          >
            <option value="" selected disabled>
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
          <div className="flex flex-row justify-center gap-5">
          <button
            type="submit"
            className="px-14 py-2 bg-green-500 hover:bg-green-300 rounded-md font-bold text-white"
          >
            Simpan
          </button>
          <button
            className=" px-14 py-2 bg-white border border-green-500 rounded-md font-bold text-green-500 hover:bg-transparent"
            onClick={() => setModal(!modal)}
          >
            Kembali
          </button>
          </div>
        </form>
      </div>
    </>
  );
}

