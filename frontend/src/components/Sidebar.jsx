import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import OtherUsers from "./OtherUsers";

function Sidebar() {
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.get(`http://localhost:8080/api/v1/user/logout`);
      navigate("/login");
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border border-slate-500 p-4 flex flex-col">
      <form action="" className="flex items-center gap-3 ">
        <input
          className="input input-bordered rounded-md"
          placeholder="Search..."
          type="text"
        />
        <button type="submit" className="btn bg-zinc-700 text-white">
          <FaSearch className="w-6 h-6 outline-none" />
        </button>
      </form>
      <div className="divider px-3"></div>
      <OtherUsers />
      <div className="mt-2">
        <button onClick={logoutHandler} className="btn btn-sm">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
