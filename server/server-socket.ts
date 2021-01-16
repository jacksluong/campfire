import type http from "http";
import { Server, Socket } from "socket.io";
import User from "../shared/User";
import { GameState } from "./logic";
import Player from "../shared/Player";
import UserModel from "./models/User";

const logic = require("./logic");
const gameState: GameState = logic.gameState;
let io: Server;

const userToSocketMap: Map<string, Socket> = new Map<string, Socket>(); // maps user ID to socket object
const socketToUserMap: Map<string, User> = new Map<string, User>(); // maps socket ID to user object

export const getSocketFromUserID = (userid: string) => userToSocketMap.get(userid);
export const getUserFromSocketID = (socketid: string) => socketToUserMap.get(socketid);
export const getSocketFromSocketID = (socketid: string) => io.sockets.sockets.get(socketid);

export const addUser = (user: User, socket: Socket): void => {
  const oldSocket = userToSocketMap.get(user._id);
  if (oldSocket && oldSocket.id !== socket.id) {
    // there was an old tab open for this user, force it to disconnect
    // is this the behavior you want?

    oldSocket.disconnect();
    socketToUserMap.delete(oldSocket.id);
  }
  userToSocketMap.set(user._id, socket);
  socketToUserMap.set(socket.id, user);
};

export const removeUser = (user: User, socket: Socket): void => {
  // TODO:  I think we want a user to disconnect when they close a tab with the game room open

  if (user) userToSocketMap.delete(user._id);
  socketToUserMap.delete(socket.id);
};

export const init = (server: http.Server): void => {
  io = new Server(server);
  io.on("connection", (socket) => {
    console.log(`socket has connected ${socket.id}`);
    socket.on("disconnect", () => {
      console.log(`socket has disconnected ${socket.id}`);

      // TODO: (handle it if they are in a game -> "playerleft")

      const user = getUserFromSocketID(socket.id);
      if (user !== undefined) removeUser(user, socket);
    });

    /* Joining a game: matchmaking, join*/
    // ("matchmaking" -> "matched") Landing handles adding user to a game in gameState, sends user over to game room page (passing gameId through URL), ("join" -> "playerjoined") user prompts (via socket) server to provide all information about this game (this is the step), then render, and the server lets the other players in the room know

    // TODO: socket.on("matchmaking")
    socket.on("matchmaking", (data: string) => { // userId: string
      if (gameState.players.length === 10) {
        // TODO: handle game full
        console.log("Game full");
      } else {
        UserModel.findById(data).then(user => {
          logic.addPlayer(user);
        })
        // at this point, the user jumps over to /gameroom/:gameId and will call socket.emit("join", req.user._id) to get room information
      }
    }) 

    // TODO: socket.on("join") 

    /* In a game: inputchange, inputsubmit, update */
    // Actions that require synchronization amongst all players in a room include: input change ("inputchange" -> "input changed"), input submit ("inputsubmit" -> "inputsubmitted"), next person chosen ("choose" -> "personchosen")

    // TODO: socket.on("inputchange")

    // TODO: socket.on("inputsubmit")

    // TODO: socket.on("update")

    // TODO: socket.on("choose")
  });
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
