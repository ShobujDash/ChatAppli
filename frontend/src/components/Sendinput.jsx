import React,{useState } from 'react'
import { IoMdSend } from "react-icons/io";
import axios from 'axios';
import {useDispatch,useSelector} from 'react-redux'
import { setMessages } from "../redux/messageSlice.js";


function Sendinput() {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);
  const { messages } = useSelector((store) => store.message);

  const onSubmitHandler = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:8080/api/v1/message/send/${selectedUser._id}`, {message}, {
          headers: {
            "Content-Type":"application/json"
          },
          withCredentials:true
        }
      );
      dispatch(setMessages([...messages, res?.data?.newMessage]));
      setMessage("")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="px-4 my-3">
      <div className="w-full relative">
        <input
          onChange={(e)=>setMessage(e.target.value) }
          value={message}
          type="text"
          placeholder="Send a message .."
          className="border text-sm rounded-lg block w-full bg-gray-600 p-3 border-zinc-500 text-white "
        />
        <button type="submit" className=" absolute flex inset-y-0 end-0 items-center p-5 bg-white rounded-lg">
          <IoMdSend />
        </button>
      </div>
    </form>
  );
}

export default Sendinput
