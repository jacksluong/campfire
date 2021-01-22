import type http from "http";
import { Server, Socket } from "socket.io";
import User from "../shared/User";
import {
  findOpenRoom,
  addPlayer,
  disconnectPlayer,
  processEndgameVote,
  getRoomById,
  GameState,
} from "./logic";
import UserModel from "./models/User";

// const logic = require("./logic");
// const gameState: GameState = logic.gameState;
let io: Server;

const userToSocketMap: Map<string, Socket> = new Map<string, Socket>(); // maps user ID to socket object
const socketToUserMap: Map<string, User> = new Map<string, User>(); // maps socket ID to user object
const ROOM_CAPACITY = 8;

export const getSocketFromUserID = (userid: string) => userToSocketMap.get(userid);
export const getUserFromSocketID = (socketid: string) => socketToUserMap.get(socketid);
export const getSocketFromSocketID = (socketid: string) => io.sockets.sockets.get(socketid);

export const addUser = (user: User, socket: Socket): void => {
  const oldSocket = userToSocketMap.get(user._id);
  if (oldSocket && oldSocket.id !== socket.id) {
    oldSocket.disconnect();
    socketToUserMap.delete(oldSocket.id);
  }
  userToSocketMap.set(user._id, socket);
  socketToUserMap.set(socket.id, user);
};

export const removeUser = (user: User, socket: Socket): void => {
  if (user) userToSocketMap.delete(user._id);
  socketToUserMap.delete(socket.id);
};

export const init = (server: http.Server): void => {
  io = new Server(server);
  io.on("connection", (socket) => {
    console.log(`socket has connected ${socket.id}`);
    socket.on("disconnect", () => {
      console.log(`socket has disconnected ${socket.id}`);

      const user = getUserFromSocketID(socket.id);
      if (user !== undefined) {
        removeUser(user, socket);
      }

      const gameState = disconnectPlayer(socket.id);
      if (gameState) emitToRoom("playersUpdate", gameState);
    });

    // NOTE: spent a lot of time trying to move this one into api but it does not go well
    socket.on("join", (info: { userId: string; gameId: string }) => {
      UserModel.findById(info.userId).then((user: User) => {
        const gameState = addPlayer(info.gameId, user, socket.id);
        if (!gameState) socket.emit("redirectHome");
        else emitToRoom("playersUpdate", gameState);
      });
    });

    // When players end game
    // TODO: can probably move this over to api
    socket.on("endGameConfirm", (gameId: string) => {
      const gameState = processEndgameVote(gameId, socket.id);
      if (gameState.gameOver) emitToRoom("gameOver", gameState);
    });

    // send GameState to End Page for render
    // TODO: can probably move this to api as well
    socket.on("requestGameState", (gameId: string) => {
      const gameState = getRoomById(gameId);
      if (!gameState) socket.emit("redirectHome");
      socket.emit("sendGameState", gameState);
    });
  });
};

const emitToRoom = (message: string, room: GameState): void => {
  for (let player of room.players) getSocketFromSocketID(player.socketId)?.emit(message, room);
  for (let spectator of room.spectators) getSocketFromSocketID(spectator)?.emit(message, room);
};

export const getIo = () => io;

export default {
  getIo,
  init,
  removeUser,
  addUser,
  getSocketFromSocketID,
  getUserFromSocketID,
  getSocketFromUserID,
};
