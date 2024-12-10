import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteChatThunk, updateChatThunk } from "../../redux/chatThunks";
import { updateCurrentChat } from "../../redux/chatSlice";
import { formatDate } from "../../utils/formatDate";
import { ChatForm } from "./ChatForm";

export function ChatItem({
  firstName,
  lastName,
  _id,
  messages,
  onCloseAllContextMenus,
}) {
  const dispatch = useDispatch();
  const [showOptions, setShowOptions] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const lastMessage = messages[messages.length - 1];
  const {currentChat} = useSelector((state) => state.chat);


  const handleRightClick = (e) => {
    e.preventDefault();
    onCloseAllContextMenus();
    setShowOptions(true);
    setMenuPosition({ x: e.clientX, y: e.clientY });
  };

  const handleDelete = () => {
    setShowDeleteConfirmation(true);
    setShowOptions(false);
  };
  const confirmDelete = () => {
    dispatch(deleteChatThunk(_id));
    setShowDeleteConfirmation(false);
  };

  const handleRename = () => {
    setShowRenameModal(true);
    setShowOptions(false);
  };

  const handleRenameSubmit = ({ firstName, lastName }) => {
    dispatch(updateChatThunk(_id, firstName, lastName));
    setShowRenameModal(false);
  };

  const handleChatClick = () => {
    dispatch(updateCurrentChat(_id));
  };

  return (
    <>
      <div
        className={`chat ${currentChat === _id ? "active-chat" : ""}`}
        onClick={handleChatClick}
        onContextMenu={handleRightClick}
      >
        <div className="chat__picture">
          <img
            src="https://placehold.co/60x60/000000/FFF"
            alt="profile"
            className="chat__img"
          />
          <div
            className={`chat__status ${true ? " active" : " inactive"}`}
          ></div>
        </div>
        {lastMessage ? (
          <div className="chat__info">
            <div className="chat__info-wrapper">
              <h3 className="chat__name">{`${firstName} ${lastName}`}</h3>
              <span className="chat__date">
                {formatDate(lastMessage.timestamp)}
              </span>
            </div>
            <p className="chat__last-message">{lastMessage.content}</p>
          </div>
        ) : (
          <div className="chat__info">
            <div className="chat__info-wrapper">
              <h3 className="chat__name">{`${firstName} ${lastName}`}</h3>
              <span className="chat__date"></span>
            </div>
            <p className="chat__last-message"></p>
          </div>
        )}
      </div>

      {showOptions && (
        <div
          className="chat__options-menu"
          style={{ top: `${menuPosition.y}px`, left: `${menuPosition.x}px` }}
          onMouseLeave={() => setShowOptions(false)}
        >
          <button onClick={handleRename} className="chat__option">
            <span>✏️ Rename</span>
          </button>
          <button onClick={handleDelete} className="chat__option">
            <span>🗑️ Delete</span>
          </button>
        </div>
      )}

      {showDeleteConfirmation && (
        <div className="chat-form">
          <div
            className="chat-form__overlay"
            onClick={() => setShowDeleteConfirmation(false)}
          ></div>
          <div className="chat-form__content">
            <p className="chat-form__title">
              Are you sure you want to delete this chat?
            </p>
            <div className="chat-form__actions">
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className="chat-form__cancel-button"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="chat-form__submit-button chat-form__submit-button--delete"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showRenameModal && (
        <ChatForm
          onSubmit={handleRenameSubmit}
          onClose={() => setShowRenameModal(false)}
          title="Raname Chat"
        />
      )}
    </>
  );
}
