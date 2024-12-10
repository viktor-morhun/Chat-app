import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentChat } from "../../redux/chatSlice";

const Toast = ({ name, message, onClose, chatId=null }) => {
  const dispatch = useDispatch();

  const openChat = () => {
    dispatch(updateCurrentChat(chatId));
    onClose();
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="toast" onClick={openChat}>
      <img
        src="https://placehold.co/60x60/000000/FFF"
        alt="profile"
        className="toast__profile-picture"
      />
      <div className="toast__content">
        <div className="toast__title">
          <strong>{name}</strong>
        </div>
        <div className="toast__message">{message}</div>
      </div>
      <button className="toast__close" onClick={onClose}>
        ×
      </button>
    </div>
  );
};

export default Toast;
