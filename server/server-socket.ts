import type http from "http";
import { Server, Socket } from "socket.io";
import User from "../shared/User";
import logic, { GameState } from "./logic";
import UserInferface from "./models/User";

let io: Server;

const userToSocketMap: Map<string, Socket> = new Map<string, Socket>(); // maps user ID to socket object
const socketToUserMap: Map<string, User> = new Map<string, User>(); // maps socket ID to user object

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

      const gameState = logic.disconnectPlayer(socket.id);
      if (gameState) emitToRoom("playersUpdate", gameState);
    });
  });
};

const emitToRoom = (message: string, room: GameState, content: any = undefined): void => {
  let allContent = {
    players: room.players,
    spectators: room.spectators,
    currentStory: room.currentStory,
    currentTurn: room.currentTurn,
    readyVotes: room.readyVotes,
    endVotes: room.endVotes,
    publishVotes: room.publishVotes,
    isPublished: room.isPublished,
    isPrivate: room.isPrivate,
    gameOver: room.gameOver
  }
  if (room) {
    for (let player of room.players)
      getSocketFromSocketID(player.socketId)?.emit(message, content ?? allContent);
    for (let spectator of room.spectators)
      getSocketFromSocketID(spectator)?.emit(message, content ?? allContent);
  }
};

export const getIo = () => io;

export default {
  emitToRoom,
  getIo,
  init,
  removeUser,
  addUser,
  getSocketFromSocketID,
  getUserFromSocketID,
  getSocketFromUserID,
};
