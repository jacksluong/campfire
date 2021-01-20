import express from "express";
import auth from "./auth";
import StoryModel from "./models/Story";
import socketManager from "./server-socket";
import Story from "../shared/Story";
import { gameState, addToStory, resetGameState, disconnectPlayer } from "./logic";

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

router.post("/publishStory", (req, res) => {
  const requiredVotes = Math.ceil(gameState.players.length / 2);
  gameState.publishVotes++;
  if (gameState.publishVotes >= requiredVotes && !gameState.isPublished) {
    const newStory = new StoryModel({
      name: req.body.name,
      contributorNames: req.body.contributorNames,
      contributorIds: req.body.contributorIds,
      content: req.body.content,
      usersThatLiked: req.body.usersThatLiked,
      keywords: req.body.keywords,
    });
    newStory.save().then((story) => {
      gameState.isPublished = false;
      socketManager.getIo().emit("disablePublish");
      resetGameState();
      res.send(story);
    });
    gameState.isPublished = false;
  }
});

router.post("/inputChange", (req, res) => {
  console.log(req.body.content);
  socketManager.getIo().emit("updateChange", req.body.content);
  res.send({});
});

router.post("/inputSubmit", (req, res) => {
  let newInput = {
    contributor: req.body.contributor,
    content: req.body.content,
    gameId: req.body.gameId,
  };
  addToStory(newInput.content);
  socketManager.getIo().emit("storyUpdate", gameState);
  res.send({});
});

router.post("/leaveGame", (req, res) => {
  disconnectPlayer(req.body.socketId);
  socketManager.getIo().emit("playersupdate", gameState);
  res.send({});
});

router.post("/rg", (req, res) => {
  resetGameState();
  res.send(gameState);
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  const msg = `Api route not found: ${req.method} ${req.url}`;
  res.status(404).send({ msg });
});

export default router;
