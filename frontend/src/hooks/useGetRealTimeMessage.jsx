import { useEffect } from 'react';
import { useSelector ,useDispatch} from 'react-redux';
import { setMessages } from '../redux/messageSlice';

const useGetRealTimeMessage = () => {
  const dispatch = useDispatch();
  const { socket } = useSelector(store => store.socket);
  const { messages } = useSelector((store) => store.message);
  useEffect(() => {
    socket?.on("newmessage", (newMessage) => {
      dispatch(setMessages([...messages,newMessage]));
    });
  },[socket,messages])
}

export default useGetRealTimeMessage;