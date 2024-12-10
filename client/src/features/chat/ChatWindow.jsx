import { useState, useMemo, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sendMessageThunk } from "../../redux/chatThunks";
import { Message } from "../message/Message";
import Toast from "./Toast";
import { Send } from "lucide-react";

export function ChatWindow({ chatId }) {
  const dispatch = useDispatch();
  const { chats, messages, loading } = useSelector((state) => state.chat);
  const [messageText, setMessageText] = useState("");
  const [toast, setToast] = useState(null);
  const messagesEndRef = useRef(null);

  const selectedChat = useMemo(() => {
    return chats.find((chat) => chat._id === chatId);
  }, [chats, chatId]);

  const currentMessages = selectedChat?.messages || [];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageText.trim()) {
      dispatch(sendMessageThunk(chatId, messageText));
      setMessageText("");
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView();
    }
  }, [currentMessages]);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage) {
      const chatInfo = chats.find((chat) => chat._id === lastMessage.chat);

      setToast({
        name: `${chatInfo.firstName} ${chatInfo.lastName}`,
        message: lastMessage.content,
        chatId: lastMessage.chat,
      });
    }
  }, [messages]);

  if (loading) return <p>Loading messages...</p>;
  if (!selectedChat)
    return (
      <div className="chat-window chat-window--empty">
        {toast && (
          <Toast
            name={toast.name}
            message={toast.message}
            chatId={toast.chatId}
            onClose={() => setToast(null)}
          />
        )}
        <p className="chat-window__placeholder">
          Select a chat to start messaging
        </p>
      </div>
    );

  return (
    <div className="chat-window">
      {toast && (
        <Toast
          name={toast.name}
          message={toast.message}
          chatId={toast.chatId}
          onClose={() => setToast(null)}
        />
      )}
      <div className="chat-window__header">
        <div className="chat__picture">
          <img
            src="https://placehold.co/60x60/000000/FFF"
            alt="profile"
            className="chat__img"
          />
          <div className={`chat__status ${true ? "active" : "inactive"}`}></div>
        </div>
        <h4 className="chat-window__title">
          {selectedChat.firstName + " " + selectedChat.lastName}
        </h4>
      </div>
      <div className="chat-window__messages">
        {currentMessages.map((message) => (
          <Message
            key={message._id}
            text={message.content}
            date={message.timestamp}
            type={message.sender}
            _id={message._id}
            chatId={message.chat}
          />
        ))}
        <div ref={messagesEndRef}></div>
      </div>
      <form onSubmit={handleSendMessage}>
        <div className="chat-window__input">
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            className="chat-window__input-field"
            placeholder="Type your message"
          />
          <button type="submit" className="chat-window__send-button">
            <Send color="white" />
          </button>
        </div>
      </form>
    </div>
  );
}
