import "./App.css";
import { FaUsers, FaUserPlus, FaUserCheck } from "react-icons/fa";
import ModalAdd from "./Components/ModalAdd";
import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { API } from "./config/API";
import ModalUpdate from "./Components/ModalUpdate";
import ModalDelete from "./Components/ModalDelete";
import ModalDetail from "./Components/ModalDetail";

export default function App() {

  const [update, setUpdate] = useState(false);
  const [modal, setModal] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [del, setDel] = useState(false);
  const [detail, setDetail] = useState(false);
  const [id, setId] = useState();
  const [value, setValue] = useState();

  let { data: users, refetch } = useQuery("users", async () => {
    const response = await API.get("/users");
    return response.data;
  });


  let handleDetail = (id) => {
    setDetail(!detail);
    setId(id);
  };

  let handleUpdate = async (id) => {
    setUpdate(!update);
    setId(id);
  };

  let handleDelete = (id, bebas) => {
    setConfirm(!confirm);
    setId(id);
    setValue(bebas)
  };

  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    if (birthDate > today) {
    return 0;
    }
    else {
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
    }
    return age;
    }
    }
  


  let usernik;
  if (users?.length > 0) {
   let daata = Object.values(users);
    usernik = (daata);
  } 

const [form,setForm]= useState({
   searchByNik : "",
   searchByName  : ""
})

 const [hasil, setHasil] = useState();

 const [data,setData] = useState()

 const handleChange = (e) => {
  setForm({
    ...form,
    [e.target.name]: e.target.value,
  });
  setData(null);
 };
console.log("form",form.searchByName)


  const handleSearch = async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };


      const response = await API.post("/users/search", form);

     
      if (response.status === 200) {
        setHasil(response.data);
      refetch()
    }
  } catch (e) {
    console.log(e);
  }
};
console.log("ini kosong", hasil);


useEffect(() => {
  setData();
}, [usernik]);
    
return (
  <>

    {modal && <ModalAdd modal={modal} setModal={setModal} />}
    {confirm && <ModalDelete valuue={value} confirm={confirm} setConfirm={setConfirm} del={del} setDel={setDel} id={id} refetch={refetch} /> }
    {detail && <ModalDetail id={id} age={getAge} setModal={setDetail} />}
    {update && <ModalUpdate id={id} update={update} setUpdate={setUpdate} />}


    <div className="p-7">
      <h1 className="flex items-center gap-3 font-bold text-2xl">
        <FaUsers size={50} /> Aplikasi Data Pribadi
      </h1>
      <div className="flex flex-col gap-7 bg-green-200 px-6 py-10 mt-7 rounded-xl ">
        <div className="flex flex-col">
          <label htmlFor="nik">NIK</label>
          <input
            id="nik"
            name="searchByNik"
            type="number"
            placeholder="search by number..."
            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:outline-green-500 w-full md:w-96 px-4 py-2"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col ">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="searchByName"
            type="text"
            placeholder="search by text..."
            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:outline-green-500 w-full md:w-96 px-4 py-2"
            onChange={handleChange}
          />         
        </div>
      </div>
      <div className="flex justify-end m-4 gap-8">
      <button
          className="flex items-center bg-blue-700 text-white px-8 py-2 rounded-lg hover:underline hover:bg-blue-300"
          onClick={handleSearch}
        >
          <FaUserCheck size={20} /> Search
        </button>
        <button
          className="flex items-center bg-blue-700 text-white py-2 px-10 rounded-lg hover:underline hover:bg-green-500"
          onClick={() => setModal(!modal)}
        >
          <FaUserPlus size={20} /> Add
        </button>
      </div>
      <div className="overflow-x-auto rounded-md border">
        <table className="w-full text-sm text-center text-white">
          <thead className="uppercase text-white bg-cyan-400">
            <tr>
             <th scope="col" className="py-3 px-6">
                no
              </th>
              <th scope="col" className="py-3 px-6">
                nik
              </th>
              <th scope="col" className="py-3 px-6">
                nama lengkap
              </th>
              <th scope="col" className="py-3 px-6">
                umur
              </th>
              <th scope="col" className="py-3 px-6">
                tanggal lahir
              </th>
              <th scope="col" className="py-3 px-6">
                jenis kelamin
              </th>
              <th scope="col" className="py-3 px-6">
                alamat
              </th>
              <th scope="col" className="py-3 px-6">
                negara
              </th>
              <th scope="col" className="py-3 px-6">
                action
              </th>
            </tr>
          </thead>
          <tbody>
           { 
          hasil !== undefined ?

          hasil.map((item, index) => (
              <tr
                key={index}
                className="text-stone-900"
              >
                <td className="px-5">{index + 1}</td>
                <td className="py-4 px-6">{item.nik}</td>
                <td className="py-4 px-6">{item.name}</td>
                <td className="py-4 px-6">{getAge(item.date)}</td>
                <td className="py-4 px-6">{item.date}</td>
                <td className="py-4 px-6">{item.gender}</td>
                <td className="py-4 px-6 w-44">{item.address}</td>
                <td className="py-4 px-6">{item.country}</td>
                <td className="py-4 px-6 flex flex-row items-center gap-2">
                  <div
                    className="cursor-pointer text-blue-500 hover:text-blue-600 font-semibold hover:underline"
                    onClick={() => handleDetail(item.nik)}
                  >
                    Detail
                  </div>
                  <div
                    className="cursor-pointer text-yellow-500 hover:text-yellow-600 font-semibold hover:underline"
                    onClick={() => handleUpdate(item.nik)}
                  >
                    Edit
                  </div>
                  <div
                    className="cursor-pointer text-red-500 hover:text-red-600 font-semibold hover:underline"
                    onClick={() => handleDelete(item.nik,item.name)}
                  >
                    Delete
                  </div>
                </td>
              </tr>
            ))   
            : 
              usernik ? (

                usernik?.map((item, index) => (
                    <tr
                      key={index}
                      className="text-stone-900"
                    >
                      <td className="px-5">{index + 1}</td>
                      <td className="py-4 px-6">{item.nik}</td>
                      <td className="py-4 px-6">{item.name}</td>
                      <td className="py-4 px-6">{getAge(item.date)}</td>
                      <td className="py-4 px-6">{item.date}</td>
                      <td className="py-4 px-6">{item.gender}</td>
                      <td className="py-4 px-6 w-44">{item.address}</td>
                      <td className="py-4 px-6">{item.country}</td>
                      <td className="py-4 px-6 flex flex-row items-center gap-2">
                        <div
                          className="cursor-pointer text-blue-500 hover:text-blue-600 font-semibold hover:underline"
                          onClick={() => handleDetail(item.nik)}
                        >
                          Detail
                        </div>
                        <div
                          className="cursor-pointer text-yellow-500 hover:text-yellow-600 font-semibold hover:underline"
                          onClick={() => handleUpdate(item.nik)}
                        >
                          Edit
                        </div>
                        <div
                          className="cursor-pointer text-red-500 hover:text-red-600 font-semibold hover:underline"
                          onClick={() => handleDelete(item.nik,item.name)}
                        >
                          Delete
                        </div>
                      </td>
                    </tr>
                  )) 
              )
              :
              <div className="text-yellow-500 font-bold">Data Belum Ditambahkan</div>
            }                 
      </tbody> 
    </table>
  </div>
</div>
  </>
);
}
    
          




