import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuthUser, setOtherUsers } from "../redux/userSlice";
import OtherUsers from "./OtherUsers";

function Sidebar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { otherUsers } = useSelector((store) => store.user);

  const logoutHandler = async () => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.get(`http://localhost:8080/api/v1/user/logout`);
      navigate("/login");
      toast.success(res.data.message);
      dispatch(setAuthUser(null))
    } catch (error) {
      console.log(error);
    }
  };
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    const conversationUser = otherUsers?.find((user) =>
      user.fullName.toLowerCase().includes(search.toLowerCase())
    );
    if (conversationUser) {
      dispatch(setOtherUsers([conversationUser]));
    } else {
      toast.error("User Not Found");
    }
  };

  return (
    <div className="border border-slate-500 p-4 flex flex-col">
      <form
        onSubmit={searchSubmitHandler}
        action=""
        className="flex items-center gap-3 "
      >
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
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
