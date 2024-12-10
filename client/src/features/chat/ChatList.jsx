import { ChatItem } from "./ChatItem";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchChatsThunk, createChatThunk } from "../../redux/chatThunks";
import { ChatForm } from "./ChatForm";
import { ChatSearch } from "./ChatSearch";

export function ChatList({ onSelectChat }) {
  const dispatch = useDispatch();
  const { chats, loading, error } = useSelector((state) => state.chat);
  const [visibleContextMenu, setVisibleContextMenu] = useState(null);
  const [isChatFormOpen, setIsChatFormOpen] = useState(false);

  const handleCreateChat = ({ firstName, lastName }) => {
    console.log("New Chat Created:", firstName, lastName);
    dispatch(createChatThunk(firstName, lastName));
  };
  const closeAllContextMenus = () => setVisibleContextMenu(null);

  useEffect(() => {
    dispatch(fetchChatsThunk());
  }, [dispatch]);

  if (loading) return <p>Loading chats...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="chatlist">
        <ChatSearch />
        <div className="chatlist__header">
          <h2 className="chatlist__title">Chats</h2>
          <button
            className="chatlist__button"
            onClick={() => setIsChatFormOpen(true)}
          >
            New Chat
          </button>
        </div>
        {isChatFormOpen && (
          <ChatForm
            onSubmit={handleCreateChat}
            onClose={() => setIsChatFormOpen(false)}
            title="New Chat"
          />
        )}

        <div className="chatlist__container">
          {chats.map((chat) => {
            return (
              <ChatItem
                key={chat._id}
                {...chat}
                onCloseAllContextMenus={closeAllContextMenus}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
