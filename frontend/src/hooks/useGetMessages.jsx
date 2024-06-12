import axios from "axios";
import { useEffect } from "react";
import { useSelector ,useDispatch} from "react-redux";
import { setMessages } from "../redux/messageSlice";

const useGetMessages = async () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);


  useEffect(() => {
    const fetchMessages = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(
          `http://localhost:8080/api/v1/message/${selectedUser?._id}`
        );
        dispatch(setMessages(res.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessages();
  }, [selectedUser]);
};

export default useGetMessages;
