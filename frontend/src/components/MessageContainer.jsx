import React,{useEffect} from 'react'
import Sendinput from './Sendinput';
import Messages from './Messages';
import {useSelector,useDispatch} from 'react-redux'
import { setSelectedUser } from '../redux/userSlice';

function MessageContainer() {
  const { selectedUser, authUser } = useSelector((store) => store.user);
  const dispatch = useDispatch()

  useEffect(() => {
    return () => dispatch(setSelectedUser(null));
  },[])

  return (
    <>
      {selectedUser !== null ? (
        <div className="md:min-w-[450px]  flex flex-col">
          <div className="flex gap-2 items-center bg-zinc-600 text-white px-4 py-2 mb-2">
            <div className="avatar online">
              <div className="w-12 rounded-full">
                <img src={selectedUser?.profilePhoto} alt="" />
              </div>
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex justify-between gap-2">
                <p>{selectedUser?.fullName   }</p>
              </div>
            </div>
          </div>
          {/* <div className="divider my-0 py-0 h-1"></div> */}
          <Messages />
          <Sendinput />
        </div>
      ) : (
        <div className="md:min-w-[550px] flex flex-col justify-center items-center">
          <h1 className="text-4xl text-white font-bold">Hi, {authUser?.fullName} </h1>
          <h1 className="text-2xl text-white">Let's Start Conversation</h1>
        </div>
      )}
    </>
  );
}

export default MessageContainer;
  