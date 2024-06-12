import React from "react";
import { useSelector } from "react-redux";
import useGetOtherUser from "../hooks/useGetOtherUser";
import OtherUser from "./OtherUser";

function OtherUsers() {
  //my custom hook
  useGetOtherUser()
  const { otherUsers } = useSelector((store) => store.user);

  if (!otherUsers) return;

  return (
    <div className="overflow-auto flex-1">
      {
        otherUsers?.map((user) => {
          return (
            <OtherUser key={ user._id} user={user} />
          );
        })
      }
      
      
    </div>
  );
}

export default OtherUsers;
