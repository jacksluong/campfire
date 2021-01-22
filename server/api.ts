import express from "express";
import auth from "./auth";
import StoryModel from "./models/Story";
import socketManager from "./server-socket";
import Story from "../shared/Story";
import Player from "../shared/Player";
import { getChatRoomById, createChatRoom } from "./messaging";
import { isValidObjectId } from "mongoose";
import Message from "../shared/Message";
import { ChatRoom } from "./messaging";
import logic, { GameState } from "./logic";

const router = express.Router();

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // Not logged in.
    return res.send({});
  }
  res.send(req.user);
});
router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) {
    const socket = socketManager.getSocketFromSocketID(req.body.socketid);
    if (socket !== undefined) socketManager.addUser(req.user, socket);
  }
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

/** Landing */

router.get("/stories", (req, res) => {
  StoryModel.find({}).then((stories: Story[]) => res.send(stories));
});

//get chat messages
router.get("/chat", (req, res) => {
  let ChatRoom: ChatRoom | undefined = getChatRoomById(req.query.gameId + "");
  if (!ChatRoom) ChatRoom = createChatRoom(req.query.gameId + "");
  const chatMessages: Message[] | undefined = ChatRoom.messages;
  res.send({ messages: chatMessages });
});

//post new messages
router.post("/message", (req, res) => {
  let ChatRoom: ChatRoom = getChatRoomById(req.body.gameId)!;
  const room: GameState = logic.getRoomById(req.body.gameId)!;
  console.log(req.body.socketId);
  let sender: Player | undefined = room.players.find((player) => {
    return player.socketId == req.body.socketId;
  });
  let senderName: string;
  console.log(room);
  if (!sender) {
    //spectator is sending message
    const spectatorIndex: number = room.spectators.indexOf(req.body.socketId);
    senderName = "Spectator " + spectatorIndex;
  } else {
    senderName = sender.name;
  }
  const message: Message = { sender: senderName, content: req.body.content };
  ChatRoom.messages.push(message);
  console.log(`New message by ${senderName}: ${req.body.content}`);
  for (let player of room.players)
    socketManager.getSocketFromSocketID(player.socketId)?.emit("newMessage", message);
  for (let spectator of room.spectators)
    socketManager.getSocketFromSocketID(spectator)?.emit("newMessage", message);
  res.send({});
});

//like a specific story
router.post("/likeStory", (req, res) => {
  const storyId = req.body.storyId;
  const userId = req.body.userId;
  // res.send(StoryModel.find({ _id: storyId }));
  // res.send({ storyId: storyId, userId: userId });
  StoryModel.findById(storyId).then((story: Story) => {
    //copy
    let usersThatLiked = story.usersThatLiked.slice();
    let hasLiked = usersThatLiked.includes(userId);
    if (!hasLiked) {
      usersThatLiked.push(userId);
    } else {
      usersThatLiked.splice(usersThatLiked.indexOf(userId), 1);
    }
    story.usersThatLiked = usersThatLiked;
    story.save();
    res.send({ likes: story.usersThatLiked.length, hasLiked: !hasLiked });
  });
  //todo
  //1. get the array of users
  //2. update
});

router.get("/matchmaking", (req, res) => {
  res.send({ gameId: logic.matchmake(req.user?._id) });
});

router.get("/createPrivate", (req, res) => {
  res.send({ gameId: logic.createRoom(true).gameId });
});

/** Gameplay */

router.post("/leaveGame", (req, res) => {
  // When a player disconnects without closing the tab (i.e. socket remains connected)
  const newGameState = logic.disconnectPlayer(req.body.socketId)!;
  socketManager.emitToRoom("playersUpdate", newGameState);
  res.send({});
});

router.post("/inputChange", (req, res) => {
  const room = logic.getRoomById(req.body.gameId)!;
  socketManager.emitToRoom("inputUpdate", room, req.body.content);
  res.send({});
});

router.post("/inputSubmit", (req, res) => {
  let newInput = {
    content: req.body.content + " ",
    gameId: req.body.gameId,
  };
  const newGameState = logic.addToStory(req.body.gameId, newInput.content);
  socketManager.emitToRoom("storyUpdate", newGameState);
  res.send({});
});

router.post("/endGameRequest", (req, res) => {
  const gameState = logic.processEndgameVote(req.body.gameId, req.body.socketId);
  for (let player of gameState.players) {
    const socket = socketManager.getSocketFromSocketID(player.socketId);
    if (socket) {
      socket.emit("endGamePrompt", req.body.contributor);
      setTimeout(() => socket.emit("takeBackEndGameButton"), 15000); // TODO
    }
  }
  res.send({});
});

/** Voting */

router.post("/voteEndGame", (req, res) => {
  const newGameState = logic.processEndgameVote(req.body.gameId, req.body.socketId);
  if (newGameState.gameOver) socketManager.emitToRoom("gameOver", newGameState);
  res.send({});
});

router.post("/votePublish", (req, res) => {
  const gameState = logic.processPublishVote(req.body.gameId, req.body.socketId);
  if (gameState.isPublished) {
    const guests = gameState.players.find((player) => player.userId == "guest") ? "guests" : "";
    const newStory = new StoryModel({
      name: "TITLE",
      contributorNames: gameState.players
        .filter((player) => player.userId != "guest")
        .map((player) => player.name)
        .concat(guests),
      contributorIds: gameState.players
        .filter((player) => player.userId != "guest")
        .map((player) => player.userId),
      content: gameState.currentStory,
      usersThatLiked: ["bydefaultthereshouldbenouserslikedatpublish"],
      keywords: ["keyword1", "keyword2", "keyword3"],
    });
    newStory.save().then((story) => {
      socketManager.getIo().emit("storyPublished");
      console.log("story saved: ", story);
    });
  }
  res.send({});
});

/** End */

// Sending game state to clients that loaded
router.get("/requestGameState", (req, res) => {
  const gameState = logic.getRoomById(req.query.gameId + "");
  if (!gameState) res.send({});
  else res.send(gameState);
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  const msg = `Api route not found: ${req.method} ${req.url}`;
  res.status(404).send({ msg });
});

export default router;
