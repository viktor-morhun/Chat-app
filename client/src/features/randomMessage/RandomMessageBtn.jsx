import { useState } from "react";
import { useSocket } from "../../hooks/useSocket";

export const RandomMessageBtn = () => {
  const [isAutoMessaging, setIsAutoMessaging] = useState(false);
  const [socketUrl] = useState(import.meta.env.VITE_WS_URL);
  const socket = useSocket(isAutoMessaging ? socketUrl : null);

  const handleToggle = () => {
    setIsAutoMessaging((value) => !value);

    if (socket) {
      socket.emit("toggle-auto-messaging", { enabled: !isAutoMessaging });
    }
  };

  return (
    <button onClick={handleToggle} className="chat__login">
      {isAutoMessaging ? "Stop Auto Messaging" : "Start Auto Messaging"}
    </button>
  );
};
