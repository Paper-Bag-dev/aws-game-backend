import "node-self";
import "./polyFill";
import express from "express"
import cors from "cors";
import { Server, Socket } from "socket.io";
import { createServer } from "http";
import GameManager from "./GameManager/gameManager";
import SocketManager from "./SocketManager/socketManager";
const app = express();
app.use(
  cors({
    origin: ["*"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello From Game-Proto Backend!");
});

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
  perMessageDeflate: false,
});

const gameManager = new GameManager();
const socketManager = new SocketManager(io);

io.on("connection", (socket: Socket) => {
  socket.send("hello");
  socket.join(socketManager.getRoom()); // 1. Join Room
  gameManager.socket = socket;
  socket.emit("server-playerId", { playerId: socket.id }); // 2. Return their created or socket id atm
  gameManager.addUser(socket.id); // 3. add User to the list of users
  let capacityReached = gameManager.checkUsers(); // 4. Check Capacity to begin game


  if (capacityReached) {
    socketManager.emitToRoom("startGame", { players: gameManager.players });
    gameManager.initGame();
  }

  socket.on("disconnect", () => {
    console.log(socket.id, "disconnected");
    console.log(gameManager.players);
  });

  socket.on("player-changeData", (data) => {
    console.log("received: ", data.id, data.data.x, data.data.y);
    socket.to("testRoom").emit("server-update-player", data);
    gameManager.updateUser(data);
  });
});

server.listen(8080, () => {
  console.log("Server listening on Port", 8080);
});
