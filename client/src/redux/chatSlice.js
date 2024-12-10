import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: [],
  messages: [],
  currentChat: "",
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    fetchChatsStart: (state) => {
      state.loading = true;
    },
    fetchChatsSuccess: (state, action) => {
      state.loading = false;
      state.chats = action.payload;
    },
    fetchChatsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addMessage: (state, action) => {
      const { chatId, message } = action.payload;
      const chat = state.chats.find((c) => c._id === chatId);
      if (chat) {
        chat.messages.push(message);
      }
    },
    addToastMessage: (state, action) => {
      const { message } = action.payload;
      state.messages.push(message);
    },
    addChat: (state, action) => {
      state.chats.push(action.payload);
    },
    updateChat: (state, action) => {
      const updatedChat = action.payload;
      const index = state.chats.findIndex(
        (chat) => chat._id === updatedChat._id
      );
      if (index !== -1) {
        const { firstName, lastName } = updatedChat;
        state.chats[index].firstName = firstName;
        state.chats[index].lastName = lastName;
      }
    },
    updateMessage: (state, action) => {
      const updatedMessage = action.payload;
      const { _id, content } = updatedMessage;

      const chat = state.chats.find((chat) =>
        chat.messages.some((message) => message._id === _id)
      );

      if (chat) {
        const message = chat.messages.find((message) => message._id === _id);
        if (message) {
          message.content = content;
        }
      }
    },
    updateMessageId: (state, action) => {
      const { chatId, tempMessageId, newMessageId } = action.payload;
      const chat = state.chats.find((chat) => chat._id === chatId);
      if (chat) {
        const message = chat.messages.find((msg) => msg._id === tempMessageId);
        if (message) {
          message._id = newMessageId;
        }
      }
    },
    deleteMessage: (state, action) => {
      const { chatId, messageId } = action.payload;
      const index = state.chats.findIndex((chat) => chat._id === chatId);
      state.chats[index].messages = state.chats[index].messages.filter(
        (message) => message._id !== messageId
      );
    },
    deleteChat: (state, action) => {
      state.chats = state.chats.filter((chat) => chat._id !== action.payload);
    },
    updateCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
  },
});

export const {
  fetchChatsStart,
  fetchChatsSuccess,
  fetchChatsFailure,
  addChat,
  addMessage,
  addToastMessage,
  updateChat,
  updateCurrentChat,
  updateMessage,
  updateMessageId,
  deleteMessage,
  deleteChat,
} = chatSlice.actions;

export default chatSlice.reducer;
