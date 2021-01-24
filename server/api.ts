import express, { response } from "express";
import auth from "./auth";
import StoryModel from "./models/Story";
import UserModel from "./models/User";
import socketManager from "./server-socket";
import Story from "../shared/Story";
import Player from "../shared/Player";
import { isValidObjectId } from "mongoose";
import Message from "../shared/Message";
import User from "../shared/User";
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

// get UserInfo for Profile page
router.get("/userInfo", (req, res) => {
  console.log(`Requesting ID: ${req.query.userId}`);
  UserModel.findById(req.query.userId).then((user: User) => {
    console.log(`User Found in Database: ${user}`);
    const userInfo = {
      name: user.name,
      wordsTyped: user.wordsTyped,
      storiesWorkedOn: user.storiesWorkedOn,
      wordFrequencies: user.wordFrequencies,
    };
    console.log(userInfo);
    res.send(userInfo);
  });
});

//post new messages
router.post("/message", (req, res) => {
  const room: GameState = logic.getRoomById(req.body.gameId)!;
  let sender: Player | undefined = room.players.find((player) => {
    return player.socketId == req.body.socketId;
  });
  let senderName: string;
  if (!sender) {
    //spectator is sending message
    const spectatorIndex: number = room.spectators.indexOf(req.body.socketId);
    senderName = "Spectator " + spectatorIndex + 1;
  } else {
    senderName = sender.name;
  }
  const message: Message = { sender: senderName, content: req.body.content };
  console.log(`New message by ${senderName}: ${req.body.content}`);
  socketManager.emitToRoom("newMessage", room, message);
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
router.post("/newComment", (req, res) => {
  const storyId = req.body.storyId;
  const userId = req.body.userId;
  const content = req.body.content;
  UserModel.findById(userId).then((user: User) => {
    let name = user.name;
    StoryModel.findById(storyId).then((story: Story) => {
      let storyComments = [...story.comments];
      let newComment = {
        name: name,
        senderId: userId,
        content: content,
      };
      storyComments.push(newComment);
      story.comments = storyComments;
      res.send(newComment);
      story.save();
    });
  });
  // res.send({ name: name });
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
    socketId: req.body.socketId,
  };
  let newGameState = logic.addToStory(req.body.gameId, newInput.content);
  newGameState = logic.addToPlayer(req.body.gameId, req.body.socketId, newInput.content);
  socketManager.emitToRoom("storyUpdate", newGameState);
  res.send({});
});

router.post("/endGameRequest", (req, res) => {
  const newGameState = logic.processEndgameVote(req.body.gameId, req.body.socketId, true);
  const requester = newGameState.players.find((player) => player.socketId == req.body.socketId)!;
  newGameState.players.forEach((player) => {
    const socket = socketManager.getSocketFromSocketID(player.socketId);
    if (socket) {
      socket.emit("endGamePrompt", requester.name);
      setTimeout(() => {
        if (newGameState.endVotes.filter((vote) => vote !== undefined).length > 0) {
          // if end game request not already canceled by votes for no
          socketManager.emitToRoom("endGameRequestCancel", newGameState, undefined);
          newGameState.endVotes = newGameState.endVotes.map(() => undefined);
        }
      }, 15000);
    }
  });
  res.send({});
});

/** Voting */

router.post("/voteReady", (req, res) => {
  const newGameState = logic.processReadyVote(req.body.gameId, req.body.socketId);
  socketManager.emitToRoom("gameUpdate", newGameState);
  res.send({});
});

router.post("/voteEndGame", (req, res) => {
  const newGameState = logic.processEndgameVote(
    req.body.gameId,
    req.body.socketId,
    req.body.response === "y"
  );
  if (newGameState.gameOver) {
    console.log(`Made it to gameOver emit`);
    const room: GameState = logic.getRoomById(req.body.gameId)!;
    //for each player in the room who is not a guest, add info into word map in database
    room.players.forEach((player: Player) => {
      if (player.userId !== "guest") {
        UserModel.findById(player.userId).then((user: User) => {
          let topWords = player.wordFrequencies.sort((word) => word.frequency);
          topWords.reverse();
          let numWords = 0;
          for (let frequentWord of topWords) {
            let pair = user.wordFrequencies.find((wordFreq) => wordFreq.word === frequentWord.word);
            if (pair) {
              pair.frequency += 1;
            } else {
              let newPair = { word: frequentWord.word, frequency: 1 };
              user.wordFrequencies.push(newPair);
            }
            numWords += frequentWord.frequency;
          }
          user.wordsTyped ? (user.wordsTyped += numWords) : (user.wordsTyped = numWords);
          user.save();
        });
      }
    });
    socketManager.emitToRoom("gameOver", newGameState);
  } else if (newGameState.gameOver === false) {
    socketManager.emitToRoom("endGameRequestCancel", newGameState, undefined);
    newGameState.gameOver = undefined;
  }
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
      // logic.addStoryToPlayer(story._id, gameState);
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
