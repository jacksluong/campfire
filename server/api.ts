import express from "express";
import auth from "./auth";
import StoryModel from "./models/Story";
import socketManager from "./server-socket";
import Story from "../shared/Story";
import { addToStory, disconnectPlayer, findOpenRoom, addPlayer, getRoomByPlayer, processPublishVote } from "./logic";

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

router.get("/stories", (req, res) => {
  StoryModel.find({}).then((stories: Story[]) => res.send(stories));
});

router.get("/matchmaking", (req, res) => {
  if (req.user) {
    // if user is in existing room, return to room
    let gameId = getRoomByPlayer(req.user._id)?.gameId;
    if (gameId) {
      res.send({ gameId: gameId });
      return;
    }
  }

  // otherwise return a new room to join
  const gameId = findOpenRoom();
  res.send({ gameId: gameId });
});

// TODO: fix this one up with the new room system
router.post("/publishStory", (req, res) => {
  // publishStory should send gameId and socketId
  const gameState = processPublishVote(req.body.gameId, req.body.socketId);
  if (gameState.isPublished) {
    const guests = gameState.players.find(player => player.userId == "guest") ? "guests" : ""
    const newStory = new StoryModel({
      name: "TITLE",
      contributorNames: gameState.players.filter(player => player.userId != "guest").map(player => player.name).concat(guests),
      contributorIds: gameState.players.filter(player => player.userId != "guest").map(player => player.userId),
      content: gameState.currentStory,
      usersThatLiked: ["bydefaultthereshouldbenouserslikedatpublish"],
      keywords: ["keyword1", "keyword2", "keyword3"],
    });
    newStory.save().then((story) => {
      socketManager.getIo().emit("storyPublished");
      console.log("story saved: ", story);
    });
  }
  res.send({ });
});

router.post("/inputChange", (req, res) => {
  console.log(req.body.content);
  socketManager.getIo().emit("updateChange", req.body.content);
  res.send({});
});

router.post("/inputSubmit", (req, res) => {
  let newInput = {
    content: req.body.content,
    gameId: req.body.gameId,
  };
  const newGameState = addToStory(req.body.gameId, newInput.content);
  socketManager.getIo().emit("storyUpdate", newGameState); // TODO: only emit to sockets in this game
  res.send({});
});

router.post("/leaveGame", (req, res) => {
  const newGameState = disconnectPlayer(req.body.socketId)!;
  socketManager.getIo().emit("playersUpdate", newGameState); // TODO: only emit to sockets in this game
  res.send({});
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  const msg = `Api route not found: ${req.method} ${req.url}`;
  res.status(404).send({ msg });
});

export default router;
