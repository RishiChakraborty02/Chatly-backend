import express from "express";
import jwt from "jsonwebtoken";
import { createServer } from "http";
import { Server } from "socket.io";
import authRouter from "./routes/authRoute.js";
import friendsRouter from "./routes/friendsRoute.js";
import messageRouter from "./routes/messageRoute.js";
import { chatServer } from "./socket/chatservices.js";
import { startdb } from "./config/dbConfig.js";

import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT;
const app = express();
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/friends", friendsRouter);
app.use("/api/messages", messageRouter);

const httpServer = createServer(app);

app.get("/", (req, res) => {
  console.log(req.body);
  res.send("Welcome to the chat app");
});

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});
io.use((socket, next) => {
  const token = socket.handshake.headers.token;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return next(new Error("Authentication error"));
      }
      socket.user = decoded.user_id;

      next();
    });
  } else {
    next(new Error("Authentication error : No token"));
  }
});

async function StartServer() {
  try {
    // pool.connect();
    startdb();
    chatServer();

    httpServer.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

StartServer();

export { io };
