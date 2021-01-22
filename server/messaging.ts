import Message from "../shared/Message";

//each game has a corresponding ChatRoom and gameId
export interface ChatRoom {
  gameId: string;
  messages: Message[];
}

const ChatRooms: ChatRoom[] = [];

const getChatRoomById = (gameId: string): ChatRoom | undefined => {
  return ChatRooms.find((room) => room.gameId == gameId);
};

const createChatRoom = (gameId: string): ChatRoom => {
  let newChatRoom: ChatRoom = {
    gameId: gameId,
    messages: [],
  };
  ChatRooms.push(newChatRoom);
  return newChatRoom;
};
export { getChatRoomById, createChatRoom };
