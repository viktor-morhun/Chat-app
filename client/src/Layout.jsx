import { ChatList } from "./features/chat/ChatList";
import { ChatWindow } from "./features/chat/ChatWindow";
import { useSelector } from "react-redux";

export function Layout() {
  const { chats, currentChat } = useSelector((state) => state.chat);

  return (
    <>
      <div className="app-layout">
        <main className="main__content">
          <ChatList chats={chats} />
          <ChatWindow
            picture="https://via.placeholder.com/54"
            chatName="John Doe"
            chatId={currentChat}
          />
        </main>
      </div>
    </>
  );
}
