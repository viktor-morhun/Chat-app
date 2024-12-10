import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { addMessage, addToastMessage } from "../redux/chatSlice";

export const useSocket = (url) => {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (url) {
      const socketConnection = io(url);
      setSocket(socketConnection);

      socketConnection.on("random-message", (message) => {
        const chatId = message.chat;
        dispatch(
          addMessage({
            chatId,
            message,
          })
        );
        dispatch(
          addToastMessage({
            message,
          })
        );
      });

      return () => {
        socketConnection.disconnect();
      };
    }
  }, [url]);

  return socket;
};
