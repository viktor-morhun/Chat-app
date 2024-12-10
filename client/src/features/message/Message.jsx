import { useState } from "react";
import { useDispatch } from "react-redux";
import { formatDate } from "../../utils/formatDate";
import { updateMessageThunk, deleteMessageThunk } from "../../redux/chatThunks";

export function Message({ text, date, type, _id, chatId }) {
  const [showOptions, setShowOptions] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedText, setEditedText] = useState(text);
  const dispatch = useDispatch();

  const handleRightClick = (e) => {
    e.preventDefault();
    if (type === "user") {
      setShowOptions(true);
      setMenuPosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleDelete = () => {
    setShowDeleteConfirmation(true);
    setShowOptions(false);
  };

  const confirmDelete = () => {
    dispatch(deleteMessageThunk(chatId, _id));
    setShowDeleteConfirmation(false);
  };

  const handleEdit = () => {
    setShowEditModal(true);
    setShowOptions(false);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editedText.trim()) {
      dispatch(updateMessageThunk(_id, editedText));
      setShowEditModal(false);
    }
  };

  const handleEditCancel = () => {
    setEditedText(text);
    setShowEditModal(false);
  };

  return (
    <>
      <div
        className={`chat-window__message chat-window__message--${type}`}
        onContextMenu={handleRightClick}
      >
        <p>{text}</p>
        <span className="chat-window__date">{formatDate(date)}</span>
      </div>

      {showOptions && (
        <div
          className="chat__options-menu"
          style={{ top: `${menuPosition.y}px`, left: `${menuPosition.x}px` }}
          onMouseLeave={() => setShowOptions(false)}
        >
          <button onClick={handleEdit} className="chat__option">
            <span>✏️ Edit</span>
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
              Do you want to delete this message?
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

      {showEditModal && (
        <div className="chat-form">
          <div
            className="chat-form__overlay"
            onClick={() => setShowEditModal(false)}
          ></div>
          <form
            onSubmit={handleEditSubmit}
            className="chat-form__content chat-form__content--edit"
          >
            <p className="chat-form__title">Edit Message</p>
            <textarea
              type="text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className="chat-form__input chat-form__input--edit"
            />
            <div className="chat-form__actions">
              <button
                onClick={handleEditCancel}
                className="chat-form__cancel-button"
              >
                Cancel
              </button>
              <button type="submit" className="chat-form__submit-button">
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
