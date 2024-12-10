import {
  fetchChatsStart,
  fetchChatsSuccess,
  fetchChatsFailure,
  addChat,
  addMessage,
  addToastMessage,
  updateChat,
  updateMessage,
  updateMessageId,
  deleteMessage,
  deleteChat,
} from "./chatSlice";

const API_URL = import.meta.env.VITE_BE_URL;

export const fetchChatsThunk = () => async (dispatch) => {
  dispatch(fetchChatsStart());
  try {
    const response = await fetch(`${API_URL}/chats`);
    if (!response.ok) throw new Error("Failed to fetch chats");
    const data = await response.json();
    dispatch(fetchChatsSuccess(data));
  } catch (error) {
    dispatch(fetchChatsFailure(error.message));
  }
};

export const createChatThunk = (firstName, lastName) => async (dispatch) => {
  try {
    const response = await fetch(`${API_URL}/chats`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName }),
    });
    if (!response.ok) throw new Error("Failed to create chat");
    const data = await response.json();
    dispatch(addChat(data));
  } catch (error) {
    console.error(error.message);
  }
};

export const updateChatThunk =
  (id, firstName, lastName) => async (dispatch) => {
    try {
      const response = await fetch(`${API_URL}/chats/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName }),
      });
      if (!response.ok) throw new Error("Failed to update chat");
      const data = await response.json();
      dispatch(updateChat(data));
    } catch (error) {
      console.error(error.message);
    }
  };

  export const updateMessageThunk =
  (id, content) => async (dispatch) => {
    try {
      const response = await fetch(`${API_URL}/messages/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      if (!response.ok) throw new Error("Failed to update chat");
      const data = await response.json();
      dispatch(updateMessage(data));
    } catch (error) {
      console.error(error.message);
    }
  };

export const sendMessageThunk = (chatId, messageText) => async (dispatch) => {
  try {
    const tempMessageId = Date.now().toString();
    const newMessage = {
      _id: tempMessageId,
      chat: chatId,
      content: messageText,
      sender: "user",
      timestamp: new Date().toISOString(),
    };

    dispatch(addMessage({ chatId, message: newMessage }));

    const response = await fetch(`${API_URL}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chatId, content: messageText, sender: "user" }),
    });

    if (!response.ok) {
      throw new Error("Failed to send message");
    }

    const {userMessageId, botMessage} = await response.json();

    dispatch(updateMessageId({ chatId, tempMessageId, newMessageId: userMessageId }));
    setTimeout(() => {
      dispatch(addMessage({ chatId, message: botMessage }));
      dispatch(addToastMessage({ message: botMessage }));
    }, 2900);

  } catch (error) {
    console.error("Error sending message:", error.message);
  }
};

export const deleteMessageThunk = (chatId, messageId) => async (dispatch) => {
  try {
    console.log(chatId, messageId);
    const response = await fetch(`${API_URL}/messages/${messageId}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete chat");
    dispatch(deleteMessage({chatId, messageId}));
  } catch (error) {
    console.error(error.message);
  }
};

export const deleteChatThunk = (id) => async (dispatch) => {
  try {
    const response = await fetch(`${API_URL}/chats/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete chat");
    dispatch(deleteChat(id));
  } catch (error) {
    console.error(error.message);
  }
};
