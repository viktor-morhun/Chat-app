# Chat App

This is a chat application built using **React** for the front-end, **Express.js** for the back-end, and **MongoDB** (Atlas) for data storage. It supports basic chat functionalities along with some advanced features like live socket connections and automatic message sending. The application uses REST API and WebSockets.

## Deployed Website

You can access the live version of the application here: [Chat App Link](https://chat-app-reenbit.vercel.app/)

## Features

- **Predefined Chats**: Three predefined chats are available when the application loads.
- **Create New Chat**: Users can create new chats with the required fields: first name and last name.
- **Update Chat**: Modify the first name and last name of existing chats.
- **Remove Chat**: Users can delete a chat with a confirmation prompt by right-clicking on the chat.
- **Send Messages**: Send messages and automatically receive a quote response after 3 seconds.
- **Toast Notification**: A toast notification is displayed when a new message is received.
- **Chat Search**: Ability to search through existing chats.
- **Live Socket Connection**: Real-time socket connection with automatic message sending to a random chat (can be toggled with a button).
- **Own Message Updating & Deleting**: Users can update or delete their own messages by right-clicking on them.

### Key Changes:
1. **Right-click actions for renaming or deleting chats**: I added the fact that users must **right-click** on the chat to open a context menu for renaming or deleting the chat.
2. **Message editing and deleting**: Updated the feature to mention that users can **right-click** on their own messages to edit or delete them.

## Installation
### Prerequisites
- **Node.js** and **npm** installed on your system.
- A **MongoDB Atlas** account for the database.

### Steps to Run the Application
1. Clone the repository
2. Install backend dependencies
3. Create a .env file in the server directory and add your MongoDB Atlas connection string
4. Install frontend dependencies
5. Create a .env file in the client directory and add your backend API URL
6. Run both backend and frontend in development mode
7. Open the application in your browser



## Tech Stack
### Frontend:
React (JS), HTML, CSS
WebSocket (Socket.io)
Redux for state management
Vite for build tool

### Backend:
Express.js
MongoDB (Atlas) for the database
Axios for API requests

### Development:
Nodemon for backend auto-reloading during development