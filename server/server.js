require("dotenv").config();
const http = require("http");
const express = require("express");
const connectDB = require("./config/db");
const app = require("./app");
const socketHandler = require("./services/socketHandler");


connectDB();

const server = http.createServer(app);

socketHandler(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
