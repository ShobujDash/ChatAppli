import React from 'react'
import Sendinput from './Sendinput';
import Messages from './Messages';
import {useSelector} from 'react-redux'

function MessageContainer() {
  const { selectedUser } = useSelector((store) => store.user);
  return (
    <div className="md:min-w-[450px]  flex flex-col">
      <div className="flex gap-2 items-center bg-zinc-600 text-white px-4 py-2 mb-2">
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img
              src={selectedUser?.profilePhoto}
              alt=""
            />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex justify-between gap-2">
            <p>{selectedUser?.username}</p>
          </div>
        </div>
      </div>
      {/* <div className="divider my-0 py-0 h-1"></div> */}
      <Messages/>
      <Sendinput/>
    </div>
  );
}

export default MessageContainer;
